sudo docker run -ti --name sileg -v $(pwd)/src:/src -p 5000:5000 -p 5001:5001 -p 5002:5002 --env-file /home/emanuel/econo/gitlab/fce/pablo/environment-sileg-econo sileg
