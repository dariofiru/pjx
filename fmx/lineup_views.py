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
from .models import Team, Player, Fixture, User, User_club, Lineup, Fixture_round
# Create your views here.

def lineup(request):
     return render(request, "fmx/lineup.html")

def club_players(request):
     curr_player=None
     try:
          players = User_club.objects.filter(user=request.user).first()  
     except User_club.DoesNotExist:
          return HttpResponse("empty") 


     json_final =[]
     curr_player = Player.objects.filter(id=players.goalkeeper_1.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.goalkeeper_2.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_1.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_2.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_3.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_4.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.defender_5.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_1.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_2.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_3.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_4.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.midfielder_5.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_1.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_2.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_3.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)
     curr_player = Player.objects.filter(id=players.attacker_4.id).first()
     json_tmp=curr_player.serialize()   
     json_final.append(json_tmp)

     #for user_club in players:
     #json_final.append(players.serialize())
     
     return JsonResponse(json_final, safe=False)

     # return render(request, "fmx/register.html"   
     #         , {
     #                "what": players 
     #         }) 
     return JsonResponse([user_club.serialize() for user_club in players], safe=False)
     
# don't touch
def user_club(request, id):
     userT = User.objects.filter(id=id)
     try:
           user_clubT = User_club.objects.filter(user__in=userT).get()
     except User_club.DoesNotExist:
          return HttpResponse("empty")

     return JsonResponse([user_club.serialize() for user_club in user_clubT], safe=False)

 

def save_lineup(request):
     squad = json.loads(request.body)
      
     player_1 = None
     player_2 = None
     player_3 = None
     player_4 = None
     player_5 = None
     player_6 = None
     player_7 = None
     player_8 = None
     player_9 = None
     player_10 = None
     player_11 = None
     squad_name= squad['squad_name']

     # return render(request, "fmx/register.html"   
     #      , {
     #             "what": squad_name 
     #      }) 

     for member in squad['squad']:
          position=member['position']
          id=member['id']
          
          if position=="player-1":
               try:
                    player_1 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-2":
               try:
                    player_2 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-3":
               try:
                    player_3 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-4":
               try:
                    player_4 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-5":
               try:
                    player_5 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-6":
               try:
                    player_6 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-7":
               try:
                    player_7 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-8":
               try:
                    player_8 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-9":
               try:
                    player_9 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-10":
               try:
                    player_10 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
          elif position=="player-11":
               try:
                    player_11 = Player.objects.filter(id=id).first()
               except Player.DoesNotExist:
                    HttpResponse("error")
     user_club = User_club.objects.filter(user=request.user).get()

     lineup= Lineup(
               user= request.user,
               club=user_club,
               player_1 = player_1,
               player_2 = player_2,
               player_3 = player_3,
               player_4 = player_4,
               player_5 = player_5,
               player_6 = player_6,
               player_7 = player_7,
               player_8 = player_8,
               player_9 = player_9,
               player_10 = player_10,
               player_11 = player_11
                )
     lineup.save()
     HttpResponse("done")

def calculate_round(request, id):
     team_list="empty"
     #players= Player.objects.all()
     #for player in players:
     teams= Team.objects.filter(active=True) 
     #teams=Team.objects.all()
     call = 0
     for team in teams:
          try:
               fixture= Fixture.objects.filter(round_num=id, home=team).get()
          except Fixture.DoesNotExist:
               fixture= Fixture.objects.filter(round_num=id, away=team).get()

          team_list=team_list+"("+str(fixture.id)+") "+fixture.home.name+" vs "+fixture.away.name
          url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/players"

          querystring = {"fixture": fixture.id,"team":team.id}
          headers = {
	     "X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
          }
          call = call + 1
          response = requests.get(url, headers=headers, params=querystring)
          players_data= response.text 
          players_data = players_data.replace('null', '0' )
          players_data=json.loads(players_data)

          # return render(request, "fmx/register.html", {
          #       "what1": response.text, "what2":players_data
          #   })   

          for players in players_data['response']:
                for i in range(len(players['players'])):
                         
                         team_list=team_list+ " " + players['players'][i]['player']['name'] + " "  +str(players['players'][i]['player']['id'])
                         player = Player.objects.filter(id=players['players'][i]['player']['id']).first()
                          
                         try: 
                               new_fixture_round=Fixture_round(
                                    fixture=fixture,
                                    player = player,
                                     rating = players['players'][i]['statistics'][0]['games']['rating'],
                                     goals = players['players'][i]['statistics'][0]['goals']['total'], 
                                     conceded = players['players'][i]['statistics'][0]['goals']['conceded'],
                                     assists = players['players'][i]['statistics'][0]['goals']['assists'],
                                     yellowcard = players['players'][i]['statistics'][0]['cards']['yellow'],
                                     redcard =  players['players'][i]['statistics'][0]['cards']['red']
                                    )
                               new_fixture_round.save()
                         except IntegrityError:
                                pass
               
     return render(request, "fmx/register.html", {
                "what1": call, "what2":response
            })   


def get_fixture_ratings(request,id):
     tst=""
     fixture_rounds = Fixture_round.objects.filter(rating=Decimal('0.0')).all()
     for fixture_round in fixture_rounds:
          tst=tst+"-"+str(fixture_round.rating)+" "+fixture_round.player.name
          fixture_round.rating=Decimal('6.0')
          fixture_round.save()
  
     fixtures= Fixture.objects.filter(round_num=id).all()
     
     for fixture in fixtures:
          fixture_rounds = Fixture_round.objects.filter(fixture=fixture).all()

          for fixture_round in fixture_rounds:
               #fixture_player=Fixture_round.objects.filter(fixture=fixture, player=fixture_round.player).first()
          #      return render(request, "fmx/register.html", {
          #        "what1": tst
               tst=tst+" $ "+fixture_round.player.name+" "+str(fixture_round.assists)
               
               try: 
                    score=fixture_round.rating+(fixture_round.goals*3)+fixture_round.assists
                    score = score-fixture_round.conceded
                    score = score-fixture_round.yellowcard
                    score = score-(fixture_round.redcard*3)                    
                    Fixture_round.objects.filter(fixture=fixture, player=fixture_round.player).update(score=round(score,1))  
               except TypeError:
                    return render(request, "fmx/register.html", {
                  "what1": fixture_round, "what2":fixture_round.rating
             })       
     return render(request, "fmx/register.html", {
               "what1": tst
          })  

def lineup_scores(request, id): # calculates total point for each lineup/round
     # fixture=Fixture_round.objects.all()
     # fixture.order_by("-player").all()
     # return render(request, "fmx/register.html", {
     #           "what1": fixture
     #      })   
     for row in Fixture_round.objects.all().reverse():
          if Fixture_round.objects.filter(fixture=row.fixture,player=row.player).count() > 1:
                row.delete()

     lineups= Lineup.objects.all()
     fixtures= Fixture.objects.filter(round_num=id).all()
     x="--"
     scores = []
     for fixture in fixtures:
          for lineup in lineups:
                    team_score= Decimal('0.0 ')
                    #Player.objects.filter(f"player_{x}"=f"player_{x}")
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_1).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                         Lineup.objects.filter(id=lineup.id).update(score=lineup.score+fixture_player.score)
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_2).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                         Lineup.objects.filter(id=lineup.id).update(score=lineup.score+fixture_player.score)
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_3).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_4).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_5).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_6).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_7).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_8).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_9).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_10).get()
                         x=x+" - "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_11).get()
                         x=x+" - "+lineup.club+" "+fixture_player.player.name+"="+str(fixture_player.score)
                         team_score=team_score+fixture_player.score
                    except Fixture_round.DoesNotExist: 
                         pass 
                    scores.append(team_score)
                    
                         
     return render(request, "fmx/register.html", {
                          "what1": scores, "what2":x
                    })   
