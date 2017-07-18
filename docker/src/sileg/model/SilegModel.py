import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model.entities import *

from sileg.model.UsuariosModel import UsuariosModel

engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=True)


Session = sessionmaker(bind=engine)



class SilegModel:

    @classmethod
    def designaciones(cls, render):
        """ consulta de designaciones con sus respectivas relaciones utilizando filtros opcionales """
        
        s = Session()        
        query = s.query(Designacion)
        
        size = render["size"] if render["size"] else None
        if size:
           page = render["page"] if render["page"] else 1

           query = query.limit(size)
           query = query.offset((page-1) * size) 
        
        designaciones = query.all()
        idsUsuarios = [d.usuario.id for d in designaciones]           
        usuarios_ = UsuariosModel.usuariosByIds(idsUsuarios)

        usuarios = {}
        for u in usuarios_:
          usuarios[u["id"]] = u
          
          
        

        response = []
        for d in designaciones:
          print(d.lugar.tipo)
          if d.lugar.padre_id:
            print(d.lugar.padre.nombre)
          u = usuarios[d.usuario.id]
          r = {
            "usuario":{"id":u["id"], "nombres":u["name"], "apellidos":u["lastname"], "numero_documento":u["dni"]},            
            "lugar":{"id":d.lugar.id, "nombre":d.lugar.nombre},
            "cargo":{"id":d.cargo.id, "nombre":d.cargo.nombre},
            "desde":d.desde,
            "hasta":d.hasta,
            "historico":d.historico,
            "expediente":d.expediente,
            "resolucion":d.resolucion
          }
          response.append(r)
            
        return response
                    


