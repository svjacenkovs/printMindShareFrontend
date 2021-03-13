import axios from 'axios';
import store from '../../index.js';

export default {
	namespaced: true,
	state() {
		return {
			materials: [],
		};
	},

	getters: {
		allMaterials(state) {
			return state.materials;
		},
		materialsLoaded(state) {
			return state.materials.length > 0;
		},
	},

	mutations: {
		loadMaterials(state, payload) {
			state.materials = payload;
		},
		createMaterial(state, payload) {
			state.materials.push(payload);
		},
		deleteMaterial(state, payload) {
			const material = state.materials.findIndex((material) => material._id === payload.id);
			state.materials.splice(material, 1);
		},
	},

	actions: {
		// ---------------------------------------------CREATE NEW MATERIAL------------------------------
		async createMaterial(context, payload) {
			const newMaterial = {
				name: payload.name,
				type: payload.type,
				coating: payload.coating,
				category: payload.category,
				description: payload.description,
			};
			try {
				const response = await axios.post(process.env.VUE_APP_BACKEND_URI + '/api/v1/materials', newMaterial, {
					headers: { Authorization: `Bearer ${store.state.authModule.token}` },
				});
				newMaterial._id = response.data.data._id;
				context.commit('createMaterial', newMaterial);
				return response.data.data._id;
			} catch (error) {
				if (error.response) {
					// The request was made and the server responded with a status code that falls out of the range of 2xx
					console.log(error.response.data);
					return error.response.data;
				} else if (error.request) {
					// The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
					console.log(error.response.data);
				} else {
					// Something happened in setting up the request and triggered an Error
					console.log('Error', error.message);
				}
			}
		},

		// ---------------------------------------------FETCH ALL MATERIALS------------------------------
		async loadMaterials(context) {
			try {
				const materials = await axios.get(process.env.VUE_APP_BACKEND_URI + '/api/v1/materials');
				context.commit('loadMaterials', materials.data.data);
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
		// ---------------------------------------------DELETE MATERIAL------------------------------
		async deleteMaterial(context, payload) {
			try {
				await axios.delete(process.env.VUE_APP_BACKEND_URI + `/api/v1/materials/${payload.id}`, {
					headers: { Authorization: `Bearer ${store.state.authModule.token}` },
				});
				context.commit('deleteMaterial', { id: payload.id });
				return;
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
		// ---------------------------------------------CREATE NEW MATERIAL ITEM-------------------------
		async createNewMaterialItem(context, payload) {
			try {
				const newMaterialItem = await axios.post(
					process.env.VUE_APP_BACKEND_URI + `/api/v1/materials/${payload.materialId}/item`,
					payload,
					{
						headers: { Authorization: `Bearer ${store.state.authModule.token}` },
					}
				);
				return newMaterialItem;
			} catch (error) {
				if (error.response) {
					return error.response.data;
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
		// ---------------------------------------------FETCH SPECIFIC MATERIAL ITEMS--------------------
		async fetchMaterialItems(context, payload) {
			try {
				const materialItems = await axios.get(process.env.VUE_APP_BACKEND_URI + `/api/v1/materials/${payload.id}/item`);
				return materialItems;
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
		// ---------------------------------------------DELETE MATERIAL ITEM----------------------------
		async deleteMaterialItem(context, payload) {
			try {
				await axios.delete(process.env.VUE_APP_BACKEND_URI + `/api/v1/material-items/${payload.id}`, {
					data: { id: payload.id },
					headers: { Authorization: `Bearer ${store.state.authModule.token}` },
				});
				return;
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
		// ---------------------------------------------UPDATE MATERIAL ITEM----------------------------
		async updateMaterialItem(context, payload) {
			try {
				await axios.put(process.env.VUE_APP_BACKEND_URI + `/api/v1/material-items/${payload.materialItemId}`, payload, {
					headers: { Authorization: `Bearer ${store.state.authModule.token}` },
				});
				return;
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.response.data);
				} else {
					console.log('Error', error.message);
				}
			}
		},
	},
};
