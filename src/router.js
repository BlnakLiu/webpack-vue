import Vue from 'vue';
import VueRouter from 'vue-router';
import Contact from './components/contact.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        }
    ]
});