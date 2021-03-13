<template>
	<header>
		<nav class="bg-primaryColor px-10 min-w-full h-12 flex justify-between items-stretch text-white">
			<div class="LEFT-NAV flex items-center">
				<router-link to="/" class="flex items-center space-x-1">
					<img src="../assets/shared-folder.svg" alt="logo" />
					<p>Print Mind Share</p>
				</router-link>
			</div>
			<div class="CENTER-NAV flex items-stretch">
				<router-link to="/materials" class="flex items-center px-2">MATERIALS</router-link>
				<router-link to="/paletizer" class="flex items-center px-2">PALLETIZER</router-link>
			</div>
			<div class="RIGHT-NAV flex items-stretch">
				<router-link v-if="!isLogedIn" to="/signup" class=" px-2 flex items-center">SIGN UP</router-link>
				<router-link v-if="!isLogedIn" to="/login" class="px-2 flex items-center">LOGIN</router-link>
				<router-link v-if="isLogedIn" to="/login" @click="logout" class="px-2 flex items-center">LOGOUT</router-link>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	computed: {
		isLogedIn() {
			return this.$store.getters['authModule/isAuthenticated'];
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('authModule/logout');
		},
	},
};
</script>

<style scoped>
.router-link-active {
	background-color: var(--secondary);
}
</style>
