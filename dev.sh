#!/bin/bash
docker run --rm -ti --name sileg-ui -v $(pwd)/src:/src -p 10205:4200 sileg-ui /bin/sh
