<template>
	<form @submit.prevent="submitForm" class="p-3 relative w-96 mx-auto mt-28 border border-gray-300 shadow-md space-y-2">
		<h1 class="text-xl text-white p-3 mb-5 text-center bg-primaryColor">
			New Material
		</h1>
		<div>
			<label for="name" class="block font-bold"
				>Name <span v-if="!name.isValid" :class="errorTextClass">{{ name.errorText }}</span></label
			>
			<input
				class="block border w-full py-1 px-2 focus:outline-none"
				:class="[!name.isValid ? errorClass : '']"
				type="text"
				id="name"
				autocomplete="off"
				v-model.trim="name.val"
			/>
		</div>
		<div>
			<label for="type" class="block font-bold"
				>Type<span v-if="!type.isValid" :class="errorTextClass"> Select material type</span></label
			>
			<select
				name="type"
				id="type"
				class="w-full border py-1 px-2 focus:outline-none"
				:class="[!type.isValid ? errorClass : '']"
				v-model.trim="type.val"
			>
				<option value="paper">Paper</option>
				<option value="board">Board</option>
				<option value="plastic">Plastic</option>
				<option value="cloth">Cloth</option>
				<option value="leather">Leather</option>
			</select>
		</div>
		<div>
			<label for="coating" class="block font-bold"
				>Coating<span v-if="!coating.isValid" :class="errorTextClass"> Select material coating</span></label
			>
			<select
				name="type"
				id="coating"
				class="w-full border py-1 px-2 focus:outline-none"
				:class="[!coating.isValid ? errorClass : '']"
				v-model.trim="coating.val"
			>
				<option value="coated">coated</option>
				<option value="uncoated">uncoated</option>
				<option value="undefined">undefined</option>
			</select>
		</div>
		<div>
			<label for="category" class="block font-bold"
				>Category<span v-if="!category.isValid" :class="errorTextClass"> Describe material category</span></label
			>
			<input
				type="text"
				id="category"
				autocomplete="off"
				class="block border w-full py-1 px-2 focus:outline-none"
				:class="[!category.isValid ? errorClass : '']"
				v-model.trim="category.val"
			/>
		</div>
		<div class="mb-5">
			<label for="description" class="block font-bold"
				>Description <span class="text-xs font-thin">(optional)</span></label
			>
			<textarea
				rows="5"
				id="description"
				class="block border w-full py-1 px-2 focus:outline-none"
				v-model.trim="description"
			></textarea>
		</div>
		<div class="flex justify-between">
			<button class="border p-2 bg-primaryColor text-white focus:outline-none hover:bg-secondaryColor">
				Create Material
			</button>
			<button
				class="border p-2 bg-primaryColor text-white focus:outline-none hover:bg-secondaryColor"
				@click.prevent="returnBack"
			>
				Cancel
			</button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			errorClass: `border-2 border-red-300`,
			errorTextClass: `font-thin text-red-500 text-xs`,
			formIsValid: true,
			name: {
				val: '',
				isValid: true,
				alreadyExists: false,
				errorText: '',
			},
			type: {
				val: '',
				isValid: true,
			},
			coating: {
				val: '',
				isValid: true,
			},
			category: {
				val: '',
				isValid: true,
			},
			description: '',
		};
	},
	methods: {
		validateForm() {
			this.formIsValid = true;

			if (this.name.val === '') {
				this.name.isValid = false;
				this.formIsValid = false;
				this.name.errorText = 'Enter material name';
			} else if (this.name.alreadyExists) {
				this.name.isValid = false;
				this.formIsValid = false;
				this.name.errorText = 'Material with this name already exists';
			} else {
				this.name.isValid = true;
			}

			if (this.type.val === '') {
				this.type.isValid = false;
				this.formIsValid = false;
			} else {
				this.type.isValid = true;
			}

			if (this.coating.val === '') {
				this.coating.isValid = false;
				this.formIsValid = false;
			} else {
				this.coating.isValid = true;
			}

			if (this.category.val === '') {
				this.category.isValid = false;
				this.formIsValid = false;
			} else {
				this.category.isValid = true;
			}
		},
		async submitForm() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			const newMaterial = await this.$store.dispatch('materials/createMaterial', {
				name: this.name.val,
				type: this.type.val,
				coating: this.coating.val,
				category: this.category.val,
				description: this.description,
			});

			if (newMaterial.error === 'Duplicate field value entered') {
				this.name.isValid = false;
				this.name.errorText = 'Material with this name already exists';
			} else {
				this.$router.replace(`/materials/${newMaterial}`);
			}
		},
		returnBack() {
			this.$router.back();
		},
	},
};
</script>
