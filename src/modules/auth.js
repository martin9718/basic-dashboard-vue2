import router from "../router";
import store from '../store';

const URL_API = 'http://localhost:3000';

const requestFetch = async (path, data) => {
    const myHeaders = new Headers();
    myHeaders.append("token", store.getters["auth/getToken"]);
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: data ? 'POST' : 'GET',
        headers: myHeaders,
        body: JSON.stringify(data) || null,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${URL_API}${path}`, requestOptions);
        const data = await response.json();

        if (data.error) throw data.error;
        return data;
    } catch (error) {
        console.log(error);
        return {error};
    }
}

export default {
    namespaced: true,
    state: {
        user: {},
        token: '',
        errors: []
    },
    mutations: {
        setUser (state, user){
            state.user = user
        },
        setToken (state, token){
            state.token = token;
        },
        setErrors(state, error){
            if (error == 'clear') {
                state.errors = [];
            } else {
                state.errors.push(error);
            }
        }
    },
    actions: {
        //SET ERRORS
        setErrors({commit}, error) {
            commit('setErrors', error)
        },
        //CREATE USER
        async registerUser({ commit }, user) {
            commit('setErrors', 'clear');
            const response = await requestFetch('/api/auth/register',user);
            if(response.error) commit('setErrors', response.error);
        },

        // GET USERS
        async getUsers({ commit }) {
            commit('setErrors', 'clear');
            const response = await requestFetch('/api/auth/users');
            return response.users;
        },

        // GET USER ROLES
        async getUserRoles({ commit }) {
            commit('setErrors', 'clear');
            const response = await requestFetch('/api/auth/getUserRoles');
            return response.roles;
        },

        // UPDATE USER
        async updateUser({ commit }, user) {
            commit('setErrors', 'clear');
            const response = await requestFetch(`/api/auth/updateUser/${user.id}`, user);
            if(response.error) commit('setErrors', response.error);
        },

        // DESACTIVE USER
        async desactiveUser({ commit }, id) {
            commit('setErrors', 'clear');
            const response = await requestFetch(`/api/auth/desactiveUser/${id}`);
            if(response.error) commit('setErrors', response.error);
        },

        // LOGIN
        async login({ commit }, user) {
            commit('setErrors', 'clear');
            const response = await requestFetch(`/api/auth/login`, user);
            if(response.error) return commit('setErrors', response.error);

            commit('setUser', response.user);
            commit('setToken', response.token);

            return router.push('/');

        },

        // LOGIN
        async verifyToken({ commit }, user) {
            if(!store.getters["auth/getToken"]){
                commit('setUser', undefined);
                return router.push('/login');
            }
            const response = await requestFetch(`/api/auth/verifyToken`, user);
            if(response.error) {
                commit('setUser', undefined);
                commit('setToken', undefined);
                return router.push('/login');
            }
            console.log('verifyToken')
            commit('setUser', response.user);
        },

        //LOG OUT
        logout({ commit }) {
            commit('setUser', undefined);
            commit('setToken', undefined);
            return router.push('/login');
        },



    },
    getters: {
        getUser(state){
            return state.user;
        },
        getToken(state){
            return state.token;
        },
        getErrors(state){
            return state.errors;
        }
    }

}