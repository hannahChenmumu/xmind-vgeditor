import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Edit from '../views/edit';
import EditFullscreen from '../views/editFullscreen';
import Readonly from '../views/readonly';

const routes = [
  { name: 'modeEdit', path: '/modeEdit', component: Edit },
  { name: 'modeFullscreen', path: '/modeFullscreen', component: EditFullscreen },
  { name: 'modeReadonly', path: '/modeReadonly', component: Readonly },
]

const router = new VueRouter({
  routes,
})

export default router;