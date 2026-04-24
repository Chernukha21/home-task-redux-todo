import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherThunk } from '../../store/wetherSlice.js';

const WeatherWidget = () => {
    const dispatch = useDispatch();
    const { weather, isLoading, error } = useSelector((state) => state.weather);

    useEffect(() => {
        dispatch(getWeatherThunk());
    }, [dispatch]);

    if (isLoading) return <div>Loading weather...</div>;
    if (error) return <div>Weather error</div>;
    if (!weather) return null;
    console.log(weather)
    return (
        <div>
            Kyiv: {weather.current.temperature_2m}°C, wind {weather.current.wind_speed_10m} km/h
        </div>
    );
};

export default WeatherWidget;