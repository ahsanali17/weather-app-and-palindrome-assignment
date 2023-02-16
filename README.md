# weather-app-and-palindrome-assignment
Comprised of 2 parts:
1. This application get the current weather of city and user can save that cities name and weather data to localStorage. 
2. There is also a palindrome form checker.

## The API can be found [here](https://openweathermap.org)

1. Geocoding: /geo/1.0/direct?q=${cityName}&limit=5&units=metric&appid=${WEATHER_API_KEY}
2. Weather: /data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}

## Instructions
Add the WEATHER_API_KEY to your .env file and remember to run npm install after git clone.

Deployed site can be found here: https://weather-app-and-palindrome-assignment.vercel.app/
