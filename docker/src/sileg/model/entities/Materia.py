from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base

class Materia(Base):

    __tablename__ = 'materia'
    __table_args__ = {'schema':'sileg'}

    nombre = Column(String)
    padre_id = Column(String, ForeignKey('sileg.lugar.id'))
    padre = relationship('Lugar')
