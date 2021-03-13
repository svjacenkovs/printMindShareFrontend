<template>
	<base-dialog
		:show="!!warning"
		title="Do you really want to delete this item?"
		@close="handleWarningDialog('close')"
		@accept="deleteMaterialItem"
	>
		<h1>
			This action is irreversible and will delete this item. Are you really sure?
		</h1>
	</base-dialog>
	<tr class="border hover:bg-gray-200">
		<td class="p-3 font-bold text-sm">{{ grammage }}</td>
		<td class="p-3 text-sm">{{ thickness }}</td>
		<td class="p-3 text-sm text-center"><a href="">(-)</a></td>
		<td class="p-3 text-sm">
			{{ foldingSchemas.toString() }}
		</td>
		<td class="p-3 text-sm">
			{{ availableProcessing.toString() }}
		</td>
		<td v-if="roleCanUse" class="p-3 flex text-sm">
			<router-link
				:to="{
					name: 'editMaterialItem',
					params: {
						mode: 'editItem',
						materialItemId: this.materialItemId,
						name: this.materialName,
						editGrammage: this.grammage,
						editThickness: this.thickness,
						editFoldingSchemas: this.foldingSchemas,
						editAvailableProcessing: this.availableProcessing,
					},
				}"
			>
				<svg
					width="20px"
					fill="none"
					viewBox="0 0 24 24"
					stroke="black"
					class="cursor-pointer stroke-current text-black hover:text-secondaryColor"
				>
					<title>Edit item</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>
			</router-link>
			<div v-if="roleCanDelete" class="ml-1 cursor-pointer" @click="handleWarningDialog('open')">
				<svg
					width="20px"
					fill="none"
					viewBox="0 0 24 24"
					stroke="black"
					class="cursor-pointer stroke-current text-black hover:text-red-600"
				>
					<title>Delete item</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</div>
		</td>
	</tr>
</template>

<script>
export default {
	props: ['materialItemId', 'materialName', 'grammage', 'thickness', 'foldingSchemas', 'availableProcessing'],
	emits: ['materialItemDeleted', 'edit'],
	data() {
		return {
			warning: null,
		};
	},
	computed: {
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
		deleteMaterialItem() {
			this.$store.dispatch('materials/deleteMaterialItem', { id: this.materialItemId });
			this.$emit('materialItemDeleted', this.materialItemId);
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
};
</script>
