from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base

class Cargo(Base):

    __tablename__ = 'cargo'
    __table_args__ = {'schema':'sileg'}

    __mapper_args__ = {
        'polymorphic_on':nombre,
        'polymorphic_identity':'cargo'
    }

    nombre = Column(String)
    tipo = Column(String)

    """
        ejemplos de tipo
        Docente
        No Docente
    """

    """
        ejemplos de cargos
        A7
        E7
        Titular
        Adjunto
        Adscripto
        Director
        E2
        A2
        Cumple Funciones
        Beca
        Contrato de Obra
        Contrato de Servicio
        Contrato de Gestión
    """

class CumpleFunciones(Cargo):

    __mapper_args__ = {
        'polymorphic_identity':'Cumple Funciones'
    }
