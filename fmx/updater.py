from apscheduler.schedulers.background import BackgroundScheduler
from .run_update import update_something
from .models import MatchTick
import logging


def start():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('fmx') 
    scheduler = BackgroundScheduler()
    tick = MatchTick.objects.first()
    logger.info(f'starting FMX : {round}')
    scheduler.add_job(update_something, 'interval', minutes=tick.interval)
    scheduler.start()
    logger.info(f'lets see: {scheduler.get_jobs()[0].trigger}')