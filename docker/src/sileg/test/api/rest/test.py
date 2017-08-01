
import requests

if __name__ == '__main__':
    print(requests.get('http://127.0.0.1:5001/sileg/api/v1.0/materias/').json())
