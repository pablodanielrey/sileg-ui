
import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import psycopg2

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sileg.model.entities import Departamento, Catedra, Materia, LugarDictado



engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=True)




"""
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model import SilegModel
from sileg.model.entities import Usuario, Designacion, Cargo, Lugar
"""

if __name__ == '__main__':

    """conexion con la base antigua del sileg """
    Session = sessionmaker(bind=engine)
    session = Session();

    host = os.environ['SILEG_OLD_DB_HOST']
    dbname = os.environ['SILEG_OLD_DB_NAME']
    user = os.environ['SILEG_OLD_DB_USER']
    password = os.environ['SILEG_OLD_DB_PASSWORD']
    conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        try:
            cur.execute('''
                SELECT desig_id, desig_observaciones, desig_fecha_desde, desig_fecha_hasta, desig_fecha_baja,
                resolucion_alta.resolucion_numero AS resolucion_alta_numero,  resolucion_alta.resolucion_expediente AS resolucion_alta_expediente,
                resolucion_baja.resolucion_numero AS resolucion_baja_numero,  resolucion_baja.resolucion_expediente AS resolucion_baja_expediente,
                tipocargo_nombre, tipodedicacion_nombre, tipocaracter_nombre,
                pers_nombres, pers_apellidos, pers_nrodoc,
                materia_nombre, catedra_nombre,
                dpto_nombre
                FROM designacion_docente
                INNER JOIN tipo_cargo AS tc ON (desig_tipocargo_id = tipocargo_id)
                INNER JOIN tipo_dedicacion AS td ON (desig_tipodedicacion_id = tipodedicacion_id)
                INNER JOIN tipo_caracter AS tca ON (desig_tipocaracter_id = tipocaracter_id)
                INNER JOIN empleado ON (designacion_docente.desig_empleado_id = empleado.empleado_id)
                INNER JOIN persona ON (empleado.empleado_pers_id = persona.pers_id)
                INNER JOIN catedras_x_materia ON (designacion_docente.desig_catxmat_id = catedras_x_materia.catxmat_id)
                INNER JOIN materia ON (catedras_x_materia.catxmat_materia_id = materia.materia_id)
                INNER JOIN catedra ON (catedras_x_materia.catxmat_catedra_id = catedra.catedra_id)
                INNER JOIN departamento ON (materia.materia_dpto_id = departamento.dpto_id)
                LEFT JOIN resolucion AS resolucion_alta ON (resolucion_alta.resolucion_id = desig_resolucionalta_id)
                LEFT JOIN resolucion AS resolucion_baja ON (resolucion_baja.resolucion_id = desig_resolucionbaja_id);
            ''');
            
            


            for d in cur:
          
          

                
                
                
                mat_ = d["materia_nombre"].split("C.U.")
                dep = d['dpto_nombre'].strip()
                cat = d['catedra_nombre'].strip()

                mat = None
                lugDic = None
                if len(mat_) > 1:
                    mat = mat_[0].replace('-','').strip()
                    lugDic = mat_[1].strip()
                           
                    #agregar materia                                      
                    materia = session.query(Materia).filter_by(nombre=mat).first()
                    if not materia:
                        materia = Materia(nombre=mat)                      
                        session.add(materia)
                        session.commit()
                      
                    #agregar catedra
                    catedra = session.query(Catedra).filter_by(nombre=cat, materia_id=materia.id).first()
                    if not catedra:
                        catedra = Catedra(nombre=cat, materia_id=materia.id)
                        session.add(catedra)
                        session.commit()
                    
                    lugarDictado = session.query(LugarDictado).filter_by(nombre=lugDic, padre_id=catedra.id).first()
                    if not lugarDictado:
                        lugarDictado = LugarDictado(nombre=lugDic, padre_id=catedra.id)
                        session.add(lugarDictado)
                        session.commit()
                        
                                            
                 
                else:                                
                    mat = mat_[0].strip()
                    
                    #agregar departamento                                      
                    departamento = session.query(Departamento).filter_by(nombre=mat).first()
                    if not departamento:
                        departamento = Departamento(nombre=mat)                      
                        session.add(departamento)
                        session.commit()
                        
                    #agregar materia                                      
                    materia = session.query(Materia).filter_by(nombre=mat).first()
                    if not materia:
                        materia = Materia(nombre=mat)                      
                        session.add(materia)
                        session.commit()
                    
                    #agregar catedra
                    catedra = session.query(Catedra).filter_by(nombre=cat, materia_id=materia.id).first()
                    if not catedra:
                        catedra = Catedra(nombre=cat, materia_id=materia.id, padre_id=departamento.id)
                        session.add(catedra)
                        session.commit()
                        
                        
                        

                """

                designacion = session.query(Designacion).filter_by(desde=d["desig_fecha_desde"], hasta=d["desig_fecha_hasta"], resolucion=d["resolucion_alta_numero"], expediente=d["resolucion_alta_expediente"], persona_id=).first()



           


        finally:
            cur.close()            
    finally:
        conn.close()
