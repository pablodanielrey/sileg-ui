
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

if __name__ == '__main__':

    # mautic

    # obtengo los segmentos
    segmentos = requests.get(mautic_api + 'segments/', auth=HTTPBasicAuth(usuario_mautic, clave_mautic)).json()

    for s in segmentos["lists"].values():
        print(s)
        break;

    # obtengo los miembros de un segmento
    users = requests.get(mautic_api + 'contacts/?search=segment:rebotados', auth=HTTPBasicAuth(usuario_mautic, clave_mautic)).json()
    for u in users["contacts"].values():
        print('id: {}'.format(u["id"]))

    exit()



    # obtengo los cargos
    cargosA = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/cargos/').json()
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

    for value in result.values():
        print('Nombre: {} -- usuarios: {}'.format(value["nombre"], value["usuarios"]))
