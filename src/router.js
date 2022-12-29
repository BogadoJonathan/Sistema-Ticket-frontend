import {createRouter,createWebHistory} from 'vue-router'
import ObleaExtintor from '@/pages/ObleaExtintor.vue'
import Inicio from '@/pages/Inicio.vue'

const routes = [
    { path: '/', name: "Home",component: Inicio },
    { path: '/imprimir', name: "imprimir",component: ObleaExtintor },
  ]

const router = createRouter({
history: createWebHistory(),
routes,
})

export default router