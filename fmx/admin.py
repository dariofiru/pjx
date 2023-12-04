from django.contrib import admin
from .models import Team, Player, Fixture, User, User_club
# Register your models here.

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Fixture)
admin.site.register(User)
admin.site.register(User_club)
