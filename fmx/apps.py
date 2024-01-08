from django.apps import AppConfig
import logging
import datetime
 
class FmxConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fmx'
    def ready(self):
        from . import updater
        from .models import Starter, Round
        round = Round.objects.filter(current=True).values("round_num").first()
        starter = Starter.objects.first()
        Starter.objects.filter(id=starter.id).update(start=datetime.datetime.now(),round_num = round["round_num"]) 
        updater.start()

    # def ready(self):
    #     from .models import Starter, Round
    #     logging.basicConfig(level=logging.INFO)
    #     logger = logging.getLogger('fmx')
    #     round = Round.objects.filter(current=True).values("round_num").first()
    #     starter = Starter.objects.first()
    #     Starter.objects.filter(id=starter.id).update(start=datetime.datetime.now(),round_num = round["round_num"]) 
    #     to_load = Starter.objects.first()
    #     logger.info(f'to_load:  {to_load} ')
        # Here should go the file loading code

# from django.apps import AppConfig
# from .models import KnowledgeBase

# class Pqawv1Config(AppConfig):
#     name = 'pqawV1'

#     def ready(self):
#         to_load = KnowledgeBase.objects.order_by('-timestamp').first()
#         # Here should go the file loading code