<template>
	<header class="flex items-center h-16 border-b-2 mx-10 mb-3 ">
		<div class="flex items-center justify-between w-1/3">
			<h1 class="text-2xl font-bold">Materials</h1>
			<router-link
				v-if="roleCanUse"
				to="/materials/new"
				class="border p-2 bg-primaryColor text-white mr-19 hover:bg-secondaryColor"
			>
				Create Material
			</router-link>
		</div>
	</header>
	<div class="max-h-withoutNav flex">
		<section class="scrol px-10 w-1/3 overflow-y-auto">
			<ul>
				<li class="sticky top-0 z-10 flex bg-primaryColor text-white p-3 h-16 items-center">
					<div class="w-1/4 text-lg">Name</div>
					<div class="w-1/4 text-lg">Coating</div>
					<div class="w-1/4 text-lg">Type</div>
					<div class="w-1/4 text-lg">Category</div>
				</li>
				<Material
					v-for="material in allMaterials"
					:key="material._id"
					:id="material._id"
					:name="material.name"
					:coating="material.coating"
					:category="material.category"
					:type="material.type"
					@click="selected = material._id"
					:class="{ 'bg-secondaryColor': material._id == selected }"
				></Material>
			</ul>
			<div class="w-full" v-if="allMaterials.length < 1">
				<p>No materials created. Create your first material!</p>
			</div>
		</section>
		<section class="scroll w-2/3 px-10 overflow-y-auto">
			<div class="min-h-withoutNav flex border border-gray-300  shadow-2xl" v-if="materialIsSelected">
				<div class="m-auto">
					<p class="text-center text-2xl">No material selected</p>
					<p class="text-center">please select material to see details</p>
				</div>
			</div>
			<router-view v-if="materialsLoaded"></router-view>
		</section>
	</div>
</template>

<script>
import Material from '../components/materials/Material.vue';

export default {
	components: {
		Material,
	},
	data() {
		return {
			selected: undefined,
		};
	},
	computed: {
		materialIsSelected() {
			return this.$route.fullPath === '/materials';
		},
		allMaterials() {
			return this.$store.getters['materials/allMaterials'];
		},
		materialsLoaded() {
			return this.$store.getters['materials/materialsLoaded'];
		},
		roleCanUse() {
			const role = this.$store.getters['authModule/role'];
			if (role === 'owner' || role === 'admin') {
				return true;
			} else {
				return false;
			}
		},
	},
	created() {
		this.$store.dispatch('materials/loadMaterials');
	},
};
</script>

<style scoped>
/* .content-container {
	max-height: calc(100vh - 8rem);
} */

/* Hide scrollbar for Chrome, Safari and Opera */
/* .scrol::-webkit-scrollbar {
		display: none;
	} */

/* Hide scrollbar for IE, Edge and Firefox */
/* .scrol { */
/* IE and Edge */
/* -ms-overflow-style: none; */
/* Firefox */
/* scrollbar-width: none; */
/* } */
</style>
