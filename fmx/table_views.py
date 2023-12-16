from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from decimal import Decimal
import json
import requests
import http.client
import datetime
from .models import Team, Player, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table
# Create your views here.

def round_results(request,id):
        games = Table.objects.filter(round_num=id).all()

        json_final =[]
        for game in games:
            try:
                 lineup_1 = Lineup.objects.filter(id=game.lineup_1.lineup.id).values("score")
                 Table.objects.filter(pk=game.id).update(score_1=lineup_1)
            except Team.DoesNotExist:
                 pass
            try:
                 lineup_2 = Lineup.objects.filter(id=game.lineup_2.lineup.id).values("score")
                 Table.objects.filter(pk=game.id).update(score_2=lineup_2)
            except Team.DoesNotExist:
                 pass
            
            json_tmp=game.serialize() 

            json_final.append(json_tmp) 
        return JsonResponse(json_final, safe=False)
        return render(request, "fmx/register.html", {
                 "what1": json_final, "what2":lineup_2
             })  

