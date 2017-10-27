from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from model_utils import Base, generateId

class Lugar(Base):
    __tablename__ = 'lugar'
    __table_args__ = {'schema':'sileg'}

    nombre = Column(String)
    tipo = Column(String)

    padre_id = Column(String, ForeignKey('sileg.lugar.id'))
    hijos = relationship("Lugar",  foreign_keys=[padre_id], backref=backref('padre', remote_side="Lugar.id"))

    cambio_id = Column(String, ForeignKey('sileg.lugar.id'))
    cambios = relationship("Lugar",  foreign_keys=[cambio_id], backref=backref('cambio', remote_side="Lugar.id"))

    __mapper_args__ = {
        'polymorphic_on':tipo,
        'polymorphic_identity':'lugar'
    }

    def __init__(self, nombre):
        self.nombre = nombre

    @property
    def getNombre(self):
        return self.nombre

    @classmethod
    def find(cls, session):
        return session.query(cls)


class Catedra(Lugar):
    __tablename__ = 'catedra'
    __table_args__ = {'schema':'sileg'}

    id = Column(String, ForeignKey('sileg.lugar.id'), primary_key=True, default=generateId)
    materia_id = Column(String, ForeignKey('sileg.materia.id'))
    materia = relationship("Materia")

    @property
    def getNombre(self):
        return self.nombre + ' ' + self.materia.nombre


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
        'polymorphic_identity':'direccion'
    }

    def __init__(self, nombre):
        super().__init__(nombre)

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
