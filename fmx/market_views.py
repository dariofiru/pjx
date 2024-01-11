from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
import json
from decimal import Decimal
import requests
import logging
import http.client
import datetime
import re
from .models import Team, Player, Fixture, User, User_club, Headline, Lineup,Club_details
# Create your views here.
 
def market(request):
     return render(request, "fmx/market.html")
             
def user_club(request, id):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger(__name__)
     userT = User.objects.filter(id=id) 
     try:
          user_clubT = User_club.objects.filter(user__in=userT).get()
          #user_clubT =  user_clubT.get()
     except User_club.DoesNotExist:
          return HttpResponse("empty")
     json_final =[]
     #json_tmp=user_clubT.serialize() 
     player=Player.objects.filter(id=user_clubT.goalkeeper_1.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Goalkeeper-1"
     json_tmp["photo"]=player.photo   
     json_tmp["remaining_budget"]=user_clubT.remaining_budget  
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.goalkeeper_2.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Goalkeeper-2"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.defender_1.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Defender-1"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.defender_2.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Defender-2"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.defender_3.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Defender-3"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.defender_4.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Defender-4"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.defender_5.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Defender-5"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
          
     
     player=Player.objects.filter(id=user_clubT.midfielder_1.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Midfielder-1"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.midfielder_2.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Midfielder-2"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.midfielder_3.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Midfielder-3"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.midfielder_4.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Midfielder-4"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.midfielder_5.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Midfielder-5"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     
     player=Player.objects.filter(id=user_clubT.attacker_1.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Attacker-1"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.attacker_2.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Attacker-2"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp)
     player=Player.objects.filter(id=user_clubT.attacker_3.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Attacker-3"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 
     player=Player.objects.filter(id=user_clubT.attacker_4.id).first()
     json_tmp=player.serialize()
     json_tmp["position"]="Attacker-4"
     json_tmp["photo"]=player.photo
     json_final.append(json_tmp) 

     return JsonResponse(json_final, safe=False)
 

def get_teams(request):
     teams = Team.objects.filter(active=True)
     teams = teams.order_by("-name").all()
     return JsonResponse([team.serialize() for team in teams], safe=False)

def save_squad(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
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
     squad_value=Decimal('0.0')

     for member in squad['squad']:
          position=member['position']
          id=member['id']
          
          if position=="Goalkeeper-1":
               try:
                    goalkeeper_1 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+goalkeeper_1.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Goalkeeper-2":
               try:
                    goalkeeper_2 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+goalkeeper_2.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-1":
               try:
                    defender_1 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+defender_1.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-2":
               try:
                    defender_2 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+defender_2.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-3":
               try:
                    defender_3 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+defender_3.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-4":
               try:
                    defender_4 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+defender_4.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Defender-5":
               try:
                    defender_5 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+defender_5.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-1":
               try:
                    midfielder_1 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+midfielder_1.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-2":
               try:
                    midfielder_2 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+midfielder_2.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-3":
               try:
                    midfielder_3 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+midfielder_3.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-4":
               try:
                    midfielder_4 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+midfielder_4.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Midfielder-5":
               try:
                    midfielder_5 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+midfielder_5.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-1":
               try:
                    attacker_1 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+attacker_1.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-2":
               try:
                    attacker_2 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+attacker_2.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-3":
               try:
                    attacker_3 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+attacker_3.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-4":
               try:
                    attacker_4 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+attacker_4.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="Attacker-5":
               try:
                    attacker_5 = Player.objects.filter(id=id).first()
                    squad_value=squad_value+attacker_5.current_value
               except Player.DoesNotExist:
                    HttpResponse("error")

     User_club.objects.update_or_create(user= request.user,
                 name=squad_name,
                 defaults={'remaining_budget':remaining_budget,
               'goalkeeper_1': goalkeeper_1,    
               'goalkeeper_2': goalkeeper_2,
               'defender_1': defender_1,
               'defender_2': defender_2,
               'defender_3': defender_3,
               'defender_4': defender_4,
               'defender_5': defender_5,
               'midfielder_1': midfielder_1,
               'midfielder_2': midfielder_2,
               'midfielder_3': midfielder_3,
               'midfielder_4': midfielder_4,
               'midfielder_5': midfielder_5,
               'attacker_1': attacker_1,
               'attacker_2': attacker_2,
               'attacker_3': attacker_3,
               'attacker_4': attacker_4,
               'attacker_5': attacker_5,
               'initial_account': squad_value       
                 }
                 )
     Club_details.objects.filter(user=request.user).update(has_squad=True)
     lineupDelete=squad['lineupDelete']
     logger.info(f'already a lineup: {lineupDelete}')
     for man in lineupDelete:
          logger.info(f'lets see: {man}')
     #existing_lineup=Lineup.objects.filter(user=request.user, active=True).get()
     return HttpResponseRedirect("/")

def get_headlines(request):
     headline_list=""
     url = "https://open-ai25.p.rapidapi.com/ask"

    # payload = { "query": "create 40 newspaper headlines on a soccer player called *name* transfer to a team called *team* each one should start and end with @  use different styles  " }
     #payload = { "query": "create 30 newspaper headlines on a soccer player called *name* rumored of transfering to a team called *team* each phrase should start and end with @  use different styles" } 
     payload = { "query": "create 20 newspaper headlines on a soccer player called *name* dropped by a team called *team* each separate full phrase should start and end with @  use different styles" } 
     
     headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	"X-RapidAPI-Host": "open-ai25.p.rapidapi.com"
}

     response = requests.post(url, json=payload, headers=headers)
     headlines = re.findall('@(.+?)@', response.text)
     for i in headlines:
          headline=Headline(headline=i, type="sell")
          headline.save()

     return JsonResponse({"status":"ok"}, safe=False)   

def random_headline(request, type):
     headline=Headline.objects.filter(type=type).order_by('?').first()
     return JsonResponse(headline.serialize() , safe=False)

