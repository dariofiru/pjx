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
from .models import Team, Player, Club_details,Tmp_lineup_score, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table

#from notifications.signals import notify
# Create your views here.

def stats(request):
     return render(request, "fmx/stats.html")

def get_team_stats(request):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')
    round = Round.objects.filter(current=True).values("round_num").first()
    table_round = Table.objects.filter(next_round=True).first()
    round=table_round.round_id-1
    user_club = User_club.objects.filter(user=request.user).first() 
    json_final =[]
     
    json_tmp={}
        
    try:
        previous_played = Table.objects.filter(round_id__lte=round, squad_1=user_club).all()
        for home in previous_played:
            players_data=Tmp_lineup_score.objects.filter(match__lte=home.id,club=user_club).values('player').annotate(total=Sum('goals'))
            for res in players_data:
                player= Player.objects.filter(id=res['player']).first()
                json_tmp=player.serialize() 
                logger.info(f"player: {player.name} - goals: {res['total']} ")
                 
                json_tmp["tot_goals"]=res['total']
                json_final.append(json_tmp)
        #logger.info(f"{table_round.round_id-x} - {user_club} - {previous_played}")
    except Table.DoesNotExist:
        pass
    try:
        previous_played = Table.objects.filter(round_id__lte=round, squad_2=user_club).all()
        for home in previous_played:
            players_data=Tmp_lineup_score.objects.filter(match__lte=home.id,club=user_club).values('player').annotate(total=Sum('goals'))
            for res in players_data:
                player= Player.objects.filter(id=res['player']).first()
                json_tmp=player.serialize() 
                logger.info(f"player: {player.name} - goals: {res['total']} ")
                 
                json_tmp["tot_goals"]=res['total']
                json_final.append(json_tmp)
        #logger.info(f"{table_round.round_id-x} - {user_club} - {previous_played}")
    except Table.DoesNotExist:
        pass   
    return JsonResponse(json_final, safe=False)     

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
    border_round = Table.objects.filter(next_round=True)
    border_round= border_round.order_by('-id').first()
    #matches= Table.objects.filter(round_id__lt=border_round.round_id).get() #retrieve all matches played so far
    
    #for match in matches:
    players_data=Tmp_lineup_score.objects.filter(match__lte=border_round.id).values('player').annotate(total=Avg('score'))
    #result = Fixture_round.objects.values('player').annotate(total=Avg('score'))
    logger.info(f"border_round: {border_round}") 
    logger.info(f"players_data: {players_data}") 
    json_final =[]
    result=players_data.order_by('-total')[:6] 
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
    border_round = Table.objects.filter(next_round=True)
    border_round= border_round.order_by('-id').first()
    #matches= Table.objects.filter(round_id__lt=border_round.round_id).get() #retrieve all matches played so far
    
    #for match in matches:
    players_data=Tmp_lineup_score.objects.filter(match__lte=border_round.id).values('player').annotate(total=Sum('goals'))
    #result = Fixture_round.objects.values('player').annotate(total=Avg('score'))
    logger.info(f"border_round: {border_round}") 
    logger.info(f"players_data: {players_data}") 
    json_final =[]
    result=players_data.order_by('-total')[:6] 
    #result=result[:6]
    for res in result:
        player= Player.objects.filter(id=res['player']).first()
        json_tmp=player.serialize() 
      #  logger.info(f'already a lineup: {player}')
        json_tmp["total"]=res['total']
         
        json_final.append(json_tmp) 
    return JsonResponse(json_final, safe=False)

def add_round():
    rounds=Fixture_round.objects.all()
    for round in rounds:
        num_round=round.fixture.round_num
        upd_round=Fixture_round.objects.filter(id=round.id).update()

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
     json_tmp=curr_player.serialize() 
      
     try: 
        logger.info(f"curr_player: {curr_player.name}")
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        logger.info(f"result: {result}") 
        logger.info(f"result2: {result['total']}")
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.goalkeeper_1_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.goalkeeper_2.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.goalkeeper_2_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_1.id).first()
     json_tmp=curr_player.serialize()  
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.defender_1_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_2.id).first()
     json_tmp=curr_player.serialize() 
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.defender_2_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_3.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.defender_3_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_4.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.defender_4_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_5.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.defender_5_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_1.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.midfielder_1_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_2.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.midfielder_2_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_3.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.midfielder_3_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_4.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.midfielder_4_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_5.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.midfielder_5_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_1.id).first()
     json_tmp=curr_player.serialize() 
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.attacker_1_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_2.id).first()
     json_tmp=curr_player.serialize()  
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.attacker_2_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_3.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.attacker_3_price
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_4.id).first()
     json_tmp=curr_player.serialize()   
      
     try: 
        result = Fixture_round.objects.values('player').filter(player=curr_player).annotate(total=Avg('score')).get()
        json_tmp["avg"]=round(result['total'],2)
     except Fixture_round.DoesNotExist:
        json_tmp["avg"]=6.0
     json_tmp["current_value"]=curr_player.value
     #json_tmp["current_value"]=curr_player.current_value
     json_tmp["value"]=players.attacker_4_price
     json_final.append(json_tmp)
     
     return JsonResponse(json_final, safe=False)
 