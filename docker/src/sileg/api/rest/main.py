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

@app.route('/sileg/api/v1.0/designaciones/', methods=['GET', 'POST'])
@jsonapi
def designaciones():
    limit = int(request.args.get('limit',10))
    return SilegModel.designaciones(limit=limit)

@app.route('/sileg/api/v1.0/departamentos/', methods=['GET', 'POST'])
@jsonapi
def departamentos():
    return SilegModel.departamentos()

@app.route('/sileg/api/v1.0/materias/', methods=['GET', 'POST'])
@jsonapi
def materias():
    dId = request.args.get('d',None)
    return SilegModel.materias(departamento=dId)

def main():
    app.run(host='0.0.0.0', port=5001, debug=True)

if __name__ == '__main__':
    main()
