from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg
import json
import requests
import http.client
from .models import Team, Player, Fixture, User
# Create your views here.

def index(request):
     return render(request, "fmx/index.html")
            #, {
             #   "PostForm": form, "check":"yes"
            #})

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
        if team['team']['id']<40:
            list_teams =list_teams+team['team']['name']
            querystring = {"team":team['team']['id'],"league":"39","season":"2021"}
            response = requests.get(url, headers=headers, params=querystring)
            players_data = response.json()
            for player in players_data['response']:
                try:
                    new_player = Player            (id=player['player']['id'],team_id=team['team']['id'],
                       name=player['player']['name'],
                         age= player['player']['age'], 
                         
                          position=player['statistics']['games']['position'],
                          photo=player['photo']['photo'],
                          appearences=player['statistics']['games']['appearences']       )
                    new_player.save()
                except IntegrityError:
                    pass
    #data = json_response

    return render(request, "fmx/index.html",
             {
               "api":  list_teams
               })
     
def importPlayers(request):
   # f = open('players.json', 'r', encoding='utf-8')
 
    # returns JSON object as 
    # a dictionary
    #players_data = json.load(f)
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

        players_data= response.json()

        for players in players_data['response']:
                for i in range(len(players['statistics'])):
                    if(players['statistics'][i]['games']['appearences']):
                        if players['statistics'][i]['games']['appearences']>11:
                            tst=tst+ " " + players['player']['name'] + " "  +str(players['statistics'][i]['team']['id'])
                            try: 
                                new_player=Player(id=players['player']['id'],team_id=team,name=players['player']['name'],
                                   age=players['player']['age'], nationality = players['player']['nationality'],
                                    position = players['statistics'][i]['games']['position'],
                                    photo = players['player']['photo'], appearences = players['statistics'][i]['games']['appearences'],
                                    rating = players['statistics'][i]['games']['rating'],
                                    lineups = players['statistics'][i]['games']['lineups'],
                                    goals = players['statistics'][i]['goals']['total'], 
                                    conceded = players['statistics'][i]['goals']['conceded'],
                                    assists = players['statistics'][i]['goals']['assists']
                                   )
                                new_player.save()
                            except IntegrityError:
                                pass

    #for team in active_teams:
        for paging in range(2, players_data['paging']['total']):
            querystring = {"team":team_id_api,"league":"39","season":"2021", "page":paging}
            response = requests.get(url, headers=headers, params=querystring)

            players_data=response.json()

            for players in players_data['response']:
                for i in range(len(players['statistics'])):
                    if(players['statistics'][i]['games']['appearences']):
                        if players['statistics'][i]['games']['appearences']>11:
                            tst=tst+ " " + players['player']['name'] + " "  +str(players['statistics'][i]['team']['id'])
                            try: 
                                new_player=Player(id=players['player']['id'],team_id=team,name=players['player']['name'],
                                   age=players['player']['age'], nationality = players['player']['nationality'],
                                    position = players['statistics'][i]['games']['position'],
                                    photo = players['player']['photo'], appearences = players['statistics'][i]['games']['appearences'],
                                    rating = players['statistics'][i]['games']['rating'],
                                    lineups = players['statistics'][i]['games']['lineups'],
                                    goals = players['statistics'][i]['goals']['total'], 
                                    conceded = players['statistics'][i]['goals']['conceded'],
                                    assists = players['statistics'][i]['goals']['assists']
                                   )
                                new_player.save()
                            except IntegrityError:
                                pass   

    return render(request, "fmx/index.html",
             {
               "api": tst
               })

     
def get_player_value(request):
    players= Player.objects.all()
    d = {'player': '0'}
    for player in players:
        if player.assists:
            pass
        else:
            Player.objects.filter(pk=player.id).update(assists=0)
            
    for player in players:
        super_secret_algorithm=(player.appearences*0.5)+(player.lineups*0.8)+(player.goals*1.6)+(player.rating*1.1)+(player.assists*1.4)
        if player.position == 'Defender':
            super_secret_algorithm = super_secret_algorithm*0.80
        elif player.position == 'Attacker':
            super_secret_algorithm = super_secret_algorithm*1.05

        Player.objects.filter(pk=player.id).update(value=round(super_secret_algorithm,1))
         
        d[player.name] = round(super_secret_algorithm,1)

    avg = Player.objects.aggregate(Avg('value'))
    return render(request, "fmx/index.html",
             {
               "players": players, "avg" : avg
               })

def players(request):
    players= Player.objects.all()
    players = players.order_by("-position").all()

    return JsonResponse([player.serialize() for player in players], safe=False)

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
                new_fixture=Fixture(id=fixture['fixture']['id'],timestamp=fixture['fixture']['timestamp'],
                                   home=fixture['teams']['home']['id'],
                                    away = fixture['teams']['away']['id'],
                                    date = fixture['fixture']['date'] 
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
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "fmx/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "fmx/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "fmx/register.html")
    