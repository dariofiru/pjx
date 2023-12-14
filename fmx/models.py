from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

    def __str__(self) -> str:
        return f"{self.id} => {self.username}"

    def serialize(self):
        return {
            "username": self.username 
        }

class Club_details(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    club = models.TextField(blank=True)
    logo = models.TextField(blank=True)
    initial_budget =models.FloatField(default=680)

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
        return f"{self.name}: {self.appearences} -  {self.lineups} -  {self.goals} -  {self.assists} - {self.rating}"

class Fixture_round(models.Model):
    fixture = models.ForeignKey("Fixture", on_delete=models.CASCADE, related_name="fixture_ids")
    player = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="players")
    rating = models.DecimalField(max_digits=5,decimal_places=1,blank=True,null=True)
    goals = models.PositiveIntegerField(blank=True,null=True, default=0)
    conceded = models.PositiveIntegerField(blank=True,null=True, default=0)
    assists = models.PositiveIntegerField(blank=True,null=True, default=0)
    yellowcard = models.PositiveIntegerField(blank=True,null=True, default=0)
    redcard = models.PositiveIntegerField(blank=True,null=True, default=0)
    score = models.DecimalField(max_digits=5,decimal_places=1,blank=True,null=True)
   

    def __str__(self) -> str:
       return f"{self.fixture} - {self.player}: {self.rating}"


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
    
class Lineup(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users_lineup")
    club = models.ForeignKey("User_club", on_delete=models.CASCADE, related_name="club")
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

    def __str__(self) -> str:
        return f"{self.user}: {self.club} - {self.round}"
    





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

    initial_budget = models.FloatField(default=680)
    remaining_budget = models.FloatField(default=0)

    initial_account = models.FloatField(default=0)
    remaining_account = models.FloatField(default=0)

    total_won = models.PositiveIntegerField(default=0)
    total_draw = models.PositiveIntegerField(default=0)
    total_lost = models.PositiveIntegerField(default=0)
    
    current_points = models.FloatField(default=0)
 

    def __str__(self) -> str:
        return f"{self.name}"
    
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
            # "remaining_budget": self.remaining_budget,
            # "initial_account": self.initial_account,
            # "remaining_account": self.remaining_account,
            # "total_won": self.total_won,
            # "total_draw": self.total_draw,
            # "total_lost": self.total_lost,
            # "current_points": self.current_points

        }

class Headline(models.Model):
    headline =  models.TextField(blank=False)
    def __str__(self) -> str:
        return f"{self.headline}"
    
    def serialize(self):
        return {
            "headline": self.headline
        }