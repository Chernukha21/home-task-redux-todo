export async function getWeather() {
    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current=temperature_2m,wind_speed_10m&timezone=auto',
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather');
    }

    return response.json();
}