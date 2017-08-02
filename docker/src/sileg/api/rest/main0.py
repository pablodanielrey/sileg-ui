import logging
logging.getLogger().setLevel(logging.INFO)
import sys
from flask import Flask, abort, make_response, jsonify, url_for, request, json
from sileg.model.UsuariosModel import UsuariosModel
from flask_jsontools import jsonapi

from rest_utils import register_encoder

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='/src/sileg/web')
register_encoder(app)

"""
    ------------------------ esto es codigo de otro sistema. el sistema de usuarios --------------------------
"""

@app.route('/fce/api/v1.0/usuarios/', methods=['GET', 'POST'], defaults={'usuario':None})
@app.route('/fce/api/v1.0/usuarios/<usuario>', methods=['GET', 'POST'])
@jsonapi
def fce_usuarios(usuario=None):
    return UsuariosModel.usuarios(usuario=usuario)

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

"""
    -----------------------------------------------------------------------------------------
"""


def main():
    app.run(host='0.0.0.0', port=5002, debug=True)

if __name__ == '__main__':
    main()
