from sileg.model.entities import Lugar
from sileg.model.GoogleAuthApi import GAuthApis


if __name__ == '__main__':

    service = GAuthApis.getServiceSheet()

    spreadsheetId = '' #id de la hoja
    ranges = []
    include_grid_data = False
    # result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range='A1-A100').execute()
    result = service.spreadsheets().get(spreadsheetId=spreadsheetId).execute()
    sheets = result["sheets"]
    for s in sheets:
        print(s)
        if "basicFilter" in s:
            print(s["basicFilter"])


    # range = {'sheetId': 145432231, 'startRowIndex': 0, 'endRowIndex': 552}
    rangeName = 'A1:A100'
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else:
        print('Name, Major:')
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print(row)
