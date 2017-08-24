
import requests
from requests.auth import HTTPBasicAuth
import os


usuarios_api = os.environ['USER_REST_URL']
sileg_api = os.environ['SILEG_REST_URL']
usuario_mautic = os.environ['MAUTIC_USER']
clave_mautic = os.environ['MAUTIC_PASSWORD']
mautic_api = os.environ['MAUTIC_REST_URL']


def getEconoMail(usuario):
    if len(usuario['mails']) <= 0:
        return None
    for m in usuario['mails']:
        if 'unlp.edu.ar' in m['email']:
            return m['email']
    return None

def obtenerSegmentos():
    segmentos = requests.get(mautic_api + 'segments/', auth=HTTPBasicAuth(usuario_mautic, clave_mautic)).json()
    return segmentos["lists"].values()

def obtenerMiembrosSegmento(alias_segmento):
    users = requests.get(mautic_api + 'contacts/?search=segment:' + alias_segmento, auth=HTTPBasicAuth(usuario_mautic, clave_mautic)).json()
    return users["contacts"].values()

def parseUser(u):
    fields = u["fields"]
    core = fields["core"]
    email = core["email"]["value"]
    name = core["firstname"]["value"]
    lastname = core["lastname"]["value"]

    return {"name":name, "lastname":lastname, "email":email}

'''
segmento:
{
    name: Segment name is the only required field,
    alias: Name alias generated automatically if not set,
    description: A description of the segment,
    isPublished: A value of 0 or 1,
    isGlobal: boolean
}
'''
def crearSegmento(segmento):
    return requests.post(mautic_api + 'segments/new', auth=HTTPBasicAuth(usuario_mautic, clave_mautic), data=segmento).json()

def normalizarAlias(alias):
    return alias.lower().replace(".","-").replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").replace("ñ","n")

if __name__ == '__main__':

    # mautic

    # obtengo los segmentos
    segmentos = {}
    for s in obtenerSegmentos():
        segmentos[s["alias"]] = {"name":s["name"], "alias":s["alias"]}
    print(segmentos)

    # obtengo los miembros de un segmento
    users = obtenerMiembrosSegmento('rebotados')
    for u in users:
        print('Usuario: {}'.format(parseUser(u)))
        break;
        print('id: {}'.format(u["id"]))



    # obtengo los cargos
    cargosA = requests.get(sileg_api + '/cargos').json()
    cargos = {}
    for c in cargosA:
        cargos[c['id']] = c


    result = {}
    desig = requests.get(sileg_api + '/designaciones').json()
    i = 0
    for d in desig:
        i = i + 1
        print("procesando desginacion {} de {}".format(i, len(desig)))
        m = {'nombre':'-'}
        cid = d['lugar_id']
        cs = requests.get(sileg_api + '/catedras/' + cid).json()
        if len(cs) <= 0:
            ''' no es una catedra '''
            continue

        c = cs[0]
        cargo = cargos[d['cargo_id']]
        uid = d['usuario_id']
        u = requests.get(usuarios_api + '/usuarios/' + uid).json()
        email = getEconoMail(u)
        if email is None:
            continue

        departamento = c['padre']['nombre']
        materia = c['materia']['nombre']

        nombre = '{}.{}.{}'.format(departamento, materia, cargo['nombre'])
        id = c['padre']['id'] + c['materia']['id'] + d['cargo_id']

        user = {'nombre':u["nombre"], "apellido":u["apellido"], "email": email}
        if id in result:
            r = result[id]
            r["usuarios"].append(user)
        else:
            result[id] = {'nombre': nombre, 'usuarios':[user]}

        break; # lo puse para hacer mas rapido las pruebas, eliminarlo en producccion

    for value in result.values():
        seg = {"name":value["nombre"], "alias":normalizarAlias(value["nombre"])}

        if seg["alias"] in segmentos:
            print("ya existe el segmento: " + seg["alias"])
            continue
        print("creando segmento" + seg["alias"])
        print(crearSegmento(seg))

        # debo agregar los miembros al segmento
        print('Nombre: {} -- usuarios: {}'.format(value["nombre"], value["usuarios"]))
        break; # lo puse para hacer mas rapido las pruebas, eliminarlo en producccion
