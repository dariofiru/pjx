from django.contrib import admin
from .models import Team, Player, Fixture, User, User_club
# Register your models here.

class FixtureAdmin(admin.ModelAdmin):
    ordering = ('week', 'home')

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Fixture, FixtureAdmin)
admin.site.register(User)
admin.site.register(User_club)
