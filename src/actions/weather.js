import { createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../config/settings";
import axios from 'axios';

const initialState = {
    data: [],
    dataByDay: {},
    modal: false,
    loading: false,
    coordinates: {}
}

const groupByDay = (data) => {
    if (!data?.length) return
    const result = {};
    data.forEach(obj => {
        const date = obj.dt_txt.split(' ')[0];
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(obj);
    });
    return Object.values(result);
}

export const weather = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getMainForecast: (state, action) => ({ ...state, data: action.payload, dataByDay: groupByDay(action.payload?.list) }),
        setCoordinates: (state, action) => ({ ...state, coordinates: action.payload }),
        setLoading: (state, action) => ({ ...state, loading: action.payload }),
    }
})

export const getMainForecastAsync = (payload, onSuccess) => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${payload?.lat}&lon=${payload?.lon}&appid=${API_KEY}`, payload)

        dispatch(getMainForecast(data))

        if (onSuccess) onSuccess()
        if (data.payload) dispatch(setLoading(false))

    } catch(err) {
      alert(err)
    }
}

export const {
    getMainForecast,
    setCoordinates,
    setLoading
} = weather.actions

export default weather.reducer;