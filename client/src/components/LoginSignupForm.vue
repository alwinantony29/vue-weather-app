<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-full max-w-sm" @submit.prevent="isLogin ? login : signup">
      <div v-if="!isLogin" class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input type="text" id="username" v-model="username"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" v-model="email"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required
          autocomplete="email">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" id="password" v-model="password"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required
          autocomplete="current-password">
      </div>
      <button type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">{{
      isLogin ? 'Login' : 'Sign Up' }}</button>
      <span>{{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}<p @click="changeForm">{{ isLogin ?
      'Sign Up' : 'Login' }}</p></span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async signup() {
      try {
        console.log("signup call")
        // Make HTTP request to signup endpoint
        // Redirect to dashboard after successful signup
      } catch (error) {
        console.error(error);
        // Display error message to user
      }
    },
    async login() {
      try {
        console.log('login call')
      } catch (e) {

      }
    },
    changeForm() {
      this.isLogin = !this.isLogin
    },

  }
}
</script>