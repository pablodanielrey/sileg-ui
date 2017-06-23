from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base

from .Cargo import Cargo
from .Lugar import Lugar
from .Usuario import Usuario

class Designacion(Base):

    __tablename__ = 'designacion'
    __table_args__ = {'schema':'sileg'}

    usuario_id = Column(String, ForeignKey('sileg.usuario.id'))
    usuario = relationship('Usuario', back_populates='designaciones')

    cargo_id = Column(String, ForeignKey('sileg.cargo.id'))
    cargo = relationship('Cargo', back_populates='designaciones')

    lugar_id = Column(String, ForeignKey('sileg.lugar.id'))
    lugar = relationship('Lugar', back_populates='designaciones')

Usuario.designaciones = relationship('Designacion', back_populates='usuario')
Cargo.designaciones = relationship('Designacion', back_populates='cargo')
Lugar.designaciones = relationship('Designacion', back_populates='lugar')
