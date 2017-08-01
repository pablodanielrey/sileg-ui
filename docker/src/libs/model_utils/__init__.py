import uuid

def generateId():
    return str(uuid.uuid4())

from sqlalchemy import Column, String, DateTime, func, desc
from sqlalchemy.ext.declarative import declarative_base
from flask_jsontools import JsonSerializableBase


class MyBaseClass:

    id = Column(String, primary_key=True, default=generateId)
    creado = Column(DateTime, server_default=func.now())
    actualizado = Column(DateTime, onupdate=func.now())


    @classmethod
    def findAll(cls, s):
        return s.query(cls).all()


    @classmethod
    def render(cls, render):
        """ Redefinir clase de presentacion """

        ret = {
          "size": render["size"] if "size" in render and int(render["size"]) else None,
          "page": render["page"] if "page" in render and int(render["page"]) - 1 else 0,
          "order": render["order"] if "order" in render and render["order"] else [],
          "filters": render["filters"] if "filters" in render and render["filters"] else []
        }

        #params son filters con opcion "=="
        if "params" in render and render["params"]:
            for field, value in render["params"].items():
                ret["filters"].append({"id":field, "option":"==", "value":value})

        return ret

Base = declarative_base(cls=(JsonSerializableBase,MyBaseClass))
#Base = declarative_base(cls=(MyBaseClass,))
