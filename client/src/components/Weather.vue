<template>
    <div class="flex gap-3 h-[35svh] mt-5 md:mt-10 md:flex-row flex-col">
        <div class=" shadow md:w-3/4 p-3 flex flex-col h-[1] rounded bg-white bg-opacity-20 justify-between">
            <div class="flex justify-between items-center">
                <p>{{ todaysWeather.date }}</p>
                <img :src="getWeatherIconUrl(todaysWeather.weather.weather[0].icon)" alt="weather"
                    class="w-12 h-12 mr-[-10px]">
            </div>
            <div class="flex justify-between mt-2 items-end w-full">
                <div class="flex flex-col gap-2">
                    <p class="text-6xl">{{ Math.round(dailyWeather[0].main.temp) }} ℃</p>
                    <p>Feels like {{ Math.round(dailyWeather[0].main.feels_like) }}℃</p>
                    <p>{{ location }}</p>
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
            class="h-[1] shadow md:w-1/6 rounded bg-white bg-opacity-20 p-3 flex md:flex-col justify-between items-center">
            <p class="w-10">{{ weatherData?.date }}</p>
            <p class="text-sm w-20 text-center capitalize">{{ weatherData?.weather?.weather[0].description }}</p>
            <img :src="getWeatherIconUrl(weatherData?.weather?.weather[0].icon)" alt="weather"
                class="w-12 h-12 order-last md:order-first">
            <p>{{ Math.round(weatherData?.weather?.main?.temp) }} ℃</p>

        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { DateTime } from "luxon";
import { getWeatherIconUrl, getWeatherOfSameTime } from '../utils';

const props = defineProps({
    weatherForecast: {
        type: Object,
        required: true
    }
});
const isSaved = ref(false)

const { weatherForecast } = props
const location = weatherForecast.location || `${weatherForecast.city.name} ${weatherForecast.city.country}`
const dailyWeather = weatherForecast?.list

let categorizedWeather = dailyWeather.reduce((acc, curr) => {
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
categorizedWeather = getWeatherOfSameTime(categorizedWeather)
const todaysWeather = Object.values(categorizedWeather)[0]

const toggleSaveLocation = () => {
    isSaved.value = !isSaved.value
}

</script>
