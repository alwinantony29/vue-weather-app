<template>
    <div class="flex font-semibold gap-3 h-[38svh] mt-5 lg:mt-10 lg:flex-row flex-col">
        <div class=" shadow lg:w-3/4 p-3 flex flex-col h-[1] rounded bg-white bg-opacity-20 justify-between">
            <div class="flex justify-between items-center">
                <p class="lg:text-2xl">{{ todaysWeather.date }}</p>
                <img :src="getWeatherIconUrl(todaysWeather.weather.weather[0].icon)" alt="weather"
                    class="w-12 h-12 mr-[-10px]">
            </div>
            <div class="flex justify-between mt-2 items-end w-full">
                <div class="flex flex-col gap-2">
                    <p class="text-6xl lg:text-7xl">{{ Math.round(dailyWeather[0].main.temp) }} ℃</p>
                    <p>Feels like {{ Math.round(dailyWeather[0].main.feels_like) }}℃</p>
                    <p>{{ location }}</p>
                    <p>{{ DateTime.now().toFormat('EEE dd MMM h mma ') }}</p>
                </div>
                <div class="text-right items-end flex flex-col gap-2">
                    <button class="bg-white bg-opacity-20 w-8 h-8 text-xl text-center rounded-full "
                        @click="toggleSaveLocation">
                        <i v-if="isSaved" class="fa-solid fa-plus"></i>
                        <i v-else class="fa-solid fa-check"></i>
                    </button>
                    <p class="text-lg mt-1 capitalize ">{{ dailyWeather[0].weather[0].description }}</p>
                    <p class="text-sm mt-1">Humidity: {{ dailyWeather[0].main.humidity }}%</p>
                    <p class="text-sm">Wind: {{ dailyWeather[0].wind.speed }} km/h</p>
                </div>
            </div>
        </div>
        <div v-for="weatherData in Object.values(categorizedWeather).slice(1)" :key="weatherData.date"
            class="h-[1] shadow lg:w-1/6 rounded bg-white bg-opacity-20 p-3 flex lg:flex-col justify-between items-center">
            <p class="w-10 ">{{ weatherData?.date }}</p>
            <p class="text-sm w-20 text-center capitalize">{{ weatherData?.weather?.weather[0].description }}</p>
            <img :src="getWeatherIconUrl(weatherData?.weather?.weather[0].icon)" alt="weather"
                class="w-12 h-12 order-last lg:order-first">
            <p>{{ Math.round(weatherData?.weather?.main?.temp) }} ℃</p>

        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import { DateTime } from "luxon";
import { getWeatherIconUrl, getWeatherOfSameTime } from '../utils';

const props = defineProps({
    weatherForecast: {
        type: Object,
        required: true
    }
});
const isSaved = ref(false)
const categorizedWeather = ref({});
const todaysWeather = ref({});
const weatherForecast = ref({});
const location = ref('');
const dailyWeather = ref(null);

watchEffect(() => {
    weatherForecast.value = props.weatherForecast
    location.value = props.weatherForecast.location || `${props.weatherForecast.city.name} ${props.weatherForecast.city.country}`;
    dailyWeather.value = props.weatherForecast?.list

    categorizedWeather.value = dailyWeather.value.reduce((acc, curr) => {
        let isToday = false
        const date = DateTime.fromFormat(curr.dt_txt, 'yyyy-MM-dd HH:mm:ss');
        if (date.hasSame(DateTime.now(), 'day')) isToday = true
        const day = date.startOf('day');
        if (!acc[day]) {
            acc[day] = { date: isToday ? 'Today' : day.toFormat('EEE'), weathers: [] };
        }
        acc[day].weathers.push(curr);
        return acc;
    }, {})

    categorizedWeather.value = getWeatherOfSameTime(categorizedWeather.value)
    todaysWeather.value = Object.values(categorizedWeather.value)[0]

})


// const location = weatherForecast.value.location || `${weatherForecast.value.city.name} ${weatherForecast.value.city.country}`




const toggleSaveLocation = () => {
    isSaved.value = !isSaved.value
}

</script>
