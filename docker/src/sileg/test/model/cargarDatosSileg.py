
import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import psycopg2
import psycopg2.extras

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sileg.model.entities import Cargo, Catedra, Categoria, Departamento, Designacion, LugarDictado, Materia, Usuario, Secretaria, Instituto, Maestria, Prosecretaria, Escuela, Lugar, Direccion, Centro


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
                SELECT desig_id AS id_designacion, desig_observaciones AS observaciones, desig_fecha_desde AS fecha_desde, desig_fecha_hasta AS fecha_hasta, desig_fecha_baja AS fecha_baja,
                resolucion_alta.resolucion_numero AS resolucion,  resolucion_alta.resolucion_expediente AS expediente,
                desig_ord_fdesde AS fecha_desde_ordenanza, desig_ord_fhasta AS fecha_hasta_ordenanza,
                resolucion_ordenanza.resolucion_numero AS resolucion_ordenanza, resolucion_ordenanza.resolucion_expediente AS resolucion_expediente, 
                resolucion_baja.resolucion_numero AS resolucion_baja,  resolucion_baja.resolucion_expediente AS expediente_baja,
                tipo_baja.tipobajadesig_nombre AS baja,
                tipocargo_nombre AS cargo, tipo_dedicacion.tipodedicacion_nombre AS dedicacion, tipocaracter_nombre AS caracter,
                tipo_caracter_extraordinario.tipoextraord_nombre AS caracter_extraordinario,
                pers_nombres, pers_apellidos, pers_nrodoc,
                materia.materia_nombre AS materia, catedra.catedra_nombre AS catedra, departamento.dpto_nombre AS departamento

                FROM designacion_docente
                INNER JOIN tipo_cargo ON (designacion_docente.desig_tipocargo_id = tipo_cargo.tipocargo_id)
                INNER JOIN tipo_dedicacion ON (designacion_docente.desig_tipodedicacion_id = tipo_dedicacion.tipodedicacion_id)
                INNER JOIN tipo_caracter ON (designacion_docente.desig_tipocaracter_id = tipo_caracter.tipocaracter_id)
                INNER JOIN empleado ON (designacion_docente.desig_empleado_id = empleado.empleado_id)
                INNER JOIN persona ON (empleado.empleado_pers_id = persona.pers_id)
                INNER JOIN catedras_x_materia ON (designacion_docente.desig_catxmat_id = catedras_x_materia.catxmat_id)
                INNER JOIN materia ON (catedras_x_materia.catxmat_materia_id = materia.materia_id)
                INNER JOIN catedra ON (catedras_x_materia.catxmat_catedra_id = catedra.catedra_id)
                INNER JOIN departamento ON (materia.materia_dpto_id = departamento.dpto_id)
                LEFT JOIN resolucion AS resolucion_alta ON (resolucion_alta.resolucion_id = desig_resolucionalta_id)
                LEFT JOIN resolucion AS resolucion_baja ON (resolucion_baja.resolucion_id = desig_resolucionbaja_id)
                LEFT JOIN resolucion AS resolucion_ordenanza ON (resolucion_ordenanza.resolucion_id = desig_resolucionord_id)
                LEFT JOIN tipo_caracter_extraordinario ON (designacion_docente.desig_tipodedicacion_id = tipo_caracter_extraordinario.tipoextraord_id)
                LEFT JOIN tipo_baja AS tipo_baja ON (designacion_docente.desig_tipobaja_id = tipo_baja.tipobajadesig_id)
            ''');

            return cur.fetchall()
        finally:
          cur.close()

    finally:
        conn.close()
        
        
        
        





def extensionesDocentesDeDesignacionesDocentes():
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
                SELECT desig_id AS id_designacion,
                extension_id AS id_extension,
                extension.extension_fecha_desde AS fecha_desde, extension.extension_fecha_hasta AS fecha_hasta, extension.extension_fecha_baja AS fecha_baja,
                eresolucion_alta.resolucion_numero AS resolucion, eresolucion_alta.resolucion_expediente AS expediente,
                eresolucion_baja.resolucion_numero AS resolucion_baja, eresolucion_baja.resolucion_expediente AS expediente_baja,
                emateria.materia_nombre AS materia, ecatedra.catedra_nombre AS catedra, edepartamento.dpto_nombre AS departamento,
                etipo_dedicacion.tipodedicacion_nombre AS dedicacion, 
                etipo_baja.tipobajadesig_nombre AS baja,
                extension.extension_comision AS observaciones

                FROM designacion_docente
                INNER JOIN tipo_cargo ON (designacion_docente.desig_tipocargo_id = tipo_cargo.tipocargo_id)
                INNER JOIN tipo_dedicacion ON (designacion_docente.desig_tipodedicacion_id = tipo_dedicacion.tipodedicacion_id)
                INNER JOIN tipo_caracter ON (designacion_docente.desig_tipocaracter_id = tipo_caracter.tipocaracter_id)
                INNER JOIN empleado ON (designacion_docente.desig_empleado_id = empleado.empleado_id)
                INNER JOIN persona ON (empleado.empleado_pers_id = persona.pers_id)
                INNER JOIN catedras_x_materia ON (designacion_docente.desig_catxmat_id = catedras_x_materia.catxmat_id)
                INNER JOIN materia ON (catedras_x_materia.catxmat_materia_id = materia.materia_id)
                INNER JOIN catedra ON (catedras_x_materia.catxmat_catedra_id = catedra.catedra_id)
                INNER JOIN departamento ON (materia.materia_dpto_id = departamento.dpto_id)

                INNER JOIN extension ON (extension.extension_designacion_id = designacion_docente.desig_id)
                INNER JOIN catedras_x_materia AS ecatedras_x_materia ON (extension.extension_catxmat_id = ecatedras_x_materia.catxmat_id)
                INNER JOIN materia AS emateria ON (ecatedras_x_materia.catxmat_materia_id = emateria.materia_id)
                INNER JOIN catedra AS ecatedra ON (ecatedras_x_materia.catxmat_catedra_id = ecatedra.catedra_id)
                INNER JOIN departamento AS edepartamento ON (emateria.materia_dpto_id = edepartamento.dpto_id)
                INNER JOIN tipo_dedicacion AS etipo_dedicacion ON (extension.extension_nuevadedicacion_id = etipo_dedicacion.tipodedicacion_id)
                LEFT JOIN resolucion AS eresolucion_alta ON (eresolucion_alta.resolucion_id = extension_resolucionalta_id)
                LEFT JOIN resolucion AS eresolucion_baja ON (eresolucion_baja.resolucion_id = extension_resolucionbaja_id)
                LEFT JOIN tipo_baja AS etipo_baja ON (extension.extension_tipobaja_id = etipo_baja.tipobajadesig_id);
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
                LEFT JOIN resolucion AS resolucion_baja ON (resolucion_baja.resolucion_id = desig_resolucionbaja_id);
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







def setUsuario(dni, users, usuarios_faltantes):
    """
        carga el usuario dentro de las tablas internas del sistema chequeando con el sistema de perfiles de usuario principal.

        consulta para verificar:

         select u.dni, u.name, u.lastname, m.email
            from sileg.usuario s
            left join profile.users u on (s.id = u.id)
            left join profile.mails m on (u.id = m.user_id);
    """

    if dni not in users:
        usuarios_faltantes.append(dni)
        return None

    userId = users[dni]

    usuario = session.query(Usuario).filter_by(id=userId).first()
    if not usuario:
        usuario = Usuario(id=userId)
        session.add(usuario)
        session.commit()  
    return usuario







def setLugarDocente(mat_, dep, cat):
    """
    Define lugar a partir de las designaciones docentes
    """
    
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
            session.commit()                  

    elif area == "prosecretaria" or area == "prosecretaría":
        if area not in lug:
            lug = "prosecretaría de " + lug
            
        lugar = session.query(Prosecretaria).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Prosecretaria(nombre=lug)
            session.add(lugar)
            session.commit()            
                
    elif area == "maestria" or area == "maestría":
        if area not in lug:
            lug = "maestría en " + lug
            
        lugar = session.query(Maestria).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Maestria(nombre=lug)
            session.add(lugar)
            session.commit()              
            
    elif area == "instituto":
        if area not in lug:
            lug = "instituto de " + lug
            
        lugar = session.query(Instituto).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Instituto(nombre=lug)
            session.add(lugar)
            session.commit()
                
    elif area == "escuela":
        if area not in lug:
            lug = "escuela de " + lug
            
        lugar = session.query(Escuela).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Escuela(nombre=lug)
            session.add(lugar)
            session.commit()
                
    elif area == "direccion" or area == "dirección":
        if area not in lug:
            lug = "dirección de " + lug
            
        lugar = session.query(Direccion).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Direccion(nombre=lug)
            session.add(lugar)
            session.commit()
                
    elif area == "departamento":
        if area not in lug:
            lug = "departamento de " + lug
        
        lugar = session.query(Departamento).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Departamento(nombre=lug)
            session.add(lugar)
            session.commit()
            
    elif area == "centro":
        if "centro" not in lug:
            lug = "centro de " + lug
        
        lugar = session.query(Centro).filter_by(nombre=lug).first() 
        if not lugar:
            lugar = Centro(nombre=lug)
            session.add(lugar)                
            session.commit()

    elif area == "autoridades superiores":    
        if "decanato" in lug:
          #agregar lugares sin tipo
          lugar = session.query(Lugar).filter_by(nombre="decanato").first() 
          if not lugar:
              lugar = Lugar(nombre="decanato")
              session.add(lugar)
              session.commit()

        elif "prosecr" in lug:           
            lugar = session.query(Prosecretaria).filter_by(nombre=lug).first() 
            if not lugar:
                lugar = Prosecretaria(nombre=lug)
                session.add(lugar)
                session.commit()
                
        elif "secr" in lug:
            lugar = session.query(Secretaria).filter_by(nombre=lug).first() 
            if not lugar:
                lugar = Secretaria(nombre=lug)
                session.add(lugar)                    
                session.commit()

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

      
    
    
    
    
    
    
    
    
    

def setCargo(car):

    cargo = session.query(Cargo).filter_by(nombre=car).first()
    if not cargo:
        cargo = Cargo(nombre=car, tipo='Docente')
        session.add(cargo)
        session.commit()  

    else:
        cargo.tipo = 'Docente'

    return cargo










def setDesignacionDocente(datosDesignacion, cargo, lugar, usuario):
    old_id = "designacion" + str(datosDesignacion["id_designacion"])
    desde = datosDesignacion['fecha_desde']
    hasta = datosDesignacion['fecha_hasta']
    expe = datosDesignacion['expediente']
    res = datosDesignacion['resolucion']
    ded = datosDesignacion["dedicacion"].strip().lower()
    carac = datosDesignacion["caracter"].strip().lower()
    desde_baja = datosDesignacion['fecha_baja']
    expe_baja = datosDesignacion['expediente_baja']
    res_baja = datosDesignacion['resolucion_baja']
      
    dedicacion = session.query(Categoria).filter_by(nombre=ded).first()
    if not dedicacion:
        dedicacion = Categoria(nombre=ded)
        
    caracter = session.query(Categoria).filter_by(nombre=carac).first()
    if not caracter:
        caracter = Categoria(nombre=carac)
        
    designacion = session.query(Designacion).filter_by(old_id=old_id).first()
    if not designacion:
        designacion = Designacion(tipo='designacion', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario, old_id=old_id)
        designacion.categorias.append(dedicacion)
        designacion.categorias.append(caracter)
        session.add(designacion)
        session.commit()  
    
    ''' proceso la baja '''
    if desde_baja:
        old_id_baja = "bajadesignacion" + str(datosDesignacion["id_designacion"])
        designacionBaja = session.query(Designacion).filter_by(old_id=old_id_baja).first()
        if not designacionBaja:
            designacionBaja = Designacion(tipo='baja', desde=desde_baja, expediente=expe_baja, resolucion=res_baja, cargo=cargo, lugar=lugar, usuario=usuario, designacion_id=designacion.id, old_id=old_id_baja)
            session.add(designacionBaja)
            session.commit()  
        
    


def setExtensionDocenteDeDesignacionDocente(datosExtension, lugar):
    old_id_designacion = "designacion" + str(datosExtension["id_designacion"])
    old_id_extension = "extension" + str(datosExtension["id_extension"])

    desde = datosExtension['fecha_desde']
    hasta = datosExtension['fecha_hasta']
    expe = datosExtension['expediente']
    res = datosExtension['resolucion']
    ded = datosExtension["dedicacion"].strip().lower()
    desde_baja = datosExtension['fecha_baja']
    expe_baja = datosExtension['expediente_baja']
    res_baja = datosExtension['resolucion_baja']
        
     
   
    extension = session.query(Designacion).filter_by(old_id=old_id_extension).first()
    if not extension:
        designacion = session.query(Designacion).filter_by(old_id=old_id_designacion).first()
        if not designacion:
            print("No esta definida la designacion " + old_id_designacion)
            return 
         
        usuario_id = designacion.usuario_id
        cargo_id = designacion.cargo_id
    
        
        dedicacion = session.query(Categoria).filter_by(nombre=ded).first()
        if not dedicacion:
            dedicacion = Categoria(nombre=ded)

        """        
        se define caracter de la extension?
        caracter = session.query(Categoria).filter_by(nombre=carac).first()
        if not caracter:
            caracter = Categoria(nombre=carac)
        """
        
        extension = Designacion(tipo='extension', desde=desde_baja, hasta=hasta, expediente=expe, cargo_id=cargo_id, resolucion=res, lugar=lugar, usuario_id=usuario_id, designacion_id=extension.id, old_id=old_id_extension)
        designacion.categorias.append(dedicacion)
        session.add(designacion)
        session.commit()  
        

        ''' proceso la baja '''
        if desde_baja:
            old_id_baja = "bajaextension" + str(datosDesignacion["id_designacion"])
            designacionBaja = session.query(Designacion).filter_by(old_id=old_id_baja).first()
            if not designacionBaja:
                designacionBaja = Designacion(tipo='baja', desde=desde_baja, expediente=expe_baja, resolucion=res_baja, cargo_id=cargo_id, lugar=lugar, usuario_id=usuario_id, designacion_id=extension.id, old_id=old_id_baja)
                session.add(designacionBaja)
                session.commit()  


            
        
    

def setDesignacionLugar(d, cargo, lugar, usuario):
    desde = d['desig_fecha_desde']
    hasta = d['desig_fecha_hasta']
    expe = d['resolucion_alta_expediente']
    res = d['resolucion_alta_numero']
    func = d['funcion_nombre'].strip().lower() if(d['funcion_nombre'] is not None) else None
    
    categorias = []
    
    if func is not None:
        if "acad" in func:
            categoria = session.query(Categoria).filter_by(nombre="academico").first()
            if not categoria:
                categoria = Categoria(nombre = "academico")   
                
        if "docente" in func:
            categoria = session.query(Categoria).filter_by(nombre="docente").first()
            if not categoria:
                categoria = Categoria(nombre = "docente")   
        
        
        elif "apoyo" in func:
            categoria = session.query(Categoria).filter_by(nombre="apoyo").first()
            if not categoria:
                categoria = Categoria(nombre = "apoyo")
        
        elif "codir" in func:
            categoria = session.query(Categoria).filter_by(nombre="codirector").first()
            if not categoria:
                categoria = Categoria(nombre = "codirector")      
        
        elif "coord" in func:
            categoria = session.query(Categoria).filter_by(nombre="coordinador").first()
            if not categoria:
                categoria = Categoria(nombre = "coordinador")

        elif "director" in func:
            categoria = session.query(Categoria).filter_by(nombre="director").first()
            if not categoria:
                categoria = Categoria(nombre = "director")          

        elif "investigador" in func:
            categoria = session.query(Categoria).filter_by(nombre="investigador").first()
            if not categoria:
                categoria = Categoria(nombre = "investigador")
                
        elif "seminario" in func:
            categoria = session.query(Categoria).filter_by(nombre="seminario").first()
            if not categoria:
                categoria = Categoria(nombre = "seminario")
        
        else:
            categoria = None
        
        if categoria is not None:
          categorias.append(categoria)                  
        
        
    designacion = Designacion(tipo='Lugar', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
    designacion.categorias = categorias
    session.add(designacion)
    session.commit()   

    ''' proceso la baja '''
    desde = d['desig_fecha_baja']
    if desde:
        expe = d['resolucion_baja_expediente']
        res = d['resolucion_baja_numero']
        designacion = Designacion(tipo='Baja Lugar', desde=desde, hasta=hasta, expediente=expe, resolucion=res, cargo=cargo, lugar=lugar, usuario=usuario)
        designacion.categorias = categorias  
        session.add(designacion)
        session.commit()  






if __name__ == '__main__':
    usuarios_faltantes = []
    
    users = users()

    for datosDesignacion in designacionesDocentes():
        usuario = setUsuario(str(datosDesignacion['pers_nrodoc']), users, usuarios_faltantes)
        lugar = setLugarDocente(datosDesignacion["materia"].split("C.U."), datosDesignacion['departamento'].strip().lower(), datosDesignacion['catedra'].strip().lower())

        cargo = setCargo(datosDesignacion["cargo"].strip().lower())
        setDesignacionDocente(datosDesignacion, cargo=cargo, lugar=lugar, usuario=usuario)    


    for datosExtension in extensionesDocentesDeDesignacionesDocentes():
        lugar = setLugarDocente(datosExtension["materia"].split("C.U."), datosExtension['departamento'].strip().lower(), datosExtension['catedra'].strip().lower())
        setExtensionDocenteDeDesignacionDocente(datosExtension, lugar)
        
          
    
    for d in designacionesLugares():
        lugar = setLugarTrabajo(d)
        if not lugar:
            logging.info('No se define lugar\n')
        usuario = setUsuario(d, users, usuarios_faltantes)
        cargo = setCargo(d)
        setDesignacionLugar(d, cargo=cargo, lugar=lugar, usuario=usuario)
    
    """
    for d in extensionesDocentesDeDesignacionesDocentes():
        usuario = setUsuario(str(d['pers_nrodoc']), users, usuarios_faltantes)
        lugar = setLugarDocente(d,  d["extension_materia"].split("C.U."), d['extension_catedra'].strip().lower(), d['extension_departamento'].strip().lower())
        cargo = setCargo(d["tipocargo_nombre"].strip().lower())
        setDesignacionDocente(d, cargo=cargo, lugar=lugar, usuario=usuario)    

    """ 

        

    logging.info('Usuarios Faltantes\n')
    logging.info(usuarios_faltantes)
