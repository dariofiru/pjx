from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
import json
import logging
from django.core.paginator import Paginator
import requests
import http.client
from . import table_views
import datetime
from .models import Team, Player, Fixture, User, MatchTick, Club_details, Round, User_club, Goalscores, Table, Tmp_lineup_score,One2one
#from notifications.signals import notify
# Create your views here.

def utilities(request, cmd):
     
    if cmd=="match-week":
        fixtures = Fixture.objects.all() 
        for fixture in fixtures:
            week=fixture.date.isocalendar()[1]
            Fixture.objects.filter(pk=fixture.id).update(week=week)
    elif cmd=="week-count":
        week = (Fixture.objects
        .values('week')
        .annotate(dcount=Count('week'))
        .order_by()
        )
    elif cmd=="round-update":
        fixtures = Fixture.objects.all() 
        for fixture in fixtures:
            round=fixture.round
            round=round[-2:]
            Fixture.objects.filter(pk=fixture.id).update(round_num=round) 
    elif cmd=="round-match":
            fixtures = Fixture.objects.filter(round_num=4).all() 
    elif cmd=="insert-round": #todelete
            for i in range(1,38):
                round=Round(round_num=i,next=False)
                round.save()
    return render(request, "fmx/register.html",
             {
               "what1":  fixtures
               })

@login_required
def match(request):
     return render(request, "fmx/match.html")


@login_required(login_url='/login')
def index(request):
     return render(request, "fmx/index.html")

@login_required
def setScheduler(request, id):
    tick = MatchTick.objects.update(interval=int(id))
    return HttpResponse("done") 

@login_required
def resetGame(request):
    if request.user.username != 'admin':
        return HttpResponse(f'error {request.user.username}') 
    scorers=Goalscores.objects.all() #delete goalscorers chart
    for scorer in scorers:
        scorer.delete()
    
    get_player_value() #reset players value
    #table_round = Table.objects.count()
    #if table_round>1:
        #table_round = Table.objects.all().update(next_round=False)
    #table_round = Table.objects.filter(round_id=2).update(next_round=True)
    Round.objects.all().update(next=False, current=False) 
    Round.objects.filter(round_num=1).update(next=False, current=True)  
    Round.objects.filter(round_num=2).update(next=True)   
    rounds_to_delete = Table.objects.all()
    for round_to_delete in rounds_to_delete:
        round_to_delete.delete()
    table_views.create_table(None,2,2)
    Table.objects.all().update(next_round=False)
    Table.objects.filter(round_id=2).update(next_round=True)
    
    match_details=Tmp_lineup_score.objects.filter(type="table").all() #delete matches details
    for match_detail in match_details:
        match_detail.delete()
    one2ones=One2one.objects.all() #delete one2ones (and connected match stats)
    for one2one in one2ones:
        one2one.delete()
    
    elos=Club_details.objects.all().update(elo=1000) #put elo ranking back to start

    clubs=User_club.objects.all() #reset player value
    for club in clubs:
        player=Player.objects.filter(id=club.goalkeeper_1.id).first() 
        User_club.objects.filter(id=club.id).update(goalkeeper_1_price=player.value)
        player=Player.objects.filter(id=club.goalkeeper_2.id).first() 
        User_club.objects.filter(id=club.id).update(goalkeeper_2_price=player.value)
        player=Player.objects.filter(id=club.defender_1.id).first() 
        User_club.objects.filter(id=club.id).update(defender_1_price=player.value)
        player=Player.objects.filter(id=club.defender_2.id).first() 
        User_club.objects.filter(id=club.id).update(defender_2_price=player.value)
        player=Player.objects.filter(id=club.defender_3.id).first() 
        User_club.objects.filter(id=club.id).update(defender_3_price=player.value)
        player=Player.objects.filter(id=club.defender_4.id).first() 
        User_club.objects.filter(id=club.id).update(defender_4_price=player.value)
        player=Player.objects.filter(id=club.defender_5.id).first() 
        User_club.objects.filter(id=club.id).update(defender_5_price=player.value)
        player=Player.objects.filter(id=club.midfielder_1.id).first() 
        User_club.objects.filter(id=club.id).update(midfielder_1_price=player.value)
        player=Player.objects.filter(id=club.midfielder_2.id).first() 
        User_club.objects.filter(id=club.id).update(midfielder_2_price=player.value)
        player=Player.objects.filter(id=club.midfielder_3.id).first() 
        User_club.objects.filter(id=club.id).update(midfielder_3_price=player.value)
        player=Player.objects.filter(id=club.midfielder_4.id).first() 
        User_club.objects.filter(id=club.id).update(midfielder_4_price=player.value)
        player=Player.objects.filter(id=club.midfielder_5.id).first() 
        User_club.objects.filter(id=club.id).update(midfielder_5_price=player.value)
        player=Player.objects.filter(id=club.attacker_1.id).first() 
        User_club.objects.filter(id=club.id).update(attacker_1_price=player.value)
        player=Player.objects.filter(id=club.attacker_2.id).first() 
        User_club.objects.filter(id=club.id).update(attacker_2_price=player.value)
        player=Player.objects.filter(id=club.attacker_3.id).first() 
        User_club.objects.filter(id=club.id).update(attacker_3_price=player.value)
        player=Player.objects.filter(id=club.attacker_4.id).first() 
        User_club.objects.filter(id=club.id).update(attacker_4_price=player.value)
    return HttpResponse("reset") 


def importTeam(request):
    conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com/v3/leagues/39")
    url = "https://api-football-v1.p.rapidapi.com/v3/teams"
     
    querystring = {"league":"39","season":"2021"}

    headers = {
	"X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    json_response = response.json()

    team_data = json_response
    list_teams= ""

    #url = "https://api-football-v1.p.rapidapi.com/v3/players"
 
    response = requests.get(url, headers=headers, params=querystring)

    for team in team_data['response']:
        #list_teams =list_teams+item['team']['name']
        try:
            new_team = Team(id=team['team']['id'], name=team['team']['name'] , code= team['team']['code'], logo=team['team']['logo'] )
            new_team.save()
        except IntegrityError:
              pass
 
    #data = json_response

    return render(request, "fmx/index.html",
             {
               "api":  list_teams
               })
     
def importPlayers(request):

    tst ="hello"
    #page = players_data['paging']['total']
   
    active_teams = Team.objects.filter(active=True) 
    for team in active_teams:
        team_id_api = team.id
        paging = 1
        url = "https://api-football-v1.p.rapidapi.com/v3/players"

        querystring = {"team":team_id_api,"league":"39","season":"2021", "page":paging}

        headers = {
	        "X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)

        players_data= response.text 
        players_data = players_data.replace('null', '0' )
        players_data=json.loads(players_data)

        for players in players_data['response']:
                for i in range(len(players['statistics'])):
                    if(players['statistics'][i]['games']['appearences']):
                        if players['statistics'][i]['games']['appearences']>21:
                            try: 
                                new_player=Player(id=players['player']['id'],team_id=team,name=players['player']['name'],
                                   age=players['player']['age'], nationality = players['player']['nationality'],
                                    position = players['statistics'][i]['games']['position'],
                                    photo = players['player']['photo'],
                                    appearences = players['statistics'][i]['games']['appearences'],
                                    rating = players['statistics'][i]['games']['rating'],
                                    lineups = players['statistics'][i]['games']['lineups'],
                                    goals = players['statistics'][i]['goals']['total'], 
                                    conceded = players['statistics'][i]['goals']['conceded'],
                                    assists = players['statistics'][i]['goals']['assists'],
                                    yellowcard = players['statistics'][i]['cards']['yellow'],
                                    redcard =  players['statistics'][i]['cards']['red'],
                                    penaltywon = players['statistics'][i]['penalty']['won'],
                                     minutes = players['statistics'][i]['games']['minutes'],
                                    teamlogo = players['statistics'][i]['team']['logo'],
                                    height = players['player']['height'],
                                    weight = players['player']['weight']
                                   )
                                new_player.save()
                            except IntegrityError:
                                pass

    #for team in active_teams:
        for paging in range(2, players_data['paging']['total']):
            querystring = {"team":team_id_api,"league":"39","season":"2021", "page":paging}
            response = requests.get(url, headers=headers, params=querystring)

            players_data= response.text 
            players_data = players_data.replace('null', '0' )
            players_data=json.loads(players_data)

            for players in players_data['response']:
                for i in range(len(players['statistics'])):
                    if(players['statistics'][i]['games']['appearences']):
                        if players['statistics'][i]['games']['appearences']>21:
                            try: 
                                new_player=Player(id=players['player']['id'],team_id=team,name=players['player']['name'],
                                   age=players['player']['age'], nationality = players['player']['nationality'],
                                    position = players['statistics'][i]['games']['position'],
                                    photo = players['player']['photo'],
                                    appearences = players['statistics'][i]['games']['appearences'],
                                    rating = players['statistics'][i]['games']['rating'],
                                    lineups = players['statistics'][i]['games']['lineups'],
                                    goals = players['statistics'][i]['goals']['total'], 
                                    conceded = players['statistics'][i]['goals']['conceded'],
                                    assists = players['statistics'][i]['goals']['assists'],
                                    yellowcard = players['statistics'][i]['cards']['yellow'],
                                    redcard =  players['statistics'][i]['cards']['red'],
                                    penaltywon = players['statistics'][i]['penalty']['won'],
                                     minutes = players['statistics'][i]['games']['minutes'],
                                    teamlogo = players['statistics'][i]['team']['logo'],
                                    height = players['player']['height'],
                                    weight = players['player']['weight']
                                   )
                                new_player.save()
                            except IntegrityError:
                                pass   

    return render(request, "fmx/index.html",
             {
               "api": tst
               })

     
def get_player_value():
    players= Player.objects.all()
    d = {'player': '0'}
    for player in players:
        if player.assists:
            pass
        else:
            Player.objects.filter(pk=player.id).update(assists=0)
        if player.goals:
            pass
        else:
            Player.objects.filter(pk=player.id).update(goals=0)
        if player.lineups:
            pass
        else:
            Player.objects.filter(pk=player.id).update(lineups=0)

    for player in players:
        super_secret_algorithm=(player.appearences*0.5)+(player.lineups*0.8)+(player.goals*1.6)+(player.rating*1.1)+(player.assists*1.4)
        if player.position == 'Defender':
            super_secret_algorithm = super_secret_algorithm*0.82
        elif player.position == 'Attacker':
            super_secret_algorithm = super_secret_algorithm*1.05
        elif player.position =='Goalkeeper':
             super_secret_algorithm = super_secret_algorithm*0.65

        Player.objects.filter(pk=player.id).update(value=round(super_secret_algorithm,1),current_value= round(super_secret_algorithm,1))
         
        d[player.name] = round(super_secret_algorithm,1)

    

def players(request,page,team,position,value, order, id):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx')
    #############
    # Retrieves the main list of available players
    # and takes care of filtering or search requests
    #
    #############
    #model._meta.get_fields()
    userT = User.objects.filter(id=id) 
    #notify.send(userT, recipient=userT, verb='You have a new notification.')
    player_id_list=[]
    try:
          user_clubT = User_club.objects.filter(user__in=userT).get() 
          logger.info(user_clubT)
          player_id_list=user_clubT.list_players_club 
          logger.info(player_id_list) 
          #user_clubT =  user_clubT.first()
    except User_club.DoesNotExist:
          pass
    
            #player_test= Player.objects.filter(id=).all()
    #############
    players= Player.objects.all()
    if order=="name":
        players = players.order_by(f"{order}").all()
    else:
        players = players.order_by(f"-{order}").all()
    team_tmp="no team"
    position_tmp="no position"
    if team!="0":
        try:
            team_tmp = Team.objects.filter(id=team)
        except Team.DoesNotExist:
            HttpResponse("error")
        
        players= players.filter(team_id__in=team_tmp).all()
    if position!="0":
        try:    
            players= players.filter(position=position) 
        except Player.DoesNotExist:
            HttpResponse("error")
    if value=="40":
        try:    
            players= players.filter(value__lte=40) 
        except Player.DoesNotExist:
            HttpResponse("error")
    if value=="4060":
        try:    
            players= players.filter(value__range=(40, 60)) 
        except Player.DoesNotExist:
            HttpResponse("error")
    if value=="60":
        try:    
            players= players.filter(value__gte=60) 
        except Player.DoesNotExist:
            HttpResponse("error")
    paginator = Paginator(players, 6)
    logger.info(f'paginator: {paginator.num_pages} ') 
    players = paginator.get_page(page)
     
    json_final =[]
    for player in players:
            json_tmp=player.serialize()
            if player.id in player_id_list:
                 json_tmp["in_squad"]=True
            else:
                json_tmp["in_squad"]=False 
            json_tmp["team_name"]=player.team_id.name
            json_tmp["pages"]=paginator.num_pages

            json_final.append(json_tmp)  
    return JsonResponse(json_final, safe=False)



def get_player_details(request,id):
    playerT = None
    try:
        playerT = Player.objects.filter(id=id)
    except Player.DoesNotExist:
        HttpResponse("error")

    json_final =[]
    for player in playerT:
            # try:
            #     team_data = Team.objects.filter(id=player.team_id)
            # except Team.DoesNotExist:
            #     HttpResponse("error")
          #player=player.serialize()
            json_tmp=player.serialize()
            json_tmp["team_name"]=player.team_id.name
            json_tmp["team_logo"]=player.team_id.logo

            json_final.append(json_tmp)  
    return JsonResponse(json_final, safe=False)
        
    #team_tmp = Team.objects.filter(id=playerT.team_id)

    return JsonResponse([player.serialize() for player in playerT], safe=False)



def importFixtures(request):
    active_teams = Team.objects.filter(active=True) 
    for team in active_teams:
        team_id_api = team.id
        url = "https://api-football-v1.p.rapidapi.com/v3/fixtures"

        querystring = {"team":team_id_api, "league":"39","season":"2021"}

        headers = {
	    "X-RapidAPI-Key": "4310cb923emsh4f65160b63c1034p1fbf64jsn1c68913a9032",
	    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        fixture_data= response.json()
        for fixture in fixture_data['response']:
            try: 
                home_team = Team.objects.filter(id=fixture['teams']['home']['id']).first()
                away_team = Team.objects.filter(id=fixture['teams']['away']['id']).first()
                new_fixture=Fixture(id=fixture['fixture']['id'],timestamp=fixture['fixture']['timestamp'],
                                    home=home_team,
                                     away = away_team,
                                     date = fixture['fixture']['date'],
                                     round =  fixture['league']['round']
                                   )
                
                new_fixture.save()
            except IntegrityError:
                pass 
    
    return render(request, "fmx/index.html",
             {
               "api": "tst"
               })        




def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "fmx/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "fmx/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        logo = request.POST["logo"]
        club = request.POST["club"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        club_name=Club_details.objects.filter(club= club).count()
        if club_name>0:
            return render(request, "fmx/register.html", {
                "message": "Team name already taken."
            })
        if password != confirmation:
            return render(request, "fmx/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            club_details= Club_details(user=user, club=club, logo=logo)
            club_details.save()
        except IntegrityError:
            return render(request, "fmx/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "fmx/register.html")
    

 