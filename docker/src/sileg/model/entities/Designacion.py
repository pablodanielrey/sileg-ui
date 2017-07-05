from sqlalchemy import Column, String, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from model_utils import Base


from .Cargo import Cargo
from .Lugar import Lugar
from .Usuario import Usuario

categoria_designacion_table = Table('categoria_designacion', Base.metadata,
    Column('designacion_id', String, ForeignKey('sileg.designacion.id')),
    Column('categoria_id', String, ForeignKey('sileg.categoria.id')),
    schema='sileg'
)

class Designacion(Base):

    __tablename__ = 'designacion'
    __table_args__ = {'schema':'sileg'}

    desde = Column(Date)
    hasta = Column(Date)

    expediente = Column(String)
    resolucion = Column(String)

    tipo = Column(String)
    categorias = relationship('Categoria', secondary=categoria_designacion_table, back_populates='designaciones')

    designacion_id = Column(String, ForeignKey('sileg.designacion.id'))
    designacion = relationship('Designacion')
    #designacion = relationship('Designacion', back_populates='designaciones')

    #designaciones = relationship('Designacion', back_populates='designacion')

    usuario_id = Column(String, ForeignKey('sileg.usuario.id'))
    usuario = relationship('Usuario', back_populates='designaciones')

    cargo_id = Column(String, ForeignKey('sileg.cargo.id'))
    cargo = relationship('Cargo', back_populates='designaciones')

    lugar_id = Column(String, ForeignKey('sileg.lugar.id'))
    lugar = relationship('Lugar', back_populates='designaciones')

    _mapper_args__ = {
        'polymorphic_on':tipo,
        'polymorphic_identity':'designacion'
    }




    def estado_actual(self, s):
        ultima = self
        for d in self.designaciones:
            if ultima.creado <= d.creado:
                ultima = d
        return ultima


Usuario.designaciones = relationship('Designacion', back_populates='usuario')
Cargo.designaciones = relationship('Designacion', back_populates='cargo')
Lugar.designaciones = relationship('Designacion', back_populates='lugar')


class BajaDesignacion(Designacion):
    __mapper_args__ = {
        'polymorphic_identity':'baja'
    }






class Categoria(Base):

    __tablename__ = 'categoria'
    __table_args__ = {'schema':'sileg'}

    nombre = Column(String, unique=True)

    designaciones = relationship('Designacion', secondary=categoria_designacion_table, back_populates='categorias')
