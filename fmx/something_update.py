from .models import Starter, Round
import logging
import datetime
from . import lineup_views 
    #     logging.basicConfig(level=logging.INFO)
    #     logger = logging.getLogger('fmx')
    #     round = Round.objects.filter(current=True).values("round_num").first()
    #     starter = Starter.objects.first()
    #     Starter.objects.filter(id=starter.id).update(start=datetime.datetime.now(),round_num = round["round_num"]) 
    #     to_load = Starter.objects.first()
    #     logger.info(f'to_load:  {to_load} ')


def update_something():
    lineup_views.check_for_round_data()
    round = Round.objects.filter(current=True).values("round_num").first()
    starter = Starter.objects.first()
    Starter.objects.filter(id=starter.id).update(round_num = round["round_num"])

    print(f"this function runs every 2 minutes {starter.round_num} - {datetime.datetime.now()}")