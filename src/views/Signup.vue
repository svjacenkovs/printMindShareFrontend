<template>
	<form @submit.prevent="submitForm">
		<div class="wraper">
			<h1>Sign Up!</h1>
			<div class="input">
				<div class="icon-email"></div>
				<input type="text" placeholder="Enter name" v-model="name" />
			</div>
			<div class="input">
				<div class="icon-email"></div>
				<input type="text" placeholder="Enter email" v-model="email" />
			</div>
			<div class="input">
				<div class="icon-password"></div>
				<input type="password" placeholder="Enter password" v-model="password" />
			</div>
			<button>Sign Me Up!</button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			name: this.name,
			email: this.email,
			password: this.password,
		};
	},
	computed: {
		// userData() {
		//   return this.$store.getters["authModule/userData"];
		// },
	},
	methods: {
		submitForm() {
			this.$store.dispatch('authModule/signup', {
				email: this.email,
				password: this.password,
				name: this.name,
			});
		},
	},
};
</script>

<style scoped>
form {
	width: 100%;
	height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.wraper {
	min-width: 450px;
	padding: 15px;
	border-radius: 12px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
	padding: 2rem;
	margin: 2rem auto;
}
h1 {
	color: var(--primary);
	display: block;
	text-align: center;
	padding: 15px 0;
	margin-bottom: 20px;
}
button {
	margin-top: 30px;
	font-weight: bold;
	font-size: 100%;
	width: 100%;
	height: 45px;
	border-radius: 12px;
	border: hidden;
	background-color: var(--primary);
	color: white;
	letter-spacing: 3px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.45);
	transition: background-color 0.5s, transform 0.5s;
}
button:hover {
	transform: scale(1.02);
	background-color: var(--secondary);
	cursor: pointer;
}

input {
	font-size: 100%;
	padding-left: 40px;
	height: 40px;
	width: 100%;
	margin: 15px 0;
	border: hidden;
	border-bottom: 1px solid rgba(0, 0, 0, 0.342);
}

input,
button:focus {
	outline: none;
}

/* -------------------ICONS-------------------------- */
.input {
	position: relative;
}
.input .icon-email {
	position: absolute;
	padding: 0;
	width: 30px;
	height: 30px;
	background-image: url('../assets/email.png');
	background-position: left center;
	background-size: contain;
	background-repeat: no-repeat;
	top: 18px;
}
.input .icon-password {
	position: absolute;
	padding: 0;
	width: 30px;
	height: 30px;
	background-image: url('../assets/password.png');
	background-position: left center;
	background-size: contain;
	background-repeat: no-repeat;
	top: 18px;
}
</style>
