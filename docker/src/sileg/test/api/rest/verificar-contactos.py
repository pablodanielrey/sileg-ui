from sileg.model.entities import Lugar
from sileg.model.GoogleAuthApi import GAuthApis


def obtenerCorreos(service, spreadsheetId,sheet):
    range = sheet + "!A:A"
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range=range).execute()
    values = result.get('values', [])
    emails = []
    if values:
        for row in values:
            emails.append(row)

    print("La hoja {} tiene {} emails".format(sheet, len(emails)))
    return emails

if __name__ == '__main__':

    service = GAuthApis.getServiceSheet()

    spreadsheetId = '1doSTh4R_g2RBc26lXpv-xaqLMhBH1ZtR2qHu8JwvGOM'
    # spreadsheetId = '1URLHQ5jjMt1ladZatVllth5mWXfxgabNHlmS9El44UE'
    ranges = []
    include_grid_data = False

    # result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range='A1-A100').execute()
    result = service.spreadsheets().get(spreadsheetId=spreadsheetId).execute()
    sheets = result["sheets"]

    emails = []
    for s in sheets:
        prop = s["properties"]
        sheet = prop["title"]
        print(sheet)
        emails.extend(obtenerCorreos(service, spreadsheetId, sheet))

    print(len(emails))
