import logging
logging.getLogger().setLevel(logging.DEBUG)

import sys
import os
import psycopg2

if __name__ == '__main__':

    if len(sys.argv) <= 1:
        logging.warn('Debe especificar el archivo')
        sys.exit(1)

    host = os.environ['SILEG_DB_HOST']
    user = os.environ['SILEG_DB_USER']
    passwd = os.environ['SILEG_DB_PASSWORD']
    base = os.environ['SILEG_DB_NAME']

    con = psycopg2.connect(host=host, user=user, password=passwd, database=base)
    try:

        archivo = sys.argv[1]
        with open(archivo,'r') as f:
            for l in f:
                row = l.split(',')
                dni = row[0]

                cur = con.cursor()
                try:
                    cur.execute("""
                       SELECT u.name, u.lastname, o.id, o.name, d.sstart, d.send, o.type, o.assistance
                       FROM profile.users u inner join designations.designations d on (u.id = d.User_id) inner join offices.offices o on (o.id = d.office_id)
                       WHERE dni = %s and send is  null and assistance
                    """,(dni, ));

                    datos = cur.fetchall()
                    if len(datos) <= 0:
                        print("La persona {}  DNI:{} no esta asignada a una oficina".format(row[1] + ', ' + row[2], dni))
                    # else:
                        # print("Asignacion: ", datos)
                except Exception as e:
                    print (e)
                finally:
                    cur.close()

    finally:
        con.close()
