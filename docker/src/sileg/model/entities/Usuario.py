from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base



class Usuario(Base):

    __tablename__ = 'usuario'
    __table_args__ = {'schema':'sileg'}
