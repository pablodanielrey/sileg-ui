
import requests

if __name__ == '__main__':

    cargosA = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/cargos/').json()
    cargos = {}
    for c in cargosA:
        cargos[c['id']] = c

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


    desig = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/designaciones').json()
    for d in desig:

        m = {'nombre':'-'}
        cid = d['lugar_id']
        c = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/catedras/{}'.format(cid)).json()[0]

        cargo = cargos[d['cargo_id']]

        uid = d['usuario_id']
        u = requests.get('http://127.0.0.1:5002/fce/api/v1.0/usuarios/{}'.format(uid)).json()[0]

        print('''
Departamento: {}
Materia: {}
Catedra: {}
Persona: {}
Cargo: {} - {}
        '''.format(
            c['padre']['nombre'],
            c['materia']['nombre'],
            c['nombre'],
            u['dni'] + ' ' + u['nombre'] + ' ' + u['apellido'],
            cargo['nombre'], cargo['tipo']
        ))
