from sileg.model.entities import Lugar
from sileg.model.GoogleAuthApi import GAuthApis
import requests
from requests.auth import HTTPBasicAuth
import os


usuario_mautic = os.environ['MAUTIC_USER']
clave_mautic = os.environ['MAUTIC_PASSWORD']
mautic_api = os.environ['MAUTIC_REST_URL']

def esCorreo(email):
    r = email.strip().split('@')
    return len(r) > 1 and r[1] != ''

def obtenerUsuario(email):
    users = requests.get(mautic_api + 'contacts/?search=email:' + email, auth=HTTPBasicAuth(usuario_mautic, clave_mautic)).json()
    return users["contacts"]

def obtenerCorreos(service, spreadsheetId,sheet):
    range = sheet + "!A2:A"
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range=range).execute()
    values = result.get('values', [])
    emails = set()
    if values:
        for row in values:
            if len(row) > 0 and esCorreo(row[0]):
                emails.add(row[0].strip())

    print("La hoja {} tiene {} emails".format(sheet, len(emails)))
    return emails

if __name__ == '__main__':


    service = GAuthApis.getServiceSheet()

    spreadsheetId = os.environ['SPREADSHEET_ID']
    ranges = []
    include_grid_data = False

    result = service.spreadsheets().get(spreadsheetId=spreadsheetId).execute()
    sheets = result["sheets"]

    emails = set()
    for s in sheets:
        prop = s["properties"]
        sheet = prop["title"]
        print(sheet)
        emails.update(obtenerCorreos(service, spreadsheetId, sheet))

    existe = []
    noExiste = []
    for e in emails:
        u = obtenerUsuario(e)
        if len(u) > 0:
            print("{} se encuentra en mautic".format(e))
            existe.append(e)
        else:
            print("{} no existe en mautic".format(e))
            noExiste.append(e)

    print("Existen: {} No existen: {}".format(len(existe), len(noExiste)))
