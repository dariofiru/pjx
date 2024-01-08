from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from decimal import Decimal
import logging
import json
import requests
import http.client
import datetime
from . import table_views 
from .models import Team, Player, Club_details, Fixture, User, User_club, Lineup, Fixture_round, Lineup_round, Round, Table
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


def get_lineup(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')  
     try:
          existing_lineup=Lineup.objects.filter(user=request.user, active=True).get()
     except Lineup.DoesNotExist:
          return HttpResponse("empty")
     
     logger.info(f'already a lineup: {existing_lineup}')
     return JsonResponse([existing_lineup.serialize()], safe=False)

def save_lineup(request):
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')   
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
     ## check to see if is first lineup. if first lineup add to table
     ## else update lineup reference in table for future matches ONLY
     existing=False
     try:
          existing_lineup=Lineup.objects.filter(user=request.user, active=True).get()
          logger.info(f'already a lineup: {existing_lineup}')
          round = Round.objects.filter(next=True).values("round_num").first()
          games_home = Table.objects.filter(round_num__gte=round["round_num"],lineup_1=existing_lineup).count()
          games_away = Table.objects.filter(round_num__gte=round["round_num"],lineup_2=existing_lineup).count()
          games = games_home+games_away
          if games>0:
               existing=True
               
          logger.info(f'games: {games}')
     except Lineup.DoesNotExist:
          existing=False
          pass
     Lineup.objects.filter(user=request.user).update(active=False) # deactivate old lineups
     lineup= Lineup(     
               user= request.user,
               club=user_club,
               player_1 = player_1,player_2 = player_2, player_3 = player_3, player_4 = player_4, player_5 = player_5,
               player_6 = player_6, player_7 = player_7, player_8 = player_8, player_9 = player_9,
               player_10 = player_10, player_11 = player_11, active=True )
     lineup.save()
     if existing: # update table lineup id
          Table.objects.filter(round_num__gte=round["round_num"],lineup_1=existing_lineup).update(lineup_1=lineup)
          Table.objects.filter(round_num__gte=round["round_num"],lineup_2=existing_lineup).update(lineup_2=lineup)
     else: # add team/lineup to match table
          round = Round.objects.filter(next=True).values("round_num").first()
          logger.info(f'no lineups yet: {lineup.id}')
          round=round['round_num']
          table_views.new_team_in_table(None, lineup.id)
     #HttpResponse("done")
     # adding lineup to next round
     round=Round.objects.filter(next=True).values("round_num") # probably TODELETE
     lineup_round=Lineup_round(user=request.user,lineup=lineup, round_num=round)
     lineup_round.save()  
     return HttpResponseRedirect("/")

def test_import_round(request):
     team_list="empty"
     try:
               fixture= Fixture.objects.filter(round_num=4, home=49).get()
     except Fixture.DoesNotExist:
               fixture= Fixture.objects.filter(round_num=4, away=49).get()
     team_list=team_list+"("+str(fixture.id)+") "+fixture.home.name+" vs "+fixture.away.name
     url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/players"
 
     querystring = {"fixture":710588 ,"team":49}
     headers = {
	     "X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
          }
     response = requests.get(url, headers=headers, params=querystring)
     players_data= response.text 
     players_data = players_data.replace('null', '0' )
     players_data=json.loads(players_data)
     for players in players_data['response']:
                for i in range(len(players['players'])):
                         
                         team_list=team_list+ " " + players['players'][i]['player']['name'] + " "  +str(players['players'][i]['player']['id'])
                         player = Player.objects.filter(id=players['players'][i]['player']['id']).first()
                          
     return render(request, "fmx/register.html", {
            "what1": player, "what2":team_list
             })   

def check_for_round_data():
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     round = Round.objects.filter(next=True).values("round_num").first() # retrieve round number   
     round=round['round_num']   
     if round==38:
          logger.info(f'here: {round} ')
          Round.objects.filter(round_num=round-1).update(current=False) 
          Round.objects.filter(round_num=round).update(next=False, current=True)  
          Round.objects.filter(round_num=1).update(next=True)         
     else:
          logger.info(f'or here : {round} ')
          Round.objects.filter(round_num=round-1).update(current=False) 
          Round.objects.filter(round_num=round).update(next=False, current=True)  
          Round.objects.filter(round_num=round+1).update(next=True)              
     
     fixture= Fixture.objects.filter(round_num=round).first()
     logger.info(f'fixture: {fixture} ')
     downloaded_fixture=Fixture_round.objects.filter(fixture=fixture).count()
     logger.info(f'downloaded_fixture: {downloaded_fixture} ')
     if downloaded_fixture==0:
          calculate_round(round)
          get_fixture_ratings(round) # calculate players score 
          lineup_scores(round)
          calculate_results(round)

    # return HttpResponse(json.dumps({"round":round, "status":"ok"}), content_type="application/json")     

def calculate_results(round): # returns winner/looser for each round and updates ELO TOFIX
        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger('fmx')
        #round = Round.objects.filter(current=True).values("round_num").first() # retrieve round number 
        games = Table.objects.filter(round_num=round).all() # retrieve all the matches in round
        logger.info(f"round: {round}")
        json_final =[]
        for game in games: # retrive lineup scores, user and team data
            logger.info(game)
            try:
                 lineup_1 = Lineup.objects.filter(id=game.lineup_1.id).values("score")
                 user_1 = Lineup.objects.filter(id=game.lineup_1.id).values("user")
                 score_1=lineup_1[0]['score']
                 
                 Table.objects.filter(pk=game.id).update(score_1=score_1)
            except Team.DoesNotExist:
                 pass
            logger.info(f"{lineup_1} - {score_1}")

            try:
                 lineup_2 = Lineup.objects.filter(id=game.lineup_2.id).values("score")
                 user_2 = Lineup.objects.filter(id=game.lineup_2.id).values("user")
                  
                 score_2=lineup_2[0]['score']
                 Table.objects.filter(pk=game.id).update(score_2=lineup_2)
            except Team.DoesNotExist:
                 pass
               
            elo_1 = Club_details.objects.filter(user__in=user_1).values('elo').first()
            
            elo_2 = Club_details.objects.filter(user__in=user_2).values('elo').first()
            logger.info(f"{elo_1} - {elo_2}")     
            if score_1>=score_2:
                  new_elos = table_views.elo_value(elo_1['elo'], elo_2['elo'])
                  new_elo_1=new_elos[0]
                  new_elo_2=new_elos[1]
            else:
                  new_elos = table_views.elo_value(elo_2['elo'], elo_1['elo'])
                  new_elo_2=new_elos[0]
                  new_elo_1=new_elos[1]
            probability=new_elos[2]
            
            Club_details.objects.filter(user__in=user_1).update(elo=new_elo_1)
            Club_details.objects.filter(user__in=user_2).update(elo=new_elo_2)
            


def calculate_round(id): # downloads from API all players stats for fixures in round
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
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
          logger.info(f'match: {team_list} ')
          url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/players"

          querystring = {"fixture": fixture.id, "team": team.id}
          headers = {
	     "X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
          }
          call = call + 1
          response = requests.get(url, headers=headers, params=querystring)
          players_data= response.text 
          players_data = players_data.replace('null', '0' )
          players_data=json.loads(players_data)
 

          for players in players_data['response']:
                for i in range(len(players['players'])):
                         
                         team_list=team_list+ " " + players['players'][i]['player']['name'] + " "  +str(players['players'][i]['player']['id'])
                         try: 
                              player = Player.objects.filter(id=players['players'][i]['player']['id']).first()
                         except TypeError: 
                              pass
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
      


def get_fixture_ratings(id): #calculates  total score for each PLAYER in fixure_round
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx')
     tst=""
     fixture_rounds = Fixture_round.objects.filter(rating=Decimal('0.0')).all()
     for fixture_round in fixture_rounds:
          tst=tst+"-"+str(fixture_round.rating)+" "+fixture_round.player.name
          fixture_round.rating=Decimal('6.0')
          fixture_round.save()
  
     fixtures= Fixture.objects.filter(round_num=id).all()
     logger.info(f'calculating ratings')
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
                 pass

def lineup_scores(id): # calculates total point for each lineup/round
     logging.basicConfig(level=logging.INFO)
     logger = logging.getLogger('fmx') 
     lineups= Lineup.objects.filter(active=True).all() #to fix and test only active lineups
     fixtures= Fixture.objects.filter(round_num=id).all()
     x="--"
     scores = []
     for fixture in fixtures:
          for lineup in lineups:
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
                         #x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_5.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_5.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_5.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_6).get()
                        # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_6.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_6.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_6.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_7).get()
                        # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_7.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_7.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_7.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_8).get()
                         #x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_8.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_8.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_8.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_9).get()
                         #x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_9.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_9.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_9.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_10).get()
                        # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_10.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_10.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_10.rating)
                    try:
                         fixture_player=Fixture_round.objects.filter(fixture=fixture, player=lineup.player_11).get()
                        # x=x+"("+lineup.club.name+")"+fixture_player.player.name+"="+str(fixture_player.score)+" >"+str(lineup.player_11.rating)
                         team_score=team_score+fixture_player.score+Decimal(lineup.player_11.rating)
                    except Fixture_round.DoesNotExist: 
                         team_score=team_score+Decimal('6.0')+Decimal(lineup.player_11.rating)
                    scores.append(team_score)
                    Lineup.objects.filter(id=lineup.id).update(score=team_score)
                    logger.info(f'lineup: {lineup} score: {team_score}')
                    
              