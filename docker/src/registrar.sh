#!/bin/bash
python3 sileg/registrar.py sileg_web / gelis.econo.unlp.edu.ar:5020 &
python3 sileg/registrar.py sileg_rest /sileg/api gelis.econo.unlp.edu.ar:5021
