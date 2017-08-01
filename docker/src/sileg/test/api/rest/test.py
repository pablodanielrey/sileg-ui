
import requests

if __name__ == '__main__':
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
