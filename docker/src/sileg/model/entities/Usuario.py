from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base

import json
import requests

class Usuario(Base):

    __tablename__ = 'usuario'
    __table_args__ = {'schema':'sileg'}

    def resolveUser(self):
        ''' se hace la llamada rest a la api de usuarios '''
        data = requests.get('http://usuarios.econo.unlp.edu.ar/api/v1.0/users/{}'.format(self.id)).json()
        self.__dict__ = json.loads(data)
