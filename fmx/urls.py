from django.contrib import admin
from django.urls import path
from . import views, market_views, lineup_views, table_views

urlpatterns = [
    path("", views.index, name="index"),
    path("utilities/<str:cmd>", views.utilities, name="utilities"),
    #path("import-team", views.importTeam, name="import-team"),
    path("import-players", views.importPlayers, name="import-players"),
    path("import-fixtures", views.importFixtures, name="import-fixtures"),
    path("get_teams", market_views.get_teams, name="get_teams"),
    path("get_player_value", views.get_player_value, name="get_player_value"),

    path("players/<str:page>/<str:team>/<str:position>/", views.players, name="players"),

    path("get_player_details/<str:id>", views.get_player_details, name="get_player_details"),

    path("market", market_views.market, name="market"),
    path("save_squad", market_views.save_squad, name="save_squad"),
    #path("get_headlines", market_views.get_headlines, name="get_headlines"),
    path("random_headline", market_views.random_headline, name="random_headline"),
    
    
    path("club_players", lineup_views.club_players, name="club_players"),
    path("lineup", lineup_views.lineup, name="lineup"),
    path("save_lineup", lineup_views.save_lineup, name="save_lineup"),
    path("calculate_round/<str:id>", lineup_views.calculate_round, name="calculate_round"),
    path("test_import_round", lineup_views.test_import_round, name="test_import_round"),

    
    path("get_fixture_ratings/<str:id>", lineup_views.get_fixture_ratings, name="get_fixture_ratings"),# calc players rating for fixture
    path("lineup_scores/<str:id>", lineup_views.lineup_scores, name="lineup_scores"), #sums player rating per lineup
    

    path("user_club/<str:id>", market_views.user_club, name="user_club"),

    path("match",  views.match, name="match"),

    path("round_results/<str:id>", table_views.round_results, name="round_results"),


    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
    


]
