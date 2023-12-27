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
from .models import Team, Player, Fixture, User, User_club, Lineup,One2one, Fixture_round, Lineup_round, Round, Table, Club_details, Elo_table
# Create your views here.

def one2one(request):
     return render(request, "fmx/one2one.html")

def get_one2one_teams(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     club_dets=Club_details.objects.exclude(user=request.user)
     club_dets=club_dets.order_by('-elo')
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
