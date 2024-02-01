from .models import Starter, Round
import logging
import datetime
from . import lineup_views 
  


def round_retriever():
    lineup_views.check_for_round_data()
    round = Round.objects.filter(current=True).values("round_num").first()
    starter = Starter.objects.first()
    Starter.objects.filter(id=starter.id).update(round_num = round["round_num"])
 
     