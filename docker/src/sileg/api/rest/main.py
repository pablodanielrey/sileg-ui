import logging
logging.getLogger().setLevel(logging.INFO)
import sys
from flask import Flask, abort, make_response, jsonify, url_for, request, json
from sileg.model.SilegModel import SilegModel
from flask_jsontools import jsonapi

from rest_utils import register_encoder

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='/src/sileg/web')
register_encoder(app)

@app.route('/sileg/api/v1.0/usuarios/', methods=['GET', 'POST'], defaults={'usuario':None})
@app.route('/sileg/api/v1.0/usuarios/<usuario>', methods=['GET', 'POST'])
@jsonapi
def usuarios(usuario=None):
    dni = request.args.get('d',None)
    offset = request.args.get('offset',None,int)
    limit = request.args.get('limit',None,int)
    return SilegModel.usuarios(usuario=usuario, dni=dni, offset=offset, limit=limit)

@app.route('/sileg/api/v1.0/designaciones/', methods=['GET', 'POST'])
@jsonapi
def designaciones():
    offset = request.args.get('offset',None,int)
    limit = request.args.get('limit',None,int)
    lugar = request.args.get('l',None)
    persona = request.args.get('p',None)
    historico = request.args.get('h',False,bool)
    return SilegModel.designaciones(offset=offset, limit=limit, lugar=lugar, persona=persona, historico=historico)

@app.route('/sileg/api/v1.0/prorrogas/<designacion>', methods=['GET', 'POST'])
@jsonapi
def prorrogas(designacion):
    offset = request.args.get('offset',None,int)
    limit = request.args.get('limit',None,int)
    lugar = request.args.get('l',None)
    persona = request.args.get('p',None)
    historico = request.args.get('h',False,bool)
    return SilegModel.prorrogas(offset=offset, limit=limit, designacion=designacion, lugar=lugar, persona=persona, historico=historico)

@app.route('/sileg/api/v1.0/cargos/', methods=['GET', 'POST'])
@jsonapi
def cargos():
    return SilegModel.cargos()

@app.route('/sileg/api/v1.0/lugares/', methods=['GET'])
@jsonapi
def lugares():
    return SilegModel.lugares()

@app.route('/sileg/api/v1.0/departamentos/', methods=['GET', 'POST'])
@jsonapi
def departamentos():
    return SilegModel.departamentos()

@app.route('/sileg/api/v1.0/materias/', methods=['GET', 'POST'], defaults={'materia':None})
@app.route('/sileg/api/v1.0/materias/<materia>', methods=['GET', 'POST'])
@jsonapi
def materias(materia=None):
    catedra = request.args.get('c',None)
    departamento = request.args.get('d',None)
    return SilegModel.materias(materia=materia, catedra=catedra, departamento=departamento)

@app.route('/sileg/api/v1.0/catedras/', methods=['GET', 'POST'], defaults={'catedra':None})
@app.route('/sileg/api/v1.0/catedras/<catedra>', methods=['GET', 'POST'])
@jsonapi
def catedras(catedra=None):
    materia = request.args.get('m',None)
    departamento = request.args.get('d',None)
    return SilegModel.catedras(catedra=catedra, materia=materia, departamento=departamento)

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'

    r.headers['Access-Control-Allow-Origin'] = '*'
    return r

def main():
    app.run(host='0.0.0.0', port=5001, debug=True)

if __name__ == '__main__':
    main()
