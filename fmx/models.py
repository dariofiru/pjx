from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    club = models.TextField(blank=True)
    initial_budget =models.FloatField(default=680)

    def __str__(self) -> str:
        return f"{self.id} => {self.username}"

    def serialize(self):
        return {
            "username": self.username, 
            "club": self.club,
            "initial_budget" : self.initial_budget
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
    value = models.PositiveIntegerField(blank=True,null=True)

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
            "value" : self.value

        }


    def __str__(self) -> str:
       # return f"{self.team_id.name} - {self.name}: {self.position} - {self.rating}"
        return f"{self.name}: {self.appearences} -  {self.lineups} -  {self.goals} -  {self.assists} - {self.rating}"

class Fixture(models.Model):
    id = models.PositiveIntegerField(primary_key = True)
    timestamp = models.PositiveIntegerField(blank=True,null=True)
    home = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="home_team")
    away= models.ForeignKey("Team", on_delete=models.CASCADE, related_name="away_team")
    date = models.DateTimeField()
    week = models.PositiveIntegerField(blank=True,null=True)
    round = models.TextField(blank=True,null=True)

    def __str__(self) -> str:
        return f"{self.date}: {self.home} - {self.away} - {self.week}"
    
    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "week": self.week,
            "home": self.home.id,
            "away": self.away.id
        }
    


class User_club(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users")
    name =  models.TextField(blank=False)
    timestamp = models.DateTimeField()
    img = models.TextField(blank=False,null=True)
    goalkeeper_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="g1", null=True)
    goalkeeper_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="g2")
    

    defender_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d1")
    defender_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d2")
    defender_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d3")
    defender_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d4")
    defender_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="d5")

    midfielder_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m1")
    midfielder_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m2")
    midfielder_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m3")
    midfielder_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m4")
    midfielder_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="m5")

    attacker_1 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a1")
    attacker_2 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a2")
    attacker_3 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a3")
    attacker_4 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a4")
    attacker_5 =  models.ForeignKey("Player", on_delete=models.CASCADE, related_name="a5")

    initial_budget = models.FloatField(default=680)
    remaining_budget = models.FloatField(default=0)

    initial_account = models.FloatField(default=0)
    remaining_account = models.FloatField(default=0)

    total_won = models.PositiveIntegerField()
    total_draw = models.PositiveIntegerField()
    total_lost = models.PositiveIntegerField()
    
    current_points = models.FloatField(default=0)
 

    def __str__(self) -> str:
        return f"{self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.id,
            "name": self.name,
            "defender_1": self.defender_1,
            "defender_2": self.defender_2,
            "defender_3": self.defender_3,
            "defender_4": self.defender_4,
            "defender_5": self.defender_5,
            "midfielder_1": self.midfielder_1,
            "midfielder_2": self.midfielder_2,
            "midfielder_3": self.midfielder_3,
            "midfielder_4": self.midfielder_4,
            "midfielder_5": self.midfielder_5,
            "attacker_1": self.attacker_1,
            "attacker_2": self.attacker_2,
            "attacker_3": self.attacker_3,
            "attacker_4": self.attacker_4,
            "attacker_5": self.attacker_5,
            "initial_budget": self.initial_budget,
            "remaining_budget": self.remaining_budget,
            "initial_account": self.initial_account,
            "remaining_account": self.remaining_account,
            "total_won": self.total_won,
            "total_draw": self.total_draw,
            "total_lost": self.total_lost,
            "current_points": self.current_points

        }