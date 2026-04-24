import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeather } from '../api/weather.js';

const initialState = {
    weather: null,
    isLoading: false,
    error: null,
};

export const getWeatherThunk = createAsyncThunk(
    'weather/getWeather',
    async (_, thunkAPI) => {
        try {
            return await getWeather();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWeatherThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weather = action.payload;
            })
            .addCase(getWeatherThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default weatherSlice.reducer;