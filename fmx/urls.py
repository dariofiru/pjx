from django.contrib import admin
from django.urls import path
from . import views, market_views

urlpatterns = [
    path("", views.index, name="index"),
    path("utilities/<str:cmd>", views.utilities, name="utilities"),
    #path("import-team", views.importTeam, name="import-team"),
    #path("import-players", views.importPlayers, name="import-players"),
    #path("import-fixtures", views.importFixtures, name="import-fixtures"),
    
    path("get_player_value", views.get_player_value, name="get_player_value"),
    path("players", views.players, name="players"),

    path("market", market_views.market, name="market"),

    path("user_club/<str:id>", market_views.user_club, name="user_club"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
    


]
