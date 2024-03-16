<template>
  <div class="flex justify-center items-center h-[100svh]">
    <form
      class="w-full max-w-sm h-[60%] p-7 py-10 backdrop-blur-3xl flex flex-col rounded-xl justify-center bg-white bg-opacity-15"
      @submit.prevent="handleSubmit" :class="isLogin ? 'max-h-80' : 'h-[80%] max-h-96'">
      <div v-if="!isLogin" class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" id="username" v-model="username"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring  focus:border-blue-300" required>
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
        class="w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">{{
        isLogin ? 'Login' : 'Sign Up' }}</button>

      <div class="flex gap-2">
        <span>{{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}</span>
        <p class="cursor-pointer" @click="changeForm">{{ isLogin ?
        'Sign Up' : 'Login' }}</p>
      </div>

    </form>
  </div>
</template>

<script setup>
import axiosInstance from '../config/axios';
import { useRouter } from 'vue-router';
import { ref, } from 'vue';
import { useStore } from 'vuex';

const isLogin = ref(true);
const username = ref('');
const email = ref('');
const password = ref('');
const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  if (isLogin.value) await login();
  else await signup();
};

const signup = async () => {
  try {
    console.log("signup call");
    const { data } = await axiosInstance.post('/users/signup', { userName: username.value, email: email.value, password: password.value });
    store.commit('setUser', data.user);
    router.push('/home');
  } catch (error) {
    alert(error.message)
    console.error(error);
  }
};

const login = async () => {
  try {
    const { data } = await axiosInstance.post('users/signin', { email: email.value, password: password.value });
    sessionStorage.setItem('token', data.token);
    store.commit('setUser', data.user);
    router.push('/home');
  } catch (e) {
    alert('server error');
    console.log(e);
  }
};

const changeForm = () => {
  isLogin.value = !isLogin.value;
};
</script>