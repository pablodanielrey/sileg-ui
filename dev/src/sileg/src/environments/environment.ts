export const environment = {
    production: false,
    silegApiUrl: 'http://api.econo.unlp.edu.ar:10202/sileg/api/v1.0',
    usuarioApiUrl: 'https://api.econo.unlp.edu.ar/users/api/v2.0',
    loginApiUrl: 'https://api.econo.unlp.edu.ar/login/api/v1.0',
    wardenApiUrl: 'https://api.econo.unlp.edu.ar/warden/api/v1.0',
    //wardenApiUrl: 'http://localhost:10502/warden/api/v1.0',
    oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',

    client_id: 'sileg-ui',
    version: '0.1.1a',

    loader: {
      cabecera: 'GELIS | FCE',
      version: '0.1.1a',
      tituloSistema: 'GELIS',
      subtituloSistema: 'Sistema de Legajos y Designaciones',
      desarrolloSistema: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos',
      logoSistema: '/assets/img/fce/logofce2018.png',
    },
    
    sistema: {
      header: {
        
      },
      menu: {

      }
    },
};
