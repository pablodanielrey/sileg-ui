import logging
logging.getLogger().setLevel(logging.INFO)
import sys
from flask import Flask, abort, make_response, jsonify, url_for, request, json
from sileg.model.SilegModel import SilegModel


# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='/src/sileg/web')



    
    
@app.route('/sileg/api/v1.0/designaciones/', methods=['GET', 'POST'])
def designaciones():
    data = request.form.get('data')
    render = json.loads(data)
    response = SilegModel.designaciones(render)
    return jsonify(response)
  

    


def main():
    app.run(host='0.0.0.0', port=5001, debug=True)

if __name__ == '__main__':
    main()
