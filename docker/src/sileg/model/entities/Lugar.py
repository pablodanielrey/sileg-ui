from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base

class Lugar(Base):

    __tablename__ = 'lugar'
    __table_args__ = {'schema':'sileg'}

    nombre = Column(String)
    tipo = Column(String)
    padre_id = Column(String, ForeignKey('sileg.lugar.id'))
    padre = relationship('Lugar')
    
    __mapper_args__ = {
        'polymorphic_on':tipo,
        'polymorphic_identity':'lugar'
    }



class Departamento(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'departamento'
    }    
  
 
class Catedra(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'catedra'
    }
