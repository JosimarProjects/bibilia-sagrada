import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/components/IndexPage.vue'
import VersiculoAleatorio from "@/components/VersiculoAleatorio.vue";
import ProcurarCapituloEVersiculo from "@/components/ProcurarCapituloEVersiculo.vue";

const routes = [
    {
        path: '/',
        component: ProcurarCapituloEVersiculo,
        /*children: [
            {
                path: 'profissionais/:tipo',
                name: 'profissionais',
                props: true,
                components: {
                    profissionais: ListaItens
                }
            },
            {
                path: 'equipamentos/:tipo',
                name: 'equipamentos',
                props: true,
                components: {
                    equipamentos: ListaItens
                }
            }
        ]*/
    },
    {
        path: '/versiculo-aleatorio',
        component: VersiculoAleatorio
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
