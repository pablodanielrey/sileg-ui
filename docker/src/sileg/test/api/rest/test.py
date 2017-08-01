
import requests

if __name__ == '__main__':
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
        if 'catedra' in d['lugar']['tipo']:
            cid = d['lugar']['id']
            c = requests.get('http://127.0.0.1:5001/sileg/api/v1.0/catedras/{}'.format(cid)).json()[0]

        print('''
Departamento: {}
Materia: {}
Catedra: {}
Persona: {}
Cargo: {} - {}
        '''.format(
            c['padre']['nombre'],
            c['materia']['nombre'],
            d['lugar']['nombre'],
            d['usuario']['id'],
            d['cargo']['nombre'], d['cargo']['tipo']
        ))
