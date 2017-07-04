
import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import psycopg2
import psycopg2.extras

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sileg.model.entities import Cargo, Catedra, Departamento, LugarDictado, Materia, Usuario, Designacion, Secretaria, Instituto, Maestria, Prosecretaria, Escuela, Lugar, Direccion, Centro


engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=False)

Session = sessionmaker(bind=engine)
session = Session();








def designacionesDocentes():
    """ conexion con la base antigua del sileg para obtener las designaciones docentes """
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
                LEFT JOIN resolucion AS resolucion_baja ON (resolucion_baja.resolucion_id = desig_resolucionbaja_id)
            ''');

            return cur.fetchall()
        finally:
          cur.close()

    finally:
        conn.close()










def designacionesLugares():
    """ conexion con la base antigua del sileg para obtener las designaciones a un lugar de trabajo """
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
                tipocargo_nombre, tipodedicacion_nombre, tipocaracter_nombre, pers_nombres, pers_apellidos, pers_nrodoc, lugdetrab_nombre, area_nombre, funcion_nombre
                FROM designacion_docente
                INNER JOIN tipo_cargo AS tc ON (desig_tipocargo_id = tipocargo_id)
                INNER JOIN tipo_dedicacion AS td ON (desig_tipodedicacion_id = tipodedicacion_id)
                INNER JOIN tipo_caracter AS tca ON (desig_tipocaracter_id = tipocaracter_id)
                INNER JOIN empleado ON (designacion_docente.desig_empleado_id = empleado.empleado_id)
                INNER JOIN persona ON (empleado.empleado_pers_id = persona.pers_id)
                INNER JOIN lugar_de_trabajo ON (designacion_docente.desig_lugdetrab_id = lugar_de_trabajo.lugdetrab_id)
                LEFT JOIN area ON (lugar_de_trabajo.lugdetrab_area_id = area.area_id)
                LEFT JOIN funcion ON (designacion_docente.desig_funcion_id = funcion.funcion_id)
                LEFT JOIN resolucion AS resolucion_alta ON (resolucion_alta.resolucion_id = desig_resolucionalta_id)
                LEFT JOIN resolucion AS resolucion_baja ON (resolucion_baja.resolucion_id = desig_resolucionbaja_id)
            ''');

            return cur.fetchall()
        finally:
          cur.close()

    finally:
        conn.close()
        
        
        
        
        










def users():
    host = os.environ['SILEG_DB_HOST']
    dbname = os.environ['SILEG_DB_NAME']
    user = os.environ['SILEG_DB_USER']
    password = os.environ['SILEG_DB_PASSWORD']
    conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        try:
            cur.execute('''
                SELECT id, dni FROM profile.users
            ''');

            users = {}
            for u in cur:
                users[u["dni"]] = u["id"]

            return users
        finally:
          cur.close()
    finally:
        conn.close()







def setUsuario(d, users, usuarios_faltantes):
    """
        carga el usuario dentro de las tablas internas del sistema chequeando con el sistema de perfiles de usuario principal.

        consulta para verificar:

         select u.dni, u.name, u.lastname, m.email
            from sileg.usuario s
            left join profile.users u on (s.id = u.id)
            left join profile.mails m on (u.id = m.user_id);
    """

    dni = str(d['pers_nrodoc'])
    if dni not in users:
        usuarios_faltantes.append(dni)
        return None

    userId = users[dni]

    usuario = session.query(Usuario).filter_by(id=userId).first()
    if not usuario:
        usuario = Usuario(id=userId)
        session.add(usuario)
    return usuario







def setLugarDocente(d):
    """
    Define lugar a partir de las designaciones docentes
    """
    
    mat_ = d["materia_nombre"].split("C.U.")
    dep = d['dpto_nombre'].strip().lower()
    cat = d['catedra_nombre'].strip().lower()
    

    mat = None
    lugDic = None
    if len(mat_) > 1:
        """
            la designación del sileg tiene en
                depto_nombre = centro regional  (se descarta porque el centro regional ---> lugar dictado = esa info sale del nombre materia)
                catedra_nombre --> Catedra
                materia_nombre --> Materia y lugarDictado
                Departamento no se puede obtener de ningun lado de la designacion. esa info no existe

                forma de verificar los datos en la base
                select m.id, m.nombre, l.id, l.nombre, ld.id, ld.nombre from sileg.catedra c left join sileg.lugar l on (l.id = c.id) left join sileg.materia m on (c.materia_id = m.id) left join sileg.lugar ld on (ld.padre_id = c.id);
        """

        mat = mat_[0].replace('-','').strip().lower()
        lugDic = mat_[1].strip().lower()

        #agregar materia
        materia = session.query(Materia).filter_by(nombre=mat).first()
        if not materia:
            materia = Materia(nombre=mat)
            session.add(materia)

        #agregar catedra
        catedra = session.query(Catedra).filter_by(nombre=cat, materia_id=materia.id).first()
        if not catedra:
            catedra = Catedra(nombre=cat, materia_id=materia.id)
            session.add(catedra)

        lugarDictado = session.query(LugarDictado).filter_by(nombre=lugDic, padre_id=catedra.id).first()
        if not lugarDictado:
            lugarDictado = LugarDictado(nombre=lugDic, padre_id=catedra.id)
            session.add(lugarDictado)

        return lugarDictado

    else:
        """
            la designación del sileg tiene en
                depto_nombre --> Departamento
                catedra_nombre --> Catedra
                materia_nombre --> Materia


                forma de verificar

                select ld.id, ld.nombre, m.id, m.nombre, c.id, l.nombre
                    from sileg.catedra c left join sileg.lugar l on (c.id = l.id)
                    left join sileg.materia m on (m.id = c.materia_id)
                    left join sileg.lugar ld on (ld.id = l.padre_id)

        """
        mat = mat_[0].strip().lower()

        #agregar departamento
        departamento = session.query(Departamento).filter_by(nombre=dep).first()
        if not departamento:
            departamento = Departamento(nombre=dep)
            session.add(departamento)

        #agregar materia
        materia = session.query(Materia).filter_by(nombre=mat).first()
        if not materia:
            materia = Materia(nombre=mat)
            session.add(materia)

        #agregar catedra
        catedra = session.query(Catedra).filter_by(nombre=cat, materia_id=materia.id).first()
        if not catedra:
            catedra = Catedra(nombre=cat, materia_id=materia.id, padre_id=departamento.id)
            session.add(catedra)

        return catedra





def setLugarTrabajo(d):
    """
    Define lugar a partir de las designaciones a lugar de trabajo
    """

    lug = d["lugdetrab_nombre"].strip().lower()
    area = d['area_nombre'].strip().lower()
    #func = d['funcion_nombre'].strip().lower()

    lugar = None

    if area == "secretaria" or area == "secretaría":
        if area not in lug:
            lug = "secretaría de " + lug
            
        lugar = session.query(Secretaria).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Secretaria(nombre=lug)
            session.add(lugar)
                

    elif area == "prosecretaria" or area == "prosecretaría":
        if area not in lug:
            lug = "prosecretaría de " + lug
            
        lugar = session.query(Prosecretaria).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Prosecretaria(nombre=lug)
            session.add(lugar)
            
                
    elif area == "maestria" or area == "maestría":
        if area not in lug:
            lug = "maestría en " + lug
            
        lugar = session.query(Maestria).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Maestria(nombre=lug)
            session.add(lugar)
            
    elif area == "instituto":
        if area not in lug:
            lug = "instituto de " + lug
            
        lugar = session.query(Instituto).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Instituto(nombre=lug)
            session.add(lugar)
                
                
    elif area == "escuela":
        if area not in lug:
            lug = "escuela de " + lug
            
        lugar = session.query(Escuela).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Escuela(nombre=lug)
            session.add(lugar)
                
                
    elif area == "direccion" or area == "dirección":
        if area not in lug:
            lug = "dirección de " + lug
            
        lugar = session.query(Direccion).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Direccion(nombre=lug)
            session.add(lugar)
            
                
    elif area == "departamento":
        if area not in lug:
            lug = "departamento de " + lug
        
        lugar = session.query(Departamento).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Departamento(nombre=lug)
            session.add(lugar)

    elif area == "centro":
        if "centro" not in lug:
            lug = "centro de " + lug
        
        lugar = session.query(Centro).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Centro(nombre=lug)
            session.add(lugar)                
            

    elif area == "autoridades superiores":    
        if "decanato" in lug:
          #agregar lugares sin tipo
          lugar = session.query(Lugar).filter_by(nombre="decanato").first() 
          if not lugar:
              lugar = Lugar(nombre="decanato")
              session.add(lugar)
                      

        elif "prosecr" in lug:           
            lugar = session.query(Prosecretaria).filter_by(nombre=lug).first() 
            if not lugar:
                lugar = Prosecretaria(nombre=lug)
                session.add(lugar)
                
        elif "secr" in lug:
            lugar = session.query(Secretaria).filter_by(nombre=lug).first() 
            if not lugar:
                lugar = Secretaria(nombre=lug)
                session.add(lugar)                    
            
    if lugar is None:
          print("no se definio lugar " + lug + " " + area)


    return lugar        
            
    """
    if "seminario" in func:
        lug_ = func + " " + lugar.nombre
        lugar_ = session.query(Seminario).filter_by(nombre=lug_).first()
        if not lugar_:
            lugar_ = Seminario(nombre=lug_, padre=lugar)
            session.add(lugar)
            return lugar_
    """

      
    
    
    
    
    
    
    
    
    

def setCargo(d):
    nombre = d["tipocargo_nombre"].strip().lower()
    cargo = session.query(Cargo).filter_by(nombre=nombre).first()
    if not cargo:
        cargo = Cargo(nombre=nombre, tipo='Docente')
        session.add(cargo)
    else:
        cargo.tipo = 'Docente'

    return cargo










def setDesignacionDocente(d, cargo, lugar, usuario):
    desde = d['desig_fecha_desde']
    hasta = d['desig_fecha_hasta']
    expe = d['resolucion_alta_expediente']
    res = d['resolucion_alta_numero']
    designacion = Designacion(tipo='Original', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
    session.add(designacion)

    ''' proceso la baja '''
    desde = d['desig_fecha_baja']
    if desde:
        expe = d['resolucion_baja_expediente']
        res = d['resolucion_baja_numero']
        designacion = Designacion(tipo='Baja Original', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
        session.add(designacion)






def setDesignacionTrabajo(d, cargo, lugar, usuario):
    desde = d['desig_fecha_desde']
    hasta = d['desig_fecha_hasta']
    expe = d['resolucion_alta_expediente']
    res = d['resolucion_alta_numero']
    designacion = Designacion(tipo='Lugar', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
    session.add(designacion)

    ''' proceso la baja '''
    desde = d['desig_fecha_baja']
    if desde:
        expe = d['resolucion_baja_expediente']
        res = d['resolucion_baja_numero']
        designacion = Designacion(tipo='Baja Lugar', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
        session.add(designacion)







if __name__ == '__main__':
    usuarios_faltantes = []
    
    users = users()

    for d in designacionesDocentes():
        lugar = setLugarDocente(d)
        usuario = setUsuario(d, users, usuarios_faltantes)
        cargo = setCargo(d)
        setDesignacionDocente(d, cargo=cargo, lugar=lugar, usuario=usuario)    
       
         
        
    for d in designacionesLugares():
        lugar = setLugarTrabajo(d)
        if not lugar:
            logging.info('No se define lugar\n')
        usuario = setUsuario(d, users, usuarios_faltantes)
        cargo = setCargo(d)
        setDesignacionTrabajo(d, cargo=cargo, lugar=lugar, usuario=usuario)
   
    session.commit()  
        
        
        

    logging.info('Usuarios Faltantes\n')
    logging.info(usuarios_faltantes)
