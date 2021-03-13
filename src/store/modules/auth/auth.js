import axios from 'axios';

export default {
	namespaced: true,
	state() {
		return {
			token: null,
			role: null,
		};
	},

	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
		token(state) {
			return { token: state.token };
		},
		role(state) {
			return state.role;
		},
	},

	mutations: {
		setUser(state, payload) {
			state.token = payload.token;
			state.role = payload.role;
			return;
		},
	},

	actions: {
		login(context, payload) {
			return context.dispatch('auth', {
				...payload,
				mode: 'login',
			});
		},
		signup(context, payload) {
			return context.dispatch('auth', {
				...payload,
				mode: 'register',
			});
		},

		async auth(context, payload) {
			const mode = payload.mode;
			let url = null;

			if (mode === 'login') {
				url = process.env.VUE_APP_BACKEND_URI + '/api/v1/authentication/login';
			}
			if (mode === 'register') {
				url = process.env.VUE_APP_BACKEND_URI + '/api/v1/authentication/register';
			}

			try {
				const response = await axios.post(url, {
					email: payload.email,
					password: payload.password,
					name: payload.name,
				});
				context.commit('setUser', { token: response.data.token, role: response.data.role });
				localStorage.setItem('token', response.data.token);
			} catch (err) {
				console.log(err.response.data.error);
			}
		},

		// ---------------------------------------------Try Login------------------------------
		async tryLogin(context) {
			try {
				const response = await axios.get(process.env.VUE_APP_BACKEND_URI + `/api/v1/authentication/me`, {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				});
				if (response.data.success === true) {
					const token = localStorage.getItem('token');
					context.commit('setUser', {
						token,
						role: response.data.data.role,
					});
				}
				return true;
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
					return false;
				} else if (error.request) {
					console.log(error.response.data);
					return false;
				} else {
					console.log('Error', error.message);
					return false;
				}
			}
		},

		logout(context) {
			localStorage.removeItem('token');
			context.commit('setUser', {
				token: null,
			});
		},
	},
};
