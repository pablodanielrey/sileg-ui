import sys
from flask import Flask, abort, make_response, jsonify, url_for

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='/src/sileg/web')


"""
    Seguir la definición de REST
    http://www.restapitutorial.com/lessons/httpmethods.html
    https://spring.io/guides/gs/consuming-rest-angularjs/
"""

@app.route('/sileg/api/v1.0/designaciones/<int:id>', methods=['GET'])
def obtenerDesignacion(id):
    ''' obtengo la designacion definida por tal id '''
    d = None
    return jsonify(d)

@app.route('/sileg/api/v1.0/designaciones', methods=['GET'])
def obtenerDesignaciones():
    ''' obtengo todas las designaciones '''
    return jsonify({'designaciones':[]})


def main():
    app.run(host='0.0.0.0', port=5001, debug=True)

if __name__ == '__main__':
    main()
