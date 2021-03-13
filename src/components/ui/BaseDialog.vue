<template>
	<teleport to="body">
		<div v-if="show" @click="tryClose" class="fixed inset-0 h-screen w-full bg-gray-900 bg-opacity-60 z-10"></div>
		<dialog
			open
			v-if="show"
			class="fixed w-1/3 left-50% top-50% transform -translate-y-1/2 -translate-x-1/2 z-30 p-3 space-y-3 shadow-2xl"
		>
			<header class="flex flex-row justify-center items-center h-14 bg-primaryColor">
				<slot name="header">
					<h1 class="text-white text-xl">{{ title }}</h1>
				</slot>
			</header>
			<section class="flex items-center h-60 text-lg">
				<slot></slot>
			</section>
			<menu class="flex flex-row justify-between">
				<button class="p-2 bg-primaryColor text-white hover:bg-red-700" @click="accept">Delete</button>
				<button class="p-2 bg-primaryColor text-white hover:bg-secondaryColor" @click="tryClose">Cancel</button>
			</menu>
		</dialog>
	</teleport>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			requred: true,
		},
	},
	emits: ['close', 'accept'],
	methods: {
		tryClose() {
			this.$emit('close');
		},
		accept() {
			this.$emit('accept');
		},
	},
};
</script>
