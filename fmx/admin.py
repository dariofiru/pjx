from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin


from .models import Team, Player,Starter,MatchTick, Goalscores, Fixture, User,Tmp_lineup_score, User_club, Lineup, One2one, Fixture_round, Club_details,Headline, Lineup_round, Round, Table,Elo_table
# Register your models here.

class FixtureAdmin(admin.ModelAdmin):
    ordering = ('week', 'home')

admin.site.register(Team)
admin.site.register(Elo_table)
admin.site.register(One2one)
admin.site.register(Lineup_round)
admin.site.register(Round)
admin.site.register(MatchTick)
#admin.site.register(Fixture, FixtureAdmin)
admin.site.register(User)
admin.site.register(User_club)
admin.site.register(Starter)
admin.site.register(Goalscores)
admin.site.register(Club_details)
admin.site.register(Headline)

class Tmp_lineup_scoreResource(resources.ModelResource):
      class Meta:
         model = Tmp_lineup_score
class Tmp_lineup_scoreAdmin(ImportExportModelAdmin):
   resource_class = Tmp_lineup_scoreResource



class TableResource(resources.ModelResource):
      class Meta:
         model = Table
class TableAdmin(ImportExportModelAdmin):
   resource_class = TableResource

class PlayerResource(resources.ModelResource):
      class Meta:
         model = Player
class PlayerAdmin(ImportExportModelAdmin):
   resource_class = PlayerResource

class LineupResource(resources.ModelResource):
      class Meta:
         model = Lineup
class LineupAdmin(ImportExportModelAdmin):
   resource_class = LineupResource

class Fixture_roundResource(resources.ModelResource):
      class Meta:
         model = Fixture_round
class Fixture_roundAdmin(ImportExportModelAdmin):
   resource_class = Fixture_roundResource

class FixtureResource(resources.ModelResource):
      class Meta:
         model = Fixture 
class FixtureAdmin(ImportExportModelAdmin):
   resource_class = FixtureResource

admin.site.register(Tmp_lineup_score ,Tmp_lineup_scoreAdmin)
admin.site.register(Player ,PlayerAdmin)
admin.site.register(Lineup ,LineupAdmin)
admin.site.register(Fixture_round ,Fixture_roundAdmin)
admin.site.register(Fixture ,FixtureAdmin)
admin.site.register(Table, TableAdmin)


