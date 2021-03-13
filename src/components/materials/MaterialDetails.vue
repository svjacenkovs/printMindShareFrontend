<template>
	<base-dialog
		:show="!!warning"
		title="Do you really want to delete this material?"
		@close="handleWarningDialog('close')"
		@accept="deleteMaterial"
	>
		<h1>
			This action is irreversible and will delete all
			<span class="text-primaryColor font-bold">{{ selectedMaterial.name }}</span> items! Are you really sure?
		</h1>
	</base-dialog>
	<div class="container">
		<header class="flex text-white p-3 bg-primaryColor justify-between h-16">
			<div class="flex items-end">
				<h1 class="text-2xl pr-2">{{ selectedMaterial.name }}</h1>
				<p class="pr-2 text-secondaryColor">{{ selectedMaterial.coating }}</p>
				<p class=" text-secondaryColor">{{ selectedMaterial.type }}</p>
			</div>
			<div>
				<button
					v-if="roleCanDelete"
					class="border p-2 bg-primaryColor text-white focus:outline-none hover:bg-red-700"
					@click="handleWarningDialog('open')"
				>
					Delete Material
				</button>
			</div>
		</header>
		<div class="p-3">
			<h1 class="font-bold">Description:</h1>
			<p class="text-justify">{{ selectedMaterial.description }}</p>
		</div>
		<table class="table-fixed border-collapse my-2 w-full">
			<thead>
				<tr class="border">
					<th class="p-3 text-left bg-gray-300 w-16">g/m<sup>2</sup></th>
					<th class="p-3 text-left bg-gray-300 border-l-2 w-16">
						<span>&#181;</span>
					</th>
					<th class="p-3 text-left bg-gray-300 border-l-2 w-20">Reports</th>
					<th class="p-3 text-left bg-gray-300 border-l-2 w-3/5">
						Folding Schemas
					</th>
					<th class="p-3 text-left bg-gray-300 border-l-2 w-2/5">
						Available Processing
					</th>
					<th v-if="roleCanUse" class="p-3 text-left bg-gray-300 border-l-2 w-16">
						<router-link
							:to="{ name: 'newMaterialItem', params: { mode: 'createItem', name: this.selectedMaterial.name } }"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								stroke="currentColor"
								fill="none"
								class="cursor-pointer stroke-current text-black hover:text-secondaryColor"
							>
								<title>Add new item</title>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
								/>
							</svg>
						</router-link>
					</th>
				</tr>
			</thead>
			<tbody>
				<item
					v-for="matItem in materialItems"
					:key="matItem._id"
					:material-item-id="matItem._id"
					:material-name="selectedMaterial.name"
					:grammage="matItem.grammage"
					:thickness="matItem.thickness"
					:folding-schemas="matItem.foldingSchemas"
					:available-processing="matItem.availableProcessing"
					@materialItemDeleted="deleteMaterialItem"
				></item>
			</tbody>
		</table>
		<div class="w-full" v-if="materialItems.length < 1">
			<p>This material has no items yet. Add first item by pressing folder icon on right side.</p>
		</div>
	</div>
</template>

<script>
import Item from './Item.vue';

export default {
	components: {
		Item,
	},
	//Props materialId nāk no routera.
	props: ['materialId'],
	data() {
		return {
			selectedMaterial: [],
			materialItems: [],
			warning: null,
		};
	},
	computed: {
		createNewMaterial() {
			return `/materials/${this.materialId}/new`;
		},
		roleCanUse() {
			const role = this.$store.getters['authModule/role'];
			if (role === 'owner' || role === 'admin') {
				return true;
			} else {
				return false;
			}
		},
		roleCanDelete() {
			const role = this.$store.getters['authModule/role'];
			if (role === 'owner') {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		async fetchMaterialData(id) {
			const material = this.$store.getters['materials/allMaterials'].find((material) => material._id === id);
			material === undefined
				? this.$router.replace({ name: 'notFound', params: { catchAll: this.$route.params.materialId } })
				: (this.selectedMaterial = material);
			const materialItems = await this.$store.dispatch('materials/fetchMaterialItems', { id });
			this.materialItems = materialItems.data.data;
		},
		async deleteMaterial() {
			await this.$store.dispatch('materials/deleteMaterial', { id: this.materialId });
			this.$router.replace(`/materials`);
		},
		deleteMaterialItem(itemId) {
			const index = this.materialItems.findIndex((el) => el._id === itemId);
			this.materialItems.splice(index, 1);
		},
		handleWarningDialog(action) {
			if (action === 'close') {
				this.warning = null;
			} else if (action === 'open') {
				this.warning = true;
			} else {
				return;
			}
		},
	},
	watch: {
		materialId(newId) {
			this.fetchMaterialData(newId);
		},
	},
	created() {
		this.fetchMaterialData(this.materialId);
	},
};
</script>
