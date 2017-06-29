from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from flask_jsontools import JsonSerializableBase

class User:

    id = Column(String, primary_key=True)
    dni = Column(String, server_default=func.now())







