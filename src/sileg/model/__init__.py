import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=True)
Session = sessionmaker(bind=engine)



from .SilegModel import SilegModel

__all__ = [
    'SilegModel'
]
