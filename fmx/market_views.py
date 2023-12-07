from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
import json
import requests
import http.client
import datetime
from .models import Team, Player, Fixture, User, User_club
# Create your views here.


def market(request):
     return render(request, "fmx/market.html")
            #, {
             #   "PostForm": form, "check":"yes"
            #})

def user_club(request, id):
     userT = User.objects.filter(id=id)
     try:
           user_clubT = User_club.objects.filter(user__in=userT).get()
     except User_club.DoesNotExist:
          return HttpResponse("empty")

     return JsonResponse([user_club.serialize() for user_club in user_clubT], safe=False)

def get_teams(request):
     teams = Team.objects.filter(active=True)
     teams = teams.order_by("-name").all()
     return JsonResponse([team.serialize() for team in teams], safe=False)