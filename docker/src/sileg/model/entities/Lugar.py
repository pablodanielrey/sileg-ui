from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base, generateId

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


class Catedra(Lugar):
    __tablename__ = 'catedra'
    __table_args__ = {'schema':'sileg'}

    id = Column(String, ForeignKey('sileg.lugar.id'), primary_key=True, default=generateId)
    materia_id = Column(String)

    __mapper_args__ = {
        'polymorphic_identity':'catedra'
    }


class LugarDictado(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'lugar dictado'
    }


class Centro(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'centro'
    }


class Comision(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'comision'
    }




class Departamento(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'departamento'
    }

class Direccion(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'departamento'
    }

class Escuela(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'escuela'
    }


class Externo(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'externo'
    }


class Facultad(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'facultad'
    }

class Instituto(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'instituto'
    }

class Maestria(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'maestria'
    }


class Prosecretaria(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'prosecretaria'
    }

class Secretaria(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'secretaria'
    }

class Seminario(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'seminario'
    }

class Universidad(Lugar):
    __mapper_args__ = {
        'polymorphic_identity':'universidad'
    }
