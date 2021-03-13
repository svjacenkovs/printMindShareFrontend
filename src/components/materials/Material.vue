<template>
	<li
		class="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-secondaryColor flex p-3 my-2 border border-gray-300 shadow-md cursor-pointer"
		@click="seeDetails"
	>
		<div class="w-1/4 font-bold overflow-hidden">{{ name }}</div>
		<div class="w-1/4 pl-3">{{ coating }}</div>
		<div class="w-1/4">{{ type }}</div>
		<div class="w-1/4 overflow-hidden">{{ category }}</div>
	</li>
</template>

<script>
export default {
	props: ['id', 'name', 'coating', 'category', 'type'],
	methods: {
		seeDetails() {
			this.isActive = true;
			this.$router.push(`/materials/${this.id}`);
		},
	},
};
</script>

<style scoped>
::-webkit-scrollbar {
	display: none;
}
</style>
