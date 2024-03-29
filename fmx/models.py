from django.contrib.auth.models import AbstractUser
from django.db import models 
import logging

# Create your models here.
class User(AbstractUser):
    pass

    def __str__(self) -> str:
        return f" {self.username}"

    def serialize(self):
        return {
            "username": self.username 
        }

class Club_details(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    club = models.TextField(blank=True)
    logo = models.TextField(blank=True)
    initial_budget =models.FloatField(default=800)
    elo = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True, default=1000)
    has_squad=models.BooleanField(default=False)
    has_lineup=models.BooleanField(default=False)
    def __str__(self) -> str:
        return f"{self.user}: {self.club}  "

    def serialize(self):
        return {
            "logo": self.logo 
        }

class Starter(models.Model):
    start =  models.DateTimeField(auto_now_add=True)
    round_num = models.PositiveIntegerField(blank=True,null=True)
    #table_round = models.PositiveIntegerField(blank=True,null=True)
    def __str__(self) -> str:
        return f"start: {self.start} -  {self.round_num}  "

    def serialize(self):
        return {
            "start": self.start
        }
    
class Team(models.Model):
    id = models.PositiveIntegerField(primary_key = True)
    name = models.TextField(blank=False)
    code = models.TextField(blank=False)
    logo= models.TextField(blank=False)
    active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.id}: {self.name} - {self.active}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "logo": self.logo
        }

class Player(models.Model):
    id = models.PositiveIntegerField(primary_key = True)
    team_id = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="team")
    name = models.TextField(blank=False)
    age = models.PositiveIntegerField(blank=True,null=True)
    nationality = models.TextField(blank=False)
    #number = models.PositiveIntegerField(blank=True,null=True)
    position = models.TextField(blank=False,null=True)
    photo = models.TextField(blank=False,null=True)
    appearences =  models.PositiveIntegerField(blank=True,null=True)
    lineups = models.PositiveIntegerField(blank=True,null=True)
    goals = models.PositiveIntegerField(blank=True,null=True)
    conceded = models.PositiveIntegerField(blank=True,null=True)
    assists = models.PositiveIntegerField(blank=True,null=True)
    rating = models.FloatField(default=6.0)
    value = models.DecimalField(max_digits=5,decimal_places=1,blank=True,null=True)
    current_value = models.DecimalField(max_digits=5,decimal_places=1,blank=True,null=True)
    yellowcard = models.PositiveIntegerField(blank=True,null=True)
    redcard = models.PositiveIntegerField(blank=True,null=True)
    penaltywon = models.PositiveIntegerField(blank=True,null=True)
    minutes = models.PositiveIntegerField(blank=True,null=True)
    teamlogo = models.TextField(blank=False,null=True)
    height = models.TextField(blank=False,null=True)
    weight = models.TextField(blank=False,null=True)

    def serialize(self):
        return {
            "id": self.id,
            "team_id": self.team_id.id,
            "name": self.name,
            "age": self.age,
            #"number": self.number,
            "nationality": self.nationality,
            "photo": self.photo,
            "position": self.position ,
            "appearences": self.appearences,
            "lineups": self.lineups,
            "goals": self.goals,
            "conceded" : self.conceded,
            "assists" : self.assists,
            "rating" : self.rating,
            "value" : self.value,
            "yellowcard": self.yellowcard,
            "redcard" : self.redcard,
            "penaltywon" : self.penaltywon,
            "minutes": self.minutes,
            "teamlogo" : self.teamlogo,
            "height": self.height,
            "weight" : self.weight 

        }


    def __str__(self) -> str:
       # return f"{self.team_id.name} - {self.name}: {self.position} - {self.rating}"
        return f" {self.name} "

class Fixture_round(models.Model):
    fixture = models.ForeignKey("Fixture", on_delete=models.CASCADE, related_name="fixture_ids")
    player = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="players")
    rating = models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    goals = models.PositiveIntegerField(blank=True,null=True, default=0)
    conceded = models.PositiveIntegerField(blank=True,null=True, default=0)
    assists = models.PositiveIntegerField(blank=True,null=True, default=0)
    yellowcard = models.PositiveIntegerField(blank=True,null=True, default=0)
    redcard = models.PositiveIntegerField(blank=True,null=True, default=0)
    score = models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
   
    def __str__(self) -> str:
       return f"{self.fixture} - {self.player}: G: {self.goals} C: {self.conceded} - R: {self.redcard} - Y: {self.yellowcard}"
    def serialize(self):
        return {
            "fixture": self.fixture.id,
            "player": self.player.name,
            "rating": self.rating,
            "goals": self.goals,
            "assists": self.assists,
            "score": self.score
        }
    
    class Meta:
        unique_together = ('fixture', 'player')

class Fixture(models.Model):
    id = models.PositiveIntegerField(primary_key = True)
    timestamp = models.PositiveIntegerField(blank=True,null=True)
    home = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="home_team")
    away= models.ForeignKey("Team", on_delete=models.CASCADE, related_name="away_team")
    date = models.DateTimeField()
    week = models.PositiveIntegerField(blank=True,null=True)
    round = models.TextField(blank=True,null=True)
    round_num = models.PositiveIntegerField(blank=True,null=True)

    def __str__(self) -> str:
        return f"{self.round}: {self.home.name} - {self.away.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "week": self.week,
            "home": self.home.id,
            "away": self.away.id,
            "round_num": self.round_num
        }
    
class Tmp_lineup_score(models.Model):   
    match = models.PositiveIntegerField(blank=True,null=True, default=0)
    round_id=  models.PositiveIntegerField(blank=True,null=True, default=0)
    lineup = models.ForeignKey("Lineup", on_delete=models.CASCADE, related_name="lineup_score")
    club = models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="club_sc")
    player = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p", null=True)
    score=models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    goals = models.PositiveIntegerField(blank=True,null=True, default=0)
    assists = models.PositiveIntegerField(blank=True,null=True, default=0)
    yellow = models.PositiveIntegerField(blank=True,null=True, default=0)
    red = models.PositiveIntegerField(blank=True,null=True, default=0)
    type = models.CharField(
        max_length=12,
        choices=(
            ("one2one", "one2one"),
            ("table", "table") 
        )
    )
    def __str__(self) -> str:
        return f"{self.match}:{self.type}  {self.player} - {self.score}"
     
    def serialize(self):
        return {
            "club": self.club.id,
            "lineup": self.lineup.id,
            "player": self.player.id,
            "name": self.player.name,
            "score": self.score,
            "goals": self.goals,
            "assists": self.assists,
            "yellow": self.yellow,
            "red": self.red
        }
    
class Lineup(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users_lineup")
    club = models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="club")
    formation =models.TextField(default="442")
    player_1 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p1", null=True)
    player_2 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p2", null=True)
    player_3 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p3", null=True)
    player_4 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p4", null=True)
    player_5 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p5", null=True)
    player_6 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p6", null=True)
    player_7 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p7", null=True)
    player_8 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p8", null=True)
    player_9 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p9", null=True)
    player_10 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p10", null=True)
    player_11 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p11", null=True)
    round = models.TextField(blank=True,null=True)
    score=models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    active=models.BooleanField(default=True)
    ai =models.BooleanField(default=False)

    @property
    def list_lineup(self):
        lineup_list=[]
        lineup_list.append(self.player_1.id)
        lineup_list.append(self.player_2.id)
        lineup_list.append(self.player_3.id)
        lineup_list.append(self.player_4.id)
        lineup_list.append(self.player_5.id)
        lineup_list.append(self.player_6.id)
        lineup_list.append(self.player_7.id)
        lineup_list.append(self.player_8.id)
        lineup_list.append(self.player_9.id)
        lineup_list.append(self.player_11.id) 
        return lineup_list

    def __str__(self) -> str:
        return f" {self.id}: {self.active}- {self.user.username}"
    
    def serialize(self):
        return {
            "id": self.id,
            "formation": self.formation,
            "player_1": self.player_1.name,
            "player_2": self.player_2.name,
            "player_3": self.player_3.name,
            "player_4": self.player_4.name,
            "player_5": self.player_5.name,
            "player_6": self.player_6.name,
            "player_7": self.player_7.name,
            "player_8": self.player_8.name,
            "player_9": self.player_9.name,
            "player_10": self.player_10.name,
            "player_11": self.player_11.name,
            "player_1_id": self.player_1.id,
            "player_2_id": self.player_2.id,
            "player_3_id": self.player_3.id,
            "player_4_id": self.player_4.id,
            "player_5_id": self.player_5.id,
            "player_6_id": self.player_6.id,
            "player_7_id": self.player_7.id,
            "player_8_id": self.player_8.id,
            "player_9_id": self.player_9.id,
            "player_10_id": self.player_10.id,
            "player_11_id": self.player_11.id
        }

class Goalscores(models.Model):
    player = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="goalscorer", null=True)
    goals =  models.PositiveIntegerField(blank=False,null=False)

    def __str__(self) -> str:
        return f"{self.player} - {self.goals}"

    def serialize(self):
        return {
            "player": self.player.name,
            "goals": self.goals 
        }
 

class Table(models.Model):
    squad_1=models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="User_club1",blank=True,null=True)
    squad_2=models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="User_club2",blank=True,null=True)
    lineup_1=models.ForeignKey("Lineup", on_delete=models.CASCADE, related_name="lineup_table1")
    lineup_2=models.ForeignKey("Lineup", on_delete=models.CASCADE, related_name="lineup_table2")
    score_1=models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    score_2=models.DecimalField(max_digits=5,decimal_places=2   ,blank=True,null=True)
    round_num = models.PositiveIntegerField(blank=False,null=False)
    round_id = models.PositiveIntegerField(blank=False,null=False)
    next_round = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.id} - {self.round_num} {self.next_round}:  {self.squad_1} vs {self.squad_2}"

    def serialize(self):
        return {
            "id": self.id,
            "round_num": self.round_num,
            "lineup_1": self.lineup_1.id,
            "lineup_2": self.lineup_2.id,
            "club_1_id": self.lineup_1.club.id,
            "club_2_id": self.lineup_2.club.id,
            "lineup_1_name": self.lineup_1.club.name,
            "lineup_2_name": self.lineup_2.club.name,
            "lineup_1_username": self.lineup_1.user.username,
            "lineup_2_username": self.lineup_2.user.username,
            "score_1": self.score_1,
            "score_2": self.score_2
        }
    class Meta:
        unique_together = ('lineup_1', 'lineup_2', 'round_num')

class Round(models.Model):
    round_num = models.PositiveIntegerField(blank=False,null=False)
    next=models.BooleanField(default=False)
    current=models.BooleanField(default=False)
    def __str__(self) -> str:
        return f"{self.round_num}:{self.current}  {self.next}"

class User_club(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users")
    name =  models.TextField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    img = models.TextField(blank=False,null=True)
    goalkeeper_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="g1", null=True)
    goalkeeper_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="g2", null=True)
    

    defender_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d1", null=True)
    defender_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d2", null=True)
    defender_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d3", null=True)
    defender_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d4", null=True)
    defender_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d5", null=True)

    midfielder_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m1", null=True)
    midfielder_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m2", null=True)
    midfielder_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m3", null=True)
    midfielder_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m4", null=True)
    midfielder_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m5", null=True)

    attacker_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a1", null=True)
    attacker_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a2", null=True)
    attacker_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a3", null=True)
    attacker_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a4", null=True)
    attacker_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a5", null=True)
    goalkeeper_1_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    goalkeeper_2_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    defender_1_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    defender_2_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    defender_3_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    defender_4_price = models.DecimalField(max_digits=5,decimal_places=1,  default=0.0)
    defender_5_price = models.DecimalField(max_digits=5,decimal_places=1,  default=0.0)
    midfielder_1_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    midfielder_2_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    midfielder_3_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    midfielder_4_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    midfielder_5_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    attacker_1_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    attacker_2_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    attacker_3_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    attacker_4_price = models.DecimalField(max_digits=5,decimal_places=1, default=0.0)
    initial_budget = models.FloatField(default=800)
    remaining_budget = models.FloatField(default=0)

    initial_account = models.FloatField(default=0)
    remaining_account = models.FloatField(default=0)

    total_won = models.PositiveIntegerField(default=0)
    total_draw = models.PositiveIntegerField(default=0)
    total_lost = models.PositiveIntegerField(default=0)
    
    current_points = models.FloatField(default=0)
    
    @property
    def list_players_club(self):
        player_list=[]
        player_list.append(self.goalkeeper_1.id)
        player_list.append(self.goalkeeper_2.id)
        player_list.append(self.defender_1.id)
        player_list.append(self.defender_2.id)
        player_list.append(self.defender_3.id)
        player_list.append(self.defender_4.id)
        player_list.append(self.defender_5.id)
        player_list.append(self.midfielder_1.id)
        player_list.append(self.midfielder_2.id)
        player_list.append(self.midfielder_3.id)
        player_list.append(self.midfielder_4.id)
        player_list.append(self.midfielder_5.id)
        player_list.append(self.attacker_1.id)
        player_list.append(self.attacker_2.id)
        player_list.append(self.attacker_3.id)
        player_list.append(self.attacker_4.id)
        return player_list

    def __str__(self) -> str:
        return f"{self.user}: {self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.id,
            "name": self.name,
            "goalkeeper_1": self.goalkeeper_1.id,
            "goalkeeper_2": self.goalkeeper_2.id,           
            "defender_1": self.defender_1.id,
            "defender_2": self.defender_2.id,
            "defender_3": self.defender_3.id,
            "defender_4": self.defender_4.id,
            "defender_5": self.defender_5.id,
            "midfielder_1": self.midfielder_1.id,
            "midfielder_2": self.midfielder_2.id,
            "midfielder_3": self.midfielder_3.id,
            "midfielder_4": self.midfielder_4.id,
            "midfielder_5": self.midfielder_5.id,
            "attacker_1": self.attacker_1.id,
            "attacker_2": self.attacker_2.id,
            "attacker_3": self.attacker_3.id,
            "attacker_4": self.attacker_4.id#,
            # "initial_budget": self.initial_budget,
            #"remaining_budget": self.remaining_budget
            # "initial_account": self.initial_account,
            # "remaining_account": self.remaining_account,
            # "total_won": self.total_won,
            # "total_draw": self.total_draw,
            # "total_lost": self.total_lost,
            # "current_points": self.current_points

        }

class Headline(models.Model):
    headline =  models.TextField(blank=False)
    type =  models.TextField(default="buy", blank=False, null=False)

    def __str__(self) -> str:
        return f"{self.type}: {self.headline}"
    
    def serialize(self):
        return {
            "headline": self.headline
        }
    
class Elo_table(models.Model):
    difference = models.PositiveIntegerField(blank=True,null=True)
    probability = models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    def __str__(self) -> str:
        return f"{self.difference} - {self.probability} "
    
class One2one(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    squad_1=models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="User_club11")
    squad_2=models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="User_club21")
    lineup_1=models.ForeignKey("Lineup", on_delete=models.CASCADE, related_name="lineup_table11",blank=True,null=True)
    lineup_2=models.ForeignKey("Lineup", on_delete=models.CASCADE, related_name="lineup_table21",blank=True,null=True)
    score_1=models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    score_2=models.DecimalField(max_digits=5,decimal_places=2,blank=True,null=True)
    round_num = models.PositiveIntegerField(blank=True,null=True)
    bet = models.DecimalField(max_digits=5,decimal_places=1,blank=True,null=True)
    status = models.CharField(
        max_length=12,
        choices=(
            ("pending", "Pending"),
            ("refused", "Refused"),
            ("accepted", "Accepted") 
        )
    )
    def __str__(self) -> str:
        return f"{self.id}-{self.round_num}:  {self.squad_1} vs {self.squad_2} - {self.status}"

    def serialize(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "round_num": self.round_num,
            "lineup_1": self.lineup_1.id,
            "lineup_2": self.lineup_2.id,
            "club_1_id": self.lineup_1.club.id,
            "club_2_id": self.lineup_2.club.id,
            "lineup_1_name": self.lineup_1.club.name,
            "lineup_2_name": self.lineup_2.club.name,
            "lineup_1_username": self.lineup_1.user.username,
            "lineup_2_username": self.lineup_2.user.username,
            "score_1": self.score_1,
            "score_2": self.score_2,
            "bet": self.bet
        }
    
class MatchTick(models.Model):
    interval = models.PositiveIntegerField(default=2)

    def __str__(self) -> str:
        return f"{self.interval} "   
 