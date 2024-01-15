from django.contrib import admin
from django.urls import path, include
from . import views, market_views, lineup_views, table_views, one2one_views, stats_views

urlpatterns = [
    path("", views.index, name="index"),
    path("utilities/<str:cmd>", views.utilities, name="utilities"),
    #path("import-team", views.importTeam, name="import-team"),
    path("import-players", views.importPlayers, name="import-players"),
    path("import-fixtures", views.importFixtures, name="import-fixtures"),
    path("get_teams", market_views.get_teams, name="get_teams"),
    path("get_player_value", views.get_player_value, name="get_player_value"),

    path("players/<str:page>/<str:team>/<str:position>/<str:value>/<str:order>/<str:id>", views.players, name="players"),

    path("get_player_details/<str:id>", views.get_player_details, name="get_player_details"),

    path("market", market_views.market, name="market"),
    path("save_squad", market_views.save_squad, name="save_squad"),
    path("get_headlines", market_views.get_headlines, name="get_headlines"),
    path("random_headline/<str:type>", market_views.random_headline, name="random_headline"),
    
    
    path("club_players/<str:position>", lineup_views.club_players, name="club_players"),
    path("lineup", lineup_views.lineup, name="lineup"),
    path("get_lineup", lineup_views.get_lineup, name="get_lineup"),
    path("save_lineup", lineup_views.save_lineup, name="save_lineup"),
    #path("calculate_round/<str:id>", lineup_views.calculate_round, name="calculate_round"),
    path("test_import_round", lineup_views.test_import_round, name="test_import_round"),
    #path("check_for_round_data", lineup_views.check_for_round_data, name="check_for_round_data"),
    

    
    #path("get_fixture_ratings/<str:id>", lineup_views.get_fixture_ratings, name="get_fixture_ratings"),# calc players rating for fixture
    #path("lineup_scores/<str:id>", lineup_views.lineup_scores, name="lineup_scores"), #sums player rating per lineup
    

    path("user_club/<str:id>", market_views.user_club, name="user_club"),

    path("match",  views.match, name="match"),

    path("table", table_views.table, name="table"),
    path("get_table", table_views.get_table, name="get_table"),
    path("round_results", table_views.round_results, name="round_results"),
    path("create_table/<str:id>", table_views.create_table, name="create_table"),
    path("new_team_in_table/<str:id>", table_views.new_team_in_table, name="new_team_in_table"),
    path("get_next_match", table_views.get_next_match, name="get_next_match"),
    path("get_match_stats/<str:id>", table_views.get_match_stats, name="get_match_stats"),
    
   # path("schedule_match", table_views.schedule_match, name="schedule_match"), # test cron
    path("get_start", table_views.get_start, name="get_start"), # test cron
    
    path("one2one", one2one_views.one2one, name="one2one"),
    path("my_one2one", one2one_views.my_one2one, name="my_one2one"),
    path("my_one2one_data/<str:ch_stat>/<str:ch_order>/<str:br_stat>/<str:br_order>", one2one_views.my_one2one_data, name="my_one2one_data"),
    path("get_one2one_teams", one2one_views.get_one2one_teams, name="get_one2one_teams"),
    path("challenge/<str:id>", one2one_views.challenge, name="challenge"),
    path("accept_challenge/<str:id>", one2one_views.accept_challenge, name="accept_challenge"),
    path("get_one2one/<str:id>", one2one_views.get_one2one, name="get_one2one"),
    path("get_one2one_stats/<str:id>", one2one_views.get_one2one_stats, name="get_one2one_stats"),

    path("stats", stats_views.stats, name="stats"),
    path("stats_player_ranking", stats_views.stats_player_ranking, name="stats_player_ranking"),
    path("stats_goalscores", stats_views.stats_goalscores, name="stats_goalscores"),
    path("club_stats", stats_views.club_stats, name="club_stats"), 
    path("get_last_results", stats_views.get_last_results, name="get_last_results"),



    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    

    path('notifications/', include('notifications.urls', namespace='notifications')),
    
]
