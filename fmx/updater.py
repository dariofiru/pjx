from apscheduler.schedulers.background import BackgroundScheduler
from .run_update import round_retriever
from .models import MatchTick
import logging


def start():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx') 
    scheduler = BackgroundScheduler()
    tick = MatchTick.objects.first()
    logger.info(f'starting FMX : {round}')
    #scheduler.add_job(round_retriever, 'interval', minutes=tick.interval, seconds=45)
    scheduler.add_job(round_retriever, 'interval', minutes=1)
    #scheduler.start()
     