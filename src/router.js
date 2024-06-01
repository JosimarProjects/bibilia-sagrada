import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/components/IndexPage.vue'

const routes = [
    {
        path: '/',
        component: IndexPage,
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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
