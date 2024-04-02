from django.apps import AppConfig
import logging
import datetime
from django.utils import timezone
 
class FmxConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fmx'
    def ready(self):
        from . import updater
        from .models import Starter, Round
        round = Round.objects.filter(current=True).values("round_num").first()
        starter = Starter.objects.first()
        now = timezone.now()
        start = timezone.now().date()
        Starter.objects.filter(id=starter.id).update(start=now,round_num = round["round_num"]) 
        updater.start()

    