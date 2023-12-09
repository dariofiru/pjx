from django.contrib import admin
from django.urls import path
from . import views, market_views

urlpatterns = [
    path("", views.index, name="index"),
    path("utilities/<str:cmd>", views.utilities, name="utilities"),
    #path("import-team", views.importTeam, name="import-team"),
    #path("import-players", views.importPlayers, name="import-players"),
    #path("import-fixtures", views.importFixtures, name="import-fixtures"),
    path("get_teams", market_views.get_teams, name="get_teams"),
    path("get_player_value", views.get_player_value, name="get_player_value"),

    path("players/<str:page>/<str:team>/<str:position>/", views.players, name="players"),

    path("get_player_details/<str:id>", views.get_player_details, name="get_player_details"),

    path("market", market_views.market, name="market"),
    path("save_squad", market_views.save_squad, name="save_squad"),

    path("user_club/<str:id>", market_views.user_club, name="user_club"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
    


]
