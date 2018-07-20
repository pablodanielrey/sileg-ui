// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  silegApiUrl: 'https://api.asistencia.presi.unlp.edu.ar/sileg/api/v1.0',
  oidp_issuer: 'https://oidp.asistencia.presi.unlp.edu.ar',
  userinfoEndpoint: 'https://oidp.asistencia.presi.unlp.edu.ar/userinfo',
  loginUrl: 'https://oidp.asistencia.presi.unlp.edu.ar/oauth2/auth',
  logoutUrl: 'https://consent.asistencia.presi.unlp.edu.ar/logout'
  // tokenEndpoint: 'https://oidp.econo.unlp.edu.ar/oauth2/auth'  
};
