<template>
	<form @submit.prevent="submitForm" class="p-3 relative w-1/3 mx-auto mt-28 border border-gray-300 shadow-md">
		<h1 class="text-xl text-white p-3 mb-5 text-center bg-primaryColor">{{ headerCaption }} item for {{ name }}</h1>
		<div class="mb-2">
			<label for="gramage" class="block font-bold"
				>Grammage ( g/m<sup>2</sup> )
				<span v-if="!grammage.isValid" :class="errorTextClass">{{ grammage.errorText }}</span></label
			>
			<p v-if="this.mode === 'editItem'" class="text-xl font-bold">
				<span class="text-secondaryColor">{{ editGrammage }}</span>
			</p>
			<p v-if="this.mode === 'createItem'">
				<input
					type="number"
					id="gramage"
					class="block border w-full py-1 px-2 focus:outline-none"
					:class="[!grammage.isValid ? errorClass : '']"
					min="1"
					v-model.number="grammage.val"
				/>
			</p>
		</div>

		<div class="mb-2">
			<label for="thickness" class="block font-bold"
				>Thickness ( <span>&#181;</span> )
				<span v-if="!thickness.isValid" :class="errorTextClass">Enter material thickness</span></label
			>
			<input
				type="number"
				id="thickness"
				class="block border w-full py-1 px-2 focus:outline-none"
				:class="[!thickness.isValid ? errorClass : '']"
				min="1"
				v-model.number="thickness.val"
			/>
		</div>

		<div class="mb-2">
			<label for="foldingSchemas" class="block font-bold"
				>Folding Schemas <span v-if="this.mode === 'createItem'" class="text-xs font-thin">(Optional)</span></label
			>
			<ul class="block">
				<li v-for="(schema, index) in foldingSchemas" :key="index" class="my-2 flex justify-between border px-2 py-1">
					<p>{{ schema }}</p>
					<button @click.prevent="removeSchema(index)" class="ml-3  focus:outline-none">&times;</button>
				</li>
			</ul>
			<div class="flex flex-row my-2">
				<input
					type="string"
					id="foldingSchemas"
					placeholder="i.e. F32-7"
					class="flex-auto px-2 py-1 border focus:outline-none"
					autocomplete="off"
					v-model.trim="currentSchema"
				/>
				<button
					class="px-2 bg-primaryColor text-white focus:outline-none hover:bg-secondaryColor"
					@click.prevent="addFoldingShema"
				>
					Add Schema
				</button>
			</div>
		</div>

		<div class="mb-5">
			<h3 class="font-bold">
				Availabe Processing
				<span v-if="!availableProcessing.isValid" :class="errorTextClass">Select atleast one processing</span>
			</h3>
			<div class="flex items-center">
				<input type="checkbox" id="sewn" value="sewn" v-model="availableProcessing.val" />
				<label for="sewn" class="ml-2">Sewn</label>
			</div>
			<div class="flex items-center">
				<input type="checkbox" id="hotmelt" value="hotmelt" v-model="availableProcessing.val" />
				<label for="hotmelt" class="ml-2">Hotmelt</label>
			</div>
			<div class="flex items-center">
				<input type="checkbox" id="pur" value="pur" v-model="availableProcessing.val" />
				<label for="pur" class="ml-2">PUR</label>
			</div>
			<div class="flex items-center">
				<input type="checkbox" id="dispersion" value="dispersion" v-model="availableProcessing.val" />
				<label for="dispersion" class="ml-2">Dispersion</label>
			</div>
		</div>

		<div class="flex justify-between">
			<button class="p-2 bg-primaryColor text-white focus:outline-none hover:bg-secondaryColor">
				{{ buttonCaption }}
			</button>
			<button class="p-2 bg-primaryColor text-white hover:bg-secondaryColor" @click.prevent="returnBack">Cancel</button>
		</div>
	</form>
</template>

<script>
export default {
	props: [
		'mode',
		'materialId',
		'materialItemId',
		'name',
		'editGrammage',
		'editThickness',
		'editFoldingSchemas',
		'editAvailableProcessing',
	],
	data() {
		return {
			errorClass: `border-2 border-red-300`,
			errorTextClass: `font-thin text-red-500 text-xs`,
			formIsValid: true,
			currentSchema: null,
			grammage: {
				val: null,
				isValid: true,
				alreadyExists: false,
				errorText: '',
			},
			thickness: {
				val: null,
				isValid: true,
			},
			foldingSchemas: [],
			availableProcessing: {
				val: [],
				isValid: true,
			},
		};
	},
	computed: {
		headerCaption() {
			if (this.mode === 'editItem') {
				return 'Update';
			} else {
				return 'Create';
			}
		},
		buttonCaption() {
			if (this.mode === 'editItem') {
				return 'Update Item';
			} else {
				return 'Create Item';
			}
		},
	},
	methods: {
		returnBack() {
			this.$router.back();
		},

		addFoldingShema() {
			if (this.currentSchema !== null || this.currentSchema.replace(/\s/g, '') !== '') {
				this.foldingSchemas.push(this.currentSchema);
				this.currentSchema = null;
			} else {
				return;
			}
		},

		removeSchema(index) {
			// norādam kuru indexa elementu gribam izdzēst un cik daudz viņus izdzēst. Mēs gribam tikai 1 izdzēst.
			this.foldingSchemas.splice(index, 1);
		},

		validateForm() {
			this.formIsValid = true;
			if (this.grammage.val == null || this.grammage.val == '') {
				this.grammage.isValid = false;
				this.grammage.errorText = 'Enter material weight';
				this.formIsValid = false;
			} else if (this.grammage.alreadyExists) {
				this.grammage.isValid = false;
				this.grammage.errorText = 'This weight already exists for this material';
				this.formIsValid = false;
			} else {
				this.grammage.isValid = true;
			}

			if (this.thickness.val == null || this.thickness.val == '') {
				this.thickness.isValid = false;
				this.formIsValid = false;
			} else {
				this.thickness.isValid = true;
			}

			if (this.availableProcessing.val.length === 0) {
				this.availableProcessing.isValid = false;
				this.formIsValid = false;
			} else {
				this.availableProcessing.isValid = true;
			}
		},

		async submitForm() {
			if (this.mode === 'createItem') {
				this.validateForm();
				if (!this.formIsValid) {
					return;
				}

				const newMaterialItem = await this.$store.dispatch('materials/createNewMaterialItem', {
					grammage: this.grammage.val,
					thickness: this.thickness.val,
					foldingSchemas: this.foldingSchemas,
					availableProcessing: this.availableProcessing.val,
					materialId: this.materialId,
				});

				if (newMaterialItem.error === 'Material already got this grammage') {
					this.grammage.isValid = false;
					this.grammage.errorText = 'Material already got this grammage';
				} else {
					this.$router.replace(`/materials/${this.materialId}`);
				}
			} else if (this.mode === 'editItem') {
				await this.$store.dispatch('materials/updateMaterialItem', {
					grammage: this.editGrammage,
					thickness: this.thickness.val,
					foldingSchemas: this.foldingSchemas,
					availableProcessing: this.availableProcessing.val,
					materialItemId: this.materialItemId,
				});
				this.$router.back();
			}
		},
	},
	created() {
		if (this.editThickness) {
			this.thickness.val = this.editThickness;
		}
		if (this.editFoldingSchemas) {
			this.foldingSchemas = this.editFoldingSchemas;
		}
		if (this.editAvailableProcessing) {
			this.availableProcessing.val = this.editAvailableProcessing;
		}
	},
};
</script>
