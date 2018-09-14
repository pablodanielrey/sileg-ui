#!/bin/bash
docker run --rm -ti --name sileg-ui -v $(pwd)/src:/src -p 4201:4200 sileg-ui /bin/sh
