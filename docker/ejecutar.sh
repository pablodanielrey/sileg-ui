#!/bin/bash
sudo docker run -ti --rm  --name sileg -v $(pwd)/src:/src -p 5020:5000 -p 5021:5001 -p 5022:5002 -p 5023:5003 --env-file $HOME/econo/gitlab/fce/produccion/sileg sileg
sudo docker exec -t sileg bash instalar.sh
