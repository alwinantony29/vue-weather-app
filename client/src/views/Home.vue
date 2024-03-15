<template>
    <main class="text-white">
        <div class="h-12 flex relative bg-white bg-opacity-20 rounded  w-full px-5 py-3">
            <input type="text" placeholder="Search for a city or state"
                class="w-full text-white bg-transparent border-b border-white focus:border-opacity-70 focus:outline-none"
                v-model="query" @input="getSearchResults">
            <ul class="absolute top-[2.5rem] text-white w-full left-0 py-3 px-5 ">
                <p v-if="searchError">Sorry, Something went wrong please try again</p>
                <li v-for="suggestion in querySuggestion" :key="suggestion" class="cursor-pointer"
                    @click="handleListClick(suggestion)">
                    {{ suggestion }}
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
// import SearchBar from "../components/SearchBar.vue";
import axios from "axios";

const query = ref('')
const queryTimeout = ref(null)
const querySuggestion = ref(null)
const searchError = ref(null)
const limit = 5
const openWeatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (searchError.value) searchError.value = false
        if (query.value === "") {
            querySuggestion.value = []
            return
        }

        try {
            const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=${limit}&appid=${openWeatherApiKey}`)
            querySuggestion.value = new Set(res.data.map(location => {
                let suggestion = ''
                if (location.name) suggestion += (location.name)
                if (location.state) suggestion += (", " + location.state)
                if (location.country) suggestion += (", " + location.country)
                return suggestion
            }))
        } catch (error) {
            console.error(error);
            searchError.value = true
        }
        return

    }, 300)
}
const handleListClick = (suggestion) => {
    query.value = suggestion
    getSearchResults()
}

</script>