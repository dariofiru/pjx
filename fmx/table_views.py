from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from decimal import Decimal
from itertools import permutations, combinations
import operator
import logging
import random
import json
import requests
from django.db.models import F
import http.client
from schedule import every, repeat, run_pending
import datetime
import time
from .models import Team, Starter, Player, Fixture,Tmp_lineup_score, User, User_club, Lineup, Fixture_round,   Round, Table, Club_details, Elo_table
# Create your views here.
@login_required(login_url='/login')
def table(request):
     return render(request, "fmx/table.html")

@login_required(login_url='/login')
def get_start(request):
     starter = Starter.objects.first()
     return JsonResponse({"start" : starter.start, "round_num" : starter.round_num }, safe=False)
 
 
@login_required(login_url='/login')
def get_next_match(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     round = Round.objects.filter(next=True).values("round_num").first()
     user_club = User_club.objects.filter(user=request.user).first() 
     try:
         # home_played = Table.objects.filter(round_num=round["round_num"], squad_1=user_club).get()
           next_match = Table.objects.filter(next_round=True, squad_1=user_club).get()
     except Table.DoesNotExist:
         # home_played = Table.objects.filter(round_num=round["round_num"], squad_2=user_club).get()
          try:
               next_match = Table.objects.filter(next_round=True, squad_2=user_club).get()
          except Table.DoesNotExist:
               pass
     logger.info(f"qui {round} - {user_club} - {next_match}")
     json_final=next_match.serialize()
     return JsonResponse(json_final, safe=False)

@login_required(login_url='/login')
def get_table(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     club_dets=Club_details.objects.exclude(club="FMX Home Team")
     club_dets=club_dets.order_by('-elo')
     json_final =[]
     for club_det in club_dets:
          logger.info(club_det)
          try:
               club= User_club.objects.filter(user=club_det.user).get()
               json_tmp=club.serialize()
               round = Round.objects.filter(current=True).values("round_num").first()
               table_round = Table.objects.filter(next_round=True).first()
               #home_played = Table.objects.filter(round_num__lte=round["round_num"], squad_1=club).count()
               home_played = Table.objects.filter(id__lt=table_round.id, squad_1=club).count()
               home_won=0
               if home_played>0:
                    #home_won=Table.objects.filter(round_num__lte=round["round_num"], score_1__gte=F('score_2'), squad_1=club).count()
                    home_won=Table.objects.filter(round_id__lt=table_round.round_id, score_1__gte=F('score_2'), squad_1=club).count()
                    logger.info(f"Home:{table_round.round_id} {club.name} - {home_played} - {home_won}")
               away_played = Table.objects.filter(id__lt=table_round.id, squad_2=club).count()
               away_won=0
               if away_played>0:
                    away_won=Table.objects.filter(round_id__lt=table_round.round_id, score_2__gt=F('score_1'), squad_2=club).count()
                    logger.info(f"away:{table_round.round_id}  {club.name} - {away_played} - {away_won}")
               total_played = home_played+away_played
               
               
               json_tmp=club.serialize() 
               json_tmp["elo"]=club_det.elo
               json_tmp["home_played"]=home_played
               json_tmp["home_won"]=home_won
               json_tmp["away_played"]=away_played
               json_tmp["away_won"]=away_won
               json_tmp["total_played"]=total_played

               json_final.append(json_tmp) 
          except User_club.DoesNotExist:
               pass 

     return JsonResponse(json_final, safe=False) 

@login_required(login_url='/login')
def previous_results(request):
        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger('fmx')
        lineup = Lineup.objects.filter(active=True,user=request.user ).first()
        table_round = Table.objects.filter(next_round=True).first()
        round = Round.objects.filter(current=True).values("round_num").first() # retrieve round number 
        round_num__gt=round["round_num"]
        games = Table.objects.filter(id__lt=table_round.id-1,lineup_1= lineup).all() # retrieve all the matches in round
        
@login_required(login_url='/login')   
def round_results(request): # returns winner/looser for each round  
        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger('fmx')
        round = Round.objects.filter(current=True).values("round_num").first() # retrieve round number 
        table_round = Table.objects.filter(next_round=True).first()
        games = Table.objects.filter(round_id=table_round.round_id-1).all() # retrieve all the matches in round
        logger.info(f"round: {round}")
        json_final =[]
        for game in games: # retrive lineup scores, user and team data
            logger.info(game)
            try:
                 lineup_1 = Lineup.objects.filter(id=game.lineup_1.id).values("score")
                 user_1 = Lineup.objects.filter(id=game.lineup_1.id).values("user")
                 score_1=lineup_1[0]['score']
            except Team.DoesNotExist:
                 pass
            #logger.info(f"{lineup_1} - {score_1}")

            try:
                 lineup_2 = Lineup.objects.filter(id=game.lineup_2.id).values("score")
                 user_2 = Lineup.objects.filter(id=game.lineup_2.id).values("user")
                 score_2=lineup_2[0]['score']
            except Team.DoesNotExist:
                 pass
               
            img1 = Club_details.objects.filter(user__in=user_1).values('logo').first()
            img2 = Club_details.objects.filter(user__in=user_2).values('logo').first()
            json_tmp=game.serialize() 
            json_tmp["img_1"]=img1['logo']
            json_tmp["img_2"]=img2['logo']
            json_tmp["score_1"]=score_1
            json_tmp["score_2"]=score_2
            json_final.append(json_tmp) 
        return JsonResponse(json_final, safe=False)
           

def elo_value(elo_1, elo_2):
     difference = abs(elo_1-elo_2)
     probability_value=Elo_table.objects.filter(difference__lte=difference).values("probability")
     probability_value=probability_value.order_by("-probability").first()
     probability=probability_value['probability']
     new_elo_1=elo_1+30*(1-probability)
     new_elo_2=elo_2+30*(0-probability)
     new_elos=[]
     new_elos.append(new_elo_1)
     new_elos.append(new_elo_2)
     new_elos.append(probability)
     return new_elos


 

def create_table(request, id, round_id):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')

    team_count= Lineup.objects.filter(active=True).all().count()
    teams = Lineup.objects.filter(active=True).all()
 
    list_A= [x for x in range(0,team_count//2)]
    list_B= [x for x in range(team_count//2,team_count)]
    logger.info(f'lists: {list_A} - {list_B}')
    team_list_main = list(teams)
    #random.shuffle(team_list_main) 
    #logger.info(f'start: {team_list_main} ')
    team_list_A = [team_list_main[i] for i in list_A]
    team_list_B = [team_list_main[i] for i in list_B]
    round_num=int(id)
    round_id=int(round_id)
     ############# first round
    for i in range(0,team_count//2):
            lineup_1= Lineup.objects.filter(id=team_list_A[i].id).first()
            lineup_2= Lineup.objects.filter(id=team_list_B[i].id).first()
            
            if 1==int(id):
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=True)
                
            else:
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=round_id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                          
            table_entry.save()
    if round_num==38:
         round_num=1
    else:     
         round_num=round_num+1  

    round_id=round_id+1
    ################
  
        #logger.info(f'  {team_list_A[i]} vs {team_list_B[i]}')
    for w in range(1,team_count-1):
        last_team=team_list_main[team_count-1]
        #logger.info(f'Last: {last_team}:')
        for x in range(2,team_count):             #working bit
            team_list_A_last=team_list_A[(team_count//2)-1]
            team_list_B_first=team_list_B[0]
             
            for y in range((team_count//2)-1,1,-1):
                   # end of first array team
               team_list_A[y]=team_list_A[y-1]    
            team_list_A[1]=team_list_B_first

            for z in range(0,(team_count//2)-1):
                   # end of first array team
               team_list_B[z]=team_list_B[z+1]  
            team_list_B[(team_count//2)-1]=team_list_A_last
           
        for i in range(0,team_count//2):
          logger.info(f'  {team_list_A[i]} vs {team_list_B[i]}')
             
        for i in range(0,team_count//2):
            lineup_1= Lineup.objects.filter(id=team_list_A[i].id).first()
            lineup_2= Lineup.objects.filter(id=team_list_B[i].id).first()
            
            if (w)==int(id):
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=round_id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                
            else:
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=round_id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                          
            table_entry.save()
        if round_num==38:
               round_num=1
        else:     
               round_num=round_num+1  
        round_id=round_id+1
        ###########
        ########### return matches
        for i in range(0,team_count//2):
            lineup_2= Lineup.objects.filter(id=team_list_A[i].id).first()
            lineup_1= Lineup.objects.filter(id=team_list_B[i].id).first()
            
            if (w)==int(id):
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=round_id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                
            else:
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(round_id=round_id, squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                          
            table_entry.save()
        if round_num==38:
               round_num=1
        else:     
               round_num=round_num+1  
        round_id=round_id+1


        ########### end return matches   
        
        
         
    return HttpResponse(json.dumps({"x":"x", "y":"y"}), content_type="application/json")


def new_team_in_table(request, id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     Lineup.objects.filter(ai=True).update(active=False)
     round = Round.objects.filter(next=True).values("round_num").first()
     tot_games = Table.objects.filter(next_round=True).count()
     round_id=round_num=round["round_num"]
     if tot_games>0:
          games = Table.objects.filter(next_round=True).all() 
          next_games=games.order_by('-id').first()
          logger.info(f'{round} -  {next_games.id}')
          
          games = Table.objects.filter(pk__gt=next_games.id).all()   
          round_id=next_games.round_id
          for game in games:
               game.delete()
          
     lineup_new_team= Lineup.objects.filter(id=id).first()
     lineup_ai= Lineup.objects.filter(ai=True).first()
     logger.info(f'round_id -  {round_id}')
     previous_rounds=Table.objects.all().count()
     logger.info(f'PREV ROUNDS: {previous_rounds}')
     if previous_rounds==0:
          table_entry=Table(round_id=round_id, squad_1=lineup_new_team.club ,squad_2=lineup_ai.club, lineup_1=lineup_new_team, lineup_2=lineup_ai, round_num=round["round_num"], next_round=True)
     else:
          last_rounds=Table.objects.all()
          last_rounds= last_rounds.order_by('-round_id')[0]
          logger.info(f'LAST ROUNDS: {last_rounds}')
          table_entry=Table(round_id=round_id, squad_1=lineup_new_team.club ,squad_2=lineup_ai.club, lineup_1=lineup_new_team, lineup_2=lineup_ai, round_num=round["round_num"], next_round=True)

     table_entry.save()
      
     team_count= Lineup.objects.filter(active=True).all().count()
     logger.info(f'tot records: {team_count}')
     logger.info(f'lineup ai: {lineup_ai.active}') 
     if team_count % 2==0:
          team_ai = Lineup.objects.filter(ai=True).first()
          Lineup.objects.filter(id=team_ai.id).update(active=False)
          create_table(None,round["round_num"]+1,round_id+1)
     else:
          team_ai = Lineup.objects.filter(ai=True).first()
          Lineup.objects.filter(id=team_ai.id).update(active=True)
         # logger.info(f'QUI: {team_count} -  {games}')     
          create_table(None,round["round_num"]+1,round_id+1)
     return HttpResponse(json.dumps({"x":"x", "y":"y"}), content_type="application/json")
     
# insert squad, then insert lineup.
# latest lineup becomes active and added to Table 
# when round runs, all players in a lineup gets its score (get_fixture_ratings) 
# and the score for each lineup is calculated (lineup_scores) 
# when round_results is called the winner of each match is calculated and the elo is updated
@login_required(login_url='/login')
def get_match_stats(request,id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
      
     games = Table.objects.filter(id=id).first()
     logger.info(f'XXXSmatch id: {id} - games: {games} ')  
     #### retrieve match stats 
     lineup_couple = []
      
     lineup_couple.append(games.lineup_1)
     lineup_couple.append(games.lineup_2)
     fixtures= Fixture.objects.filter(round_num=games.round_num).all()
     logger.info(f'lineup_couple: {lineup_couple} ')  
     json_data =[]
     for lineup in lineup_couple:
               lineup_scores=Tmp_lineup_score.objects.filter(match=id, lineup=lineup).all()
               for player in lineup_scores:
                    json_tmp=player.serialize()
                    json_data.append(json_tmp)
                    logger.info(f'player: {player} ')
          
   
     return JsonResponse(json_data, safe=False)

