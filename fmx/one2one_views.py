from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from decimal import Decimal
from itertools import permutations, combinations
from notifications.signals import notify
from . import lineup_views 
import operator
import logging
import random
import json
import requests
from django.db.models import F
import http.client
import datetime
from .models import Team, Player,One2one, Fixture,Tmp_lineup_score, User, User_club, Lineup,One2one, Fixture_round, Lineup_round, Round, Table, Club_details, Elo_table
# Create your views here.

def one2one(request):
     return render(request, "fmx/one2one.html")

def my_one2one(request):
     return render(request, "fmx/my_one2one.html")

def get_one2one(request,id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     one2one=One2one.objects.filter(id=id).first()
     club_details_1=Club_details.objects.filter(user=one2one.squad_1.user).first()
     club_details_2=Club_details.objects.filter(user=one2one.squad_2.user).first()

     #### retrieve match stats 
     #### end stats
      
     json_data=[]
     #json_tmp={}
     #for score in scores:
      #    json_tmp=score.serialize()
      #    json_data.append(json_tmp)
          
     #logger.info(f'club_details_1: {club_details_1} ')
     json_tmp={}
     json_tmp=one2one.serialize()
     json_tmp["logo_1"]=club_details_1.logo
     json_tmp["logo_2"]=club_details_2.logo
     json_data.append(json_tmp)
     return JsonResponse(json_data, safe=False)


def my_one2one_data(request, ch_stat, ch_order, br_stat, br_order): #return list of mychallenges and braved
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     club= User_club.objects.filter(user=request.user).first()
     my_challenges=One2one.objects.filter(squad_1=club).all()
     if ch_stat!="0":
          logger.info(f'ch_stat: {ch_stat} ')
          my_challenges=my_challenges.filter(status=ch_stat)
          logger.info(f'my_challenges: {my_challenges} ')
     if ch_order!="0":
          my_challenges=my_challenges.order_by(f"-{ch_order}",'-timestamp').all()
     else:
          my_challenges=my_challenges.order_by('status','-timestamp').all()

     my_braveds=One2one.objects.filter(squad_2=club).exclude(status="refused").all()
     if br_stat!="0":
          my_braveds=my_braveds.filter(status=br_stat)
     if br_order!="0":
          my_braveds=my_braveds.order_by(f"-{br_order}",'-timestamp').all()
     else:
          my_braveds=my_braveds.order_by('status','-timestamp').all()
     #my_braveds=my_braveds.order_by('status', '-timestamp').all()
     
     json_final =[]
     for challenge in my_challenges:
          json_tmp={}
          json_tmp["id"]=challenge.id
          json_tmp["braved"]="false" 
          json_tmp["club_name"]=challenge.squad_2.name
          json_tmp["status"]=challenge.status
          json_tmp["bet"]=challenge.bet
          json_tmp["time"]=challenge.timestamp

          json_final.append(json_tmp) 
     
     for braved in my_braveds:
          json_tmp={}
          json_tmp["id"]=braved.id
          json_tmp["braved"]="true" 
          json_tmp["club_name"]=braved.squad_1.name
          json_tmp["status"]=braved.status
          json_tmp["bet"]=braved.bet
          json_tmp["time"]=braved.timestamp

          json_final.append(json_tmp) 

     return JsonResponse(json_final, safe=False)

def accept_challenge(request, id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     one2one = One2one.objects.filter(id=id).first()
     logger.info(f'one2one: {one2one} ')
     lineup_1= Lineup.objects.filter(active=True, club=one2one.squad_1).first()
     logger.info(f'lineup_1: {lineup_1} ')
     One2one.objects.filter(id=one2one.id).update(lineup_1=lineup_1.id)
     lineup_2= Lineup.objects.filter(active=True, club=one2one.squad_2).first()
     One2one.objects.filter(id=one2one.id).update(lineup_2=lineup_2.id)
     One2one.objects.filter(id=one2one.id).update(status="accepted")
     #round = Round.objects.filter(id=id).values("round_num").first() # retrieve round number                    
     #round=round['round_num']
     fixture= Fixture.objects.filter(round_num=one2one.round_num).first()
     logger.info(f'round_num: {one2one.round_num} ')
     logger.info(f'fixture: {fixture} ')
     downloaded_fixture=Fixture_round.objects.filter(fixture=fixture).count()
     logger.info(f'downloaded_fixture: {downloaded_fixture} ')
     if downloaded_fixture==0:
          lineup_views.calculate_round( one2one.round_num)
          lineup_views.get_fixture_ratings( one2one.round_num) # calculate players score 
          #lineup_scores(round)
      
     score_1=one2one_scores(None, lineup_1, one2one, one2one.round_num)
     score_2=one2one_scores(None, lineup_2, one2one, one2one.round_num)
     One2one.objects.filter(id=one2one.id).update(score_1=score_1)
     One2one.objects.filter(id=one2one.id).update(score_2=score_2)
     return render(request, "fmx/my_one2one.html")


def one2one_scores(request, lineup,one2one, id): # calculates total point for both lineups in challenge
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx') 
     fixtures= Fixture.objects.filter(round_num=id).all()
     x="--"
     scores = []
     for fixture in fixtures:
          
          team_score= Decimal('0.0')
          #Player.objects.filter(f"player_{x}"=f"player_{x}")
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_1).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_1.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_1.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_2).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_2.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_2.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_3).get()
               # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_3.rating)
               team_score=team_score+fixture_player.score+Decimal(lineup.player_3.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_3.rating)
          try:
               logger.info(f"error:{fixture} - {lineup.player_4}")
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_4).get()
               # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_4.rating)
               team_score=team_score+fixture_player.score+Decimal(lineup.player_4.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_4.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_5).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_5.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_5.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_6).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_6.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_6.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_7).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_7.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_7.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_8).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_8.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_8.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_9).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_9.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_9.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_10).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_10.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_10.rating)
          try:
               fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_11).get()
               team_score=team_score+fixture_player.score+Decimal(lineup.player_11.rating)
          except Fixture_round.DoesNotExist: 
               team_score=team_score+Decimal('6.0')+Decimal(lineup.player_11.rating)
          scores.append(team_score)
        
          return team_score     
                                



def challenge(request, id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     if request.method == "PUT":
          data = json.loads(request.body)
          bet = data.get("bet", "")
          logger.info(f"bet: {bet} - data: {data} ")
          club_challanger= User_club.objects.filter(user=request.user).first()
          club_braved=User_club.objects.filter(id=id).first()
          round = Round.objects.order_by('?').values("round_num").first()
          one2one = One2one(squad_1=club_challanger ,squad_2=club_braved,bet=bet,status="pending",round_num=round["round_num"] )
          one2one.save()
     return HttpResponseRedirect("/")
     HttpResponse("ok")

def get_one2one_teams(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     club_dets=Club_details.objects.exclude(user=request.user)
     club_dets=club_dets.order_by('-elo')
     #recipient = User.objects.get(id=1) 
     notify.send(request.user, recipient=request.user, verb='New contact us request')
     json_final =[]
     for club_det in club_dets:
          logger.info(club_det)
          try:
               club= User_club.objects.filter(user=club_det.user).get()
               #json_tmp=club_det.serialize()
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
               #json_tmp=club.serialize() 
               json_tmp={}

               json_tmp["club_id"]=club.id 
               json_tmp["club_name"]=club.name 
               
               json_tmp["club_user"]=club.user.username
               json_tmp["elo"]=club_det.elo
               json_tmp["total_won"]=away_won+home_won
               json_tmp["total_played"]=total_played
               json_tmp["club_logo"]=club_det.logo

               json_final.append(json_tmp) 
          except User_club.DoesNotExist:
               pass 

     return JsonResponse(json_final, safe=False)



def get_one2one_stats(request,id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     one2one=One2one.objects.filter(id=id).first()

     #### retrieve match stats 
     lineup_couple = []
     lineup_1= Lineup.objects.filter(active=True, club=one2one.squad_1).first()
     lineup_2= Lineup.objects.filter(active=True, club=one2one.squad_2).first()
     lineup_couple.append(one2one.lineup_1)
     lineup_couple.append(one2one.lineup_2)
     fixtures= Fixture.objects.filter(round_num=one2one.round_num).all()
     logger.info(f'lineup_couple: {lineup_couple} ')  
     json_final =[]
     for fixture in fixtures:
          for lineup in lineup_couple:
               json_tmp1=[]
               json_tmp2={}
               team_score=Decimal('0.0')
               json_tmp2["lineup"]=lineup.id
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_1).get()
                    player_1_score=fixture_player.score+Decimal(lineup.player_1.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club, lineup=lineup, player=lineup.player_1 ,  
                                                              defaults=
                                                              {'score':player_1_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard
                                                               })
               except Fixture_round.DoesNotExist: 
                    player_1_score=Decimal('6.0')+Decimal(lineup.player_1.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_1,
                                                           defaults={'score':player_1_score,'goals':0, 'assists':0,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_2).get()
                    player_2_score=fixture_player.score+Decimal(lineup.player_2.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_2 ,defaults={'score':player_2_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_2_score=Decimal('6.0')+Decimal(lineup.player_2.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_2,defaults={'score':player_2_score,'goals':0,'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_3).get()
                    player_3_score=fixture_player.score+Decimal(lineup.player_3.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_3 ,defaults={'score':player_3_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_3_score=Decimal('6.0')+Decimal(lineup.player_3.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_3,defaults={'score':player_3_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_4).get()
                    player_4_score=fixture_player.score+Decimal(lineup.player_4.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_4 ,defaults={'score':player_4_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_4_score=Decimal('6.0')+Decimal(lineup.player_4.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_4,defaults={'score':player_4_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_5).get()
                    player_5_score=fixture_player.score+Decimal(lineup.player_5.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_5 ,defaults={'score':player_5_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_5_score=Decimal('6.0')+Decimal(lineup.player_5.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_5,defaults={'score':player_5_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_6).get()
                    player_6_score=fixture_player.score+Decimal(lineup.player_6.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_6 ,defaults={'score':player_6_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_6_score=Decimal('6.0')+Decimal(lineup.player_6.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_6,defaults={'score':player_6_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_7).get()
                    player_7_score=fixture_player.score+Decimal(lineup.player_7.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_7 ,defaults={'score':player_7_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_7_score=Decimal('6.0')+Decimal(lineup.player_7.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_7,defaults={'score':player_7_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_8).get()
                    player_8_score=fixture_player.score+Decimal(lineup.player_8.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_8 ,defaults={'score':player_8_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_8_score=Decimal('6.0')+Decimal(lineup.player_8.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_8,defaults={'score':player_8_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_9).get()
                    player_9_score=fixture_player.score+Decimal(lineup.player_9.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_9 ,defaults={'score':player_9_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_9_score=Decimal('6.0')+Decimal(lineup.player_9.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_9,defaults={'score':player_9_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
             
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_10).get()
                    player_10_score=fixture_player.score+Decimal(lineup.player_10.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_10 ,defaults={'score':player_10_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_10_score=Decimal('6.0')+Decimal(lineup.player_10.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_10,defaults={'score':player_10_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
               try:
                    fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_11).get()
                    player_11_score=fixture_player.score+Decimal(lineup.player_11.rating)
                    Tmp_lineup_score.objects.update_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_11 ,defaults={'score':player_11_score,'goals':fixture_player.goals, 'assists':fixture_player.assists,
                                                               'yellow': fixture_player.yellowcard, 'red': fixture_player.redcard})
               except Fixture_round.DoesNotExist: 
                    player_11_score=Decimal('6.0')+Decimal(lineup.player_11.rating)
                    Tmp_lineup_score.objects.get_or_create(match=id, type="one2one",club=lineup.club,lineup=lineup, player=lineup.player_11,defaults={'score':player_11_score,'goals':0, 'assists':0 ,
                                                               'yellow': 0, 'red': 0} )
                    
     scores = Tmp_lineup_score.objects.filter(type="one2one", match=id).all()
     tot_scores=Tmp_lineup_score.objects.filter(type="one2one", match=id).count()
     #### end stats
     logger.info(f'id: {id} tot_scores: {tot_scores} ')
     json_data=[]
     json_tmp={}
     for score in scores:
          json_tmp=score.serialize()
          json_data.append(json_tmp)
          logger.info(f'player: {score} ')
     
     #json_data.append(json_tmp)
     return JsonResponse(json_data, safe=False)