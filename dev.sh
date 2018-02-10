#!/bin/bash
docker run --rm -ti -v $(pwd)/src:/src -p 4200:4200 sileg-ui /bin/sh
