sudo docker run -ti --name sileg -v $(pwd)/src:/src -p 5000:5000 -p 5001:5001 --env-file /home/pablo/gitlab/fce/pablo/environment-sileg-econo sileg
