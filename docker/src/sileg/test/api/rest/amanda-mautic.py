
import requests
import os

sileg_api = 'http://127.0.0.1:5001/sileg/api/v1.0'
#usuarios_api = os.environ['USER_REST_URL']
usuarios_api = 'http://163.10.56.55:7001/users/api/v1.0'

def getEconoMail(usuario):
    if len(usuario['mails']) <= 0:
        return None
    for m in usuario['mails']:
        if 'unlp.edu.ar' in m['email']:
            return m['email']
    return None

if __name__ == '__main__':
    # obtengo los cargos
    cargosA = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/cargos/').json()
    cargos = {}
    for c in cargosA:
        cargos[c['id']] = c


    result = {}
    desig = requests.get(sileg_api + '/designaciones').json()
    print(len(desig))
    for d in desig:
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
            print("Creando usuario {}, {}".format(user["nombre"], user["apellido"]))
        else:
            result[id] = {'nombre': nombre, 'usuarios':[user]}
            print("Agregando usuario {}, {}".format(user["nombre"], user["apellido"]))

    for value in result.values():
        print('Nombre: {} -- usuarios: {}'.format(value["nombre"], value["usuarios"]))
    exit()

    '''

    deptos = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/departamentos').json()
    for d in deptos:
        print('------------ {} -------------'.format(d['nombre']))
        did = d['id']
        materias = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/materias/?d={}'.format(did)).json()
        for m in materias:
            print(m)
    exit()
    '''
    """
    deptos = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/departamentos').json()
    for d in deptos:
        did = d['id']
        materias = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/materias/?d={}'.format(did)).json()
        for m in materias:
            print('''
Departamento: {}
Materia: {}
Cátedra: {}
            '''.format(d['nombre'], m['materia']['nombre'], m['nombre']))
    """

    with open('/tmp/sileg.csv','w') as f:

        desig = requests.get(sileg_api + '/designaciones').json()
        for d in desig:

            m = {'nombre':'-'}
            cid = d['lugar_id']
            cs = requests.get(sileg_api + '/catedras/' + cid).json()
            if len(cs) <= 0:
                ''' no es una catedra '''
                continue

            c = cs[0]
            cargo = cargos[d['cargo_id']]
            uid = d['usuario_id']
            u = requests.get(usuarios_api + '/usuarios/' + uid).json()[0]

            datos = {
                'departamento': c['padre']['nombre'],
                'materia': c['materia']['nombre'],
                'catedra': c['nombre'],
                'persona': u['dni'] + ' ' + u['nombre'] + ' ' + u['apellido'],
                'email': getEconoMail(u),
                'cargo': cargo['nombre'] + ' ' + cargo['tipo']
            }


            f.write(datos['departamento'] + ',' + datos['materia'] + ',' + datos['catedra'] + ',' + datos['persona'] + ',' + datos['email'] + ',' + datos['cargo'] + '\n')

            print('''
    Departamento: {}
    Materia: {}
    Catedra: {}
    Persona: {}
    Email: {}
    Cargo: {}
            '''.format(
                datos['departamento'],
                datos['materia'],
                datos['catedra'],
                datos['persona'],
                datos['email'],
                datos['cargo']
            ))
