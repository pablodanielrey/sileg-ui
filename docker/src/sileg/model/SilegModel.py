
class SilegModel:

    @classmethod
    def generarCargos(cls, s):
        letras = ['A','B','C','D','E']
        cargos = []
        for i in range(1,8):
            for l in letras:
                cargos.append('{}{}'.format(l,i))
        ]
        for c in cargos:
            s.add(Cargo(nombre=c, tipo='No Docente'))
        s.commit()
