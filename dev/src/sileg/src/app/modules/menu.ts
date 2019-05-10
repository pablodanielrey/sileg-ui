import { MenuSistema } from '../core/sistema/types';
  
export const menu : MenuSistema = [
    { item: 'Lugares', menu: null, ruta: '/sistema/lugares/seleccionar', icono: 'filter_1', permisos: ['urn:sileg:lugares:read'] },
    { item: 'Pendientes', menu: null, ruta: '/sistema/movimientos/pendientes', icono: 'notifications_none', permisos: [] },
    { 
        item: 'Pendientes', ruta: null, icono: 'notifications_none', permisos: [], 
        menu: [
            { item: 'Submenu pendiente 1', menu: null, ruta: '/sistema/lugares/seleccionar', icono: 'filter_1', permisos: ['urn:sileg:lugares:read'] },
            { item: 'Submenu pendiente 2', menu: null, ruta: '/sistema/movimientos/pendientes', icono: 'notifications_none', permisos: [] }
        ]
    }
];