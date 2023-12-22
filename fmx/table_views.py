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
import datetime
from .models import Team, Player, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table, Club_details, Elo_table
# Create your views here.
def table(request):
     return render(request, "fmx/table.html")

def get_table(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     club_dets=Club_details.objects.all()
     club_dets=club_dets.order_by('-elo')
     json_final =[]
     for club_det in club_dets:

          club= User_club.objects.filter(user=club_det.user).first()
          json_tmp=club.serialize()
     
    # for club in clubs:
          round = Round.objects.filter(next=True).values("round_num").first()
          home_played = Table.objects.filter(round_num__lte=round["round_num"], squad_1=club).count()
          home_won=0
          if home_played>0:
               home_won=Table.objects.filter(round_num__lte=round["round_num"], score_1__gte=F('score_2')).count()
          
          away_played = Table.objects.filter(round_num__lte=round["round_num"], squad_2=club).count()
          away_won=0
          if away_played>0:
               away_won=Table.objects.filter(round_num__lte=round["round_num"], score_2__gt=F('score_1')).count()
          
          total_played = home_played+away_played
          logger.info(f"{club.name} - {home_played} - {home_won}")
          json_tmp=club.serialize() 
          json_tmp["elo"]=club_det.elo
          json_tmp["home_played"]=home_played
          json_tmp["home_won"]=home_won
          json_tmp["away_played"]=away_played
          json_tmp["away_won"]=away_won
          json_tmp["total_played"]=total_played
          #json_tmp["elo_1"]=elo_1['elo']
          #json_tmp["elo_2"]=elo_2['elo']
          
          json_final.append(json_tmp) 
     return JsonResponse(json_final, safe=False) 

def round_results(request): # returns winner/looser for each round and updates ELO
        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger('fmx')
        round = Round.objects.filter(next=True).values("round_num").first() # retrieve round number 
        games = Table.objects.filter(round_num=round["round_num"]).all() # retrieve all the matches in round
        
        json_final =[]
        for game in games: # retrive lineup scores, user and team data
            logger.info(game)
            try:
                 lineup_1 = Lineup.objects.filter(id=game.lineup_1.id).values("score")
                 user_1 = Lineup.objects.filter(id=game.lineup_1.id).values("user")
                 score_1=lineup_1[0]['score']
                 
                 Table.objects.filter(pk=game.id).update(score_1=score_1)
            except Team.DoesNotExist:
                 pass
            logger.info(f"{lineup_1} - {score_1}")

            try:
                 lineup_2 = Lineup.objects.filter(id=game.lineup_2.id).values("score")
                 user_2 = Lineup.objects.filter(id=game.lineup_2.id).values("user")
                  
                 score_2=lineup_2[0]['score']
                 Table.objects.filter(pk=game.id).update(score_2=lineup_2)
            except Team.DoesNotExist:
                 pass
               
            elo_1 = Club_details.objects.filter(user__in=user_1).values('elo').first()
            
            elo_2 = Club_details.objects.filter(user__in=user_2).values('elo').first()
            logger.info(f"{elo_1} - {elo_2}")     
            if score_1>=score_2:
                  new_elos = elo_value(elo_1['elo'], elo_2['elo'])
                  new_elo_1=new_elos[0]
                  new_elo_2=new_elos[1]
            else:
                  new_elos = elo_value(elo_2['elo'], elo_1['elo'])
                  new_elo_2=new_elos[0]
                  new_elo_1=new_elos[1]
            probability=new_elos[2]
            
            Club_details.objects.filter(user__in=user_1).update(elo=new_elo_1)
            Club_details.objects.filter(user__in=user_2).update(elo=new_elo_2)
            #return render(request, "fmx/register.html", {"what1": elo_1 , "what2":new_elo_1 }) 
            img1 = Club_details.objects.filter(user__in=user_1).values('logo').first()
            img2 = Club_details.objects.filter(user__in=user_2).values('logo').first()
            json_tmp=game.serialize() 
            json_tmp["img_1"]=img1['logo']
            json_tmp["img_2"]=img2['logo']

            json_tmp["elo_1"]=elo_1['elo']
            json_tmp["elo_2"]=elo_2['elo']
            json_tmp["score_1"]=score_1
            json_tmp["score_2"]=score_2

            json_tmp["new_elo_1"]=new_elo_1
            json_tmp["new_elo_2"]=new_elo_2
            json_tmp["probability"]=probability
            json_final.append(json_tmp) 
        return JsonResponse(json_final, safe=False)
           # return render(request, "fmx/register.html", {
            #    "what1": lineup_1 , "what2":lineup_2
           #  })  

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


 

def create_table(request, id):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

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
     ############# first round
    for i in range(0,team_count//2):
            lineup_1= Lineup.objects.filter(id=team_list_A[i].id).first()
            lineup_2= Lineup.objects.filter(id=team_list_B[i].id).first()
            
            if 1==int(id):
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=True)
                
            else:
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                          
            table_entry.save()
    round_num=round_num+1  


    ################


    logger.info(f'Round {1}:')
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
                table_entry=Table(squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=True)
                
            else:
                logger.info(f'{lineup_1.club} - {lineup_2.club}')
                table_entry=Table(squad_1=lineup_1.club, squad_2=lineup_2.club, lineup_1=lineup_1, lineup_2=lineup_2, round_num=round_num, next_round=False)
                          
            table_entry.save()
        round_num=round_num+1    
    return HttpResponse(json.dumps({"x":"x", "y":"y"}), content_type="application/json")


def new_team_in_table(request, id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     Lineup.objects.filter(ai=True).update(active=False)
     round = Round.objects.filter(next=True).values("round_num").first()
     games = Table.objects.filter(round_num__gt=round["round_num"]).all()   
     for game in games:
          game.delete()
     lineup_new_team= Lineup.objects.filter(id=id).first()
     lineup_ai= Lineup.objects.filter(ai=True).first()
     logger.info(f'{round} -  {games}')
     table_entry=Table(squad_1=lineup_new_team.club ,squad_2=lineup_ai.club, lineup_1=lineup_new_team, lineup_2=lineup_ai, round_num=round["round_num"], next_round=True)
     table_entry.save()
      
     team_count= Lineup.objects.filter(active=True).all().count()
     logger.info(f'tot records: {team_count}')
     logger.info(f'lineup ai: {lineup_ai.active}') 
     if team_count % 2==0:
          team_ai = Lineup.objects.filter(ai=True).first()
          Lineup.objects.filter(id=team_ai.id).update(active=False)
          create_table(None,round["round_num"]+1 )
     else:
          team_ai = Lineup.objects.filter(ai=True).first()
          Lineup.objects.filter(id=team_ai.id).update(active=True)
          logger.info(f'QUI: {team_count} -  {games}')     
          create_table(None,round["round_num"]+1 )
     return HttpResponse(json.dumps({"x":"x", "y":"y"}), content_type="application/json")
     
# insert squad, then insert lineup.
# latest lineup becomes active and added to Table TODO
# when round runs, all players in a lineup gets its score (get_fixture_ratings) 
# and the score for each lineup is calculated (lineup_scores) 
# when round_results is called the winner of each match is calculated and the elo is updated