<template>
    <main class="text-white p-10">
        <div class="h-12 flex relative  bg-opacity-20 rounded w-full">

            <div class="w-full">
                <input type="text" placeholder="Search for a city or state"
                    class="w-full p-2 text-white bg-transparent border-b border-white focus:border-opacity-70 focus:outline-none"
                    v-model="query" @input="getSearchSuggestions">
                <i v-if="!query" class="fa-solid fa-location-crosshairs absolute right-1 top-3"
                    @click="getCurrentLocationWeather"></i>
                <i v-else @click="clearSearch" class="fa-solid fa-xmark absolute top-3 right-1"></i>
            </div>
            <p v-if="errorMessage"
                class="text-red-500 absolute top-14 p-2 left-0 w-full bg-white bg-opacity-25 backdrop-blur-md">{{
                        errorMessage }}</p>
            <ul v-if="querySuggestions.length"
                class="absolute bg-white bg-opacity-30 backdrop-blur-md  top-[3.5rem] text-white w-full left-0 ">
                <p v-if="!errorMessage && querySuggestions?.length === 0 && query.trim()">No results match your search
                </p>

                <template v-else>
                    <li v-for="suggestion in querySuggestions" :key="suggestion"
                        class="cursor-pointer hover:backdrop-blur-2xl p-2" @click="handleListClick(suggestion)">
                        {{ suggestion }}
                    </li>
                </template>
            </ul>
        </div>
        <Weather v-if="weatherForecast && !errorMessage" :weatherForecast="weatherForecast" />
    </main>
</template>

<script setup>
import { computed, ref, } from "vue";
import axios from "axios";
import Weather from "../components/Weather.vue";
import { useStore } from "vuex";


const store = useStore();
const user = computed(() => store.getters.getUser);
const query = ref('')
const queryTimeout = ref(null)
const querySuggestions = ref([])
const limit = 5
const openWeatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
const currentWeatherLocation = ref(null)
const errorMessage = ref(null)
const weatherForecast = ref(null)
const defaultErrorMsg = 'Something went wrong please try again.'

const getSearchSuggestions = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (errorMessage.value) errorMessage.value = ''
        if (query.value === "") {
            querySuggestions.value = []
        } else
            try {
                const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=${limit}&appid=${openWeatherApiKey}`)

                querySuggestions.value = [...new Set(data.map(location => {
                    let suggestion = ''
                    if (location.name) suggestion += (location.name)
                    if (location.state) suggestion += (", " + location.state)
                    if (location.country) suggestion += (", " + location.country)
                    if (suggestion !== query.value)
                        return suggestion

                }))].filter(item => item)
                errorMessage.value = null
            } catch (error) {
                errorMessage.value = error.message || defaultErrorMsg
                console.log(errorMessage.value);
            }
    }, 300)
}
const getSearchResults = async () => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query.value}&appid=${openWeatherApiKey}&units=metric`)
        weatherForecast.value = data
        console.log(weatherForecast.value);
        errorMessage.value = null
    } catch (error) {
        errorMessage.value = error.message || defaultErrorMsg
    }
}
const clearSearch = () => {
    query.value = ''
    querySuggestions.value = []
    errorMessage.value = null

}
const handleListClick = (suggestion) => {
    query.value = suggestion
    currentWeatherLocation.value = suggestion
    querySuggestions.value = []
    getSearchResults()
}
async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                if (!position) alert('no pos')
                try {
                    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${openWeatherApiKey}&units=metric`)
                    console.log(data);
                    weatherForecast.value = data
                    errorMessage.value = null;
                } catch (error) {
                    console.log(error);
                    alert('error')
                }
            },
            error => {
                alert(error.message || 'Error')
                errorMessage.value = `Error: ${error.message}`;
            }
        );
    } else {
        errorMessage.value = 'Geolocation is not supported by this browser.';
    }
}

</script>