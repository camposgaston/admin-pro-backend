const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Inicio', url: '/' },
                { title: 'Barra de Progreso', url: 'progress' },
                { title: 'Graficos', url: 'grafica1' },
                { title: 'Promesas', url: 'promesas' },
                { title: 'Rxjs', url: 'rxjs' }
            ]
        },
        {
            title: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Usuarios', url: 'users' },
                { title: 'Hospitales', url: 'hospitals' },
                { title: 'Doctores', url: 'doctors' }
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        // add users maintenance option if user has admin role 
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' })
    }

    return menu;

};

module.exports = {
    getMenuFrontEnd
}