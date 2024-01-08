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
from .models import Team, Player, Club_details, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table

#from notifications.signals import notify
# Create your views here.

def stats(request):
     return render(request, "fmx/stats.html")

def stats_player_ranking(request):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')  
    result = Fixture_round.objects.values('player').annotate(total=Avg('score'))
    logger.info(f'already : {result}')
    json_final =[]
    result=result.order_by('-total')[:6] 
    #result=result[:6]
    for res in result:
        player= Player.objects.filter(id=res['player']).first()
        json_tmp=player.serialize() 
        logger.info(f'already a lineup: {player}')
        json_tmp["avg"]=round(res['total'],2)
         
        json_final.append(json_tmp) 
    return JsonResponse(json_final, safe=False)

def stats_goalscores(request):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')  
    result = Fixture_round.objects.values('player').annotate(total=Sum('goals'))
    logger.info(f'already : {result}')
    json_final =[]
    result=result.order_by('-total')[:6] 
    #result=result[:6]
    for res in result:
        player= Player.objects.filter(id=res['player']).first()
        json_tmp=player.serialize() 
        logger.info(f'already a lineup: {player}')
        json_tmp["total"]=res['total']
         
        json_final.append(json_tmp) 
    return JsonResponse(json_final, safe=False)

 