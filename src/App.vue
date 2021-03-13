<template>
	<div>
		<the-header></the-header>
		<router-view></router-view>
	</div>
</template>

<script>
// @ is an alias to /src
import TheHeader from '@/components/TheHeader.vue';

export default {
	components: {
		TheHeader,
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

:root {
	--primary: #006963;
	--secondary: #20ba77;
}

* {
	font-family: 'Rubik', sans-serif;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
</style>
