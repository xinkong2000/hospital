/*
* @Author: xinkong2000
* @Date:   2019-07-18 16:30:11
* @Last Modified by:   xinkong2000
* @Last Modified time: 2019-09-01 13:13:16
*/

export default{
	routes: [{
		name: 'home',
        path: '/',
        component: () => import('./lib/home.vue'),
        alias: '/home',
        /*children: [{
        	name: 'Picturespace',
        	path: 'Picturespace',
        	component: () => import('vue-picture-space')
        },{
        	name: 'body',
        	path: '/body',
        	component: () => import('./lib/body.vue')
        }]*/
    },{
    	name: 'login',
        path: '/login',
        component: () => import('./lib/login.vue')
    },{
        path: '*',
        redirect: '/'
    }]
}