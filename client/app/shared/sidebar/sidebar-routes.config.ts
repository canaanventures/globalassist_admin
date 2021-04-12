import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '', title: 'Menu 1', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard/TripReq', title: 'Submenu1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/dashboard/dashboard2', title: 'Submenu2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    { path: '/pages/login', title: 'Login', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/pages/forgotpassword', title: 'Forgot Password', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/pages/comingsoon', title: 'Commin g Soon', icon: 'ft-loader', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
];
