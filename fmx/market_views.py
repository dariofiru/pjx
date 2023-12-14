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
import re
from .models import Team, Player, Fixture, User, User_club, Headline
# Create your views here.

# def lineup(request):
#      return render(request, "fmx/lineup.html")

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

def save_squad(request):
     squad = json.loads(request.body)
      
     goalkeeper_1 = None
     goalkeeper_2 = None
     defender_1 = None
     defender_2 = None
     defender_3 = None
     defender_4 = None
     defender_5 = None
     midfielder_1 = None
     midfielder_2 = None
     midfielder_3 = None
     midfielder_4 = None
     midfielder_5 = None
     attacker_1 = None
     attacker_2 = None
     attacker_3 = None
     attacker_4 = None
     attacker_5 = None
     squad_name= squad['squad_name']
     remaining_budget=squad['curr_budget']
     # return render(request, "fmx/register.html"   
     #      , {
     #             "what": squad_name 
     #      }) 

     for member in squad['squad']:
          position=member['position']
          id=member['id']
          
          if position=="Goalkeeper-1":
               try:
                    goalkeeper_1 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Goalkeeper-2":
               try:
                    goalkeeper_2 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-1":
               try:
                    defender_1 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-2":
               try:
                    defender_2 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-3":
               try:
                    defender_3 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-4":
               try:
                    defender_4 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-5":
               try:
                    defender_5 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-1":
               try:
                    midfielder_1 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-2":
               try:
                    midfielder_2 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-3":
               try:
                    midfielder_3 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-4":
               try:
                    midfielder_4 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-5":
               try:
                    midfielder_5 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-1":
               try:
                    attacker_1 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-2":
               try:
                    attacker_2 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-3":
               try:
                    attacker_3 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-4":
               try:
                    attacker_4 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-5":
               try:
                    attacker_5 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")


     squad= User_club(
                user= request.user,
                name=squad_name,
                remaining_budget= remaining_budget,
               goalkeeper_1 = goalkeeper_1,
               goalkeeper_2 = goalkeeper_2,
               defender_1 = defender_1,
               defender_2 = defender_2,
               defender_3 = defender_3,
               defender_4 = defender_4,
               defender_5 = defender_5,
               midfielder_1 = midfielder_1,
               midfielder_2 = midfielder_2,
               midfielder_3 = midfielder_3,
               midfielder_4 = midfielder_4,
               midfielder_5 = midfielder_5,
               attacker_1 = attacker_1,
               attacker_2 = attacker_2,
               attacker_3 = attacker_3,
               attacker_4 = attacker_4,
               attacker_5 = attacker_5
                )
     squad.save()
     HttpResponse("done")

def get_headlines(request):
     headline_list=""
     url = "https://open-ai25.p.rapidapi.com/ask"

     payload = { "query": "create 40 newspaper headlines on a soccer player called *name* transfer to a team called *team* each one should start and end with @  use different styles  " }
     headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	"X-RapidAPI-Host": "open-ai25.p.rapidapi.com"
}

     response = requests.post(url, json=payload, headers=headers)

     #print(response.json())
     #headlines=json.loads(response.text)
     #headlines = re.findall(r'"(.+?)"',response.text)
 
     headlines = re.findall('@(.+?)@', response.text)
     for i in headlines:
          headline=Headline(headline=i)
          headline.save()


     return render(request, "fmx/register.html", {
                "what1": response.text, "what2":headlines
            })   

def random_headline(request):
     headline=Headline.objects.order_by('?').first()
     return JsonResponse(headline.serialize() , safe=False)