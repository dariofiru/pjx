from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count, Sum
import json
import logging
from django.core.paginator import Paginator
import requests
import http.client
import datetime
from operator import attrgetter
from .models import Team, Player, Club_details, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table

#from notifications.signals import notify
# Create your views here.

def stats(request):
     return render(request, "fmx/stats.html")

def get_last_results(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     round = Round.objects.filter(current=True).values("round_num").first()
     table_round = Table.objects.filter(next_round=True).first()
     user_club = User_club.objects.filter(user=request.user).first() 
     json_final =[]
     for x in range(1,5):
        json_tmp={}
         
        try:
            previous_played = Table.objects.filter(round_id=table_round.round_id-x, squad_1=user_club).get()
            json_tmp=previous_played.serialize()
            json_final.append(json_tmp)
            #logger.info(f"{table_round.round_id-x} - {user_club} - {previous_played}")
        except Table.DoesNotExist:
            pass
        try:
            previous_played = Table.objects.filter(round_id=table_round.round_id-x, squad_2=user_club).get()
            json_tmp=previous_played.serialize()
            json_final.append(json_tmp)
           # logger.info(f"{table_round.round_id-x} - {user_club} - {previous_played}")
        except Table.DoesNotExist:
            pass    
         
        
     return JsonResponse(json_final, safe=False)


def stats_player_ranking(request):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')  
    round = Round.objects.filter(current=True).values("round_num").first()
    #filter(=round["round_num"])
    result = Fixture_round.objects.values('player').annotate(total=Avg('score'))
     
    json_final =[]
    result=result.order_by('-total')[:6] 
    logger.info(f'player list: {result}')
    #result=result[:6]
    for res in result:
        player= Player.objects.filter(id=res['player']).first()
        json_tmp=player.serialize() 
        logger.info(f'player: {player}')
        #json_tmp["avg"]=round(res['total'],2)
        json_tmp["avg"]=res['total']
        json_final.append(json_tmp) 
    return JsonResponse(json_final, safe=False)

def stats_goalscores(request):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')  
    result = Fixture_round.objects.values('player').annotate(total=Sum('goals'))
    #logger.info(f'already : {result}')
    json_final =[]
    result=result.order_by('-total')[:6] 
    #result=result[:6]
    for res in result:
        player= Player.objects.filter(id=res['player']).first()
        json_tmp=player.serialize() 
      #  logger.info(f'already a lineup: {player}')
        json_tmp["total"]=res['total']
         
        json_final.append(json_tmp) 
    return JsonResponse(json_final, safe=False)

def club_stats(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')  
     
     curr_player=None
     try:
          players = User_club.objects.filter(user=request.user).first()  
     except User_club.DoesNotExist:
          return HttpResponse("empty") 

     json_final =[]
     curr_player = Player.objects.filter(id=players.goalkeeper_1.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
     #logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.goalkeeper_2.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_1.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()  
     json_tmp["avg"]=round(result[0]['total'],2) 
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_2.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_3.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result[0]}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_4.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_5.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_1.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_2.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_3.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_4.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
     #logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_5.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_1.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
     #logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_2.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
    # logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_3.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
     #logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_4.id).first()
     result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score'))
     #logger.info(f'player : {result}')
     json_tmp=curr_player.serialize()   
     json_tmp["avg"]=round(result[0]['total'],2)
     json_tmp["value"]=curr_player.value
     json_tmp["current_value"]=curr_player.current_value
     json_final.append(json_tmp)
     
     return JsonResponse(json_final, safe=False)
 