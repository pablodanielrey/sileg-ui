#!/bin/bash
echo "corriendo en el puerto 10205"
docker run --rm -ti --name sileg-ui -v $(pwd)/src:/src -p 10205:4200 sileg-ui /bin/sh
