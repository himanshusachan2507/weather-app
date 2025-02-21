const apiKey = "d01035dca14f2bcbca38853755c08bdc"; // Replace with your OpenWeatherMap API key
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        function getWeather() {
            const city = document.getElementById("city-input").value;
            if (!city) {
                showError("Please enter a city name!");
                return;
            }

            fetch(apiUrl + city + `&appid=${apiKey}`)
                .then(response => {
                    if (!response.ok) throw new Error("City not found!");
                    return response.json();
                })
                .then(data => {
                    displayWeather(data);
                    updateBackgroundAndParticles(data.weather[0].main);
                })
                .catch(error => {
                    showError(error.message);
                });
        }

        function displayWeather(data) {
            const cityName = document.getElementById("city-name");
            const temperature = document.getElementById("temperature");
            const description = document.getElementById("description");
            const humidity = document.getElementById("humidity");
            const weatherIcon = document.getElementById("weather-icon");
            const dashboard = document.getElementById("weather-dashboard");
            const error = document.getElementById("error");

            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            weatherIcon.style.display = "block";

            error.style.display = "none";
            dashboard.classList.add("show");
        }

        function showError(message) {
            const error = document.getElementById("error");
            const dashboard = document.getElementById("weather-dashboard");

            error.textContent = message;
            error.style.display = "block";
            dashboard.classList.remove("show");
            clearParticles();
        }

        function updateBackgroundAndParticles(weather) {
            const body = document.body;
            clearParticles();

            switch (weather.toLowerCase()) {
                case "clear":
                    body.style.background = "linear-gradient(135deg, #ffcc00, #ff6600)";
                    createParticles("#fff", 20); // Sun-like particles
                    break;
                case "clouds":
                    body.style.background = "linear-gradient(135deg, #b0bec5, #546e7a)";
                    createParticles("#fff", 30); // Cloud-like particles
                    break;
                case "rain":
                    body.style.background = "linear-gradient(135deg, #0288d1, #01579b)";
                    createParticles("#00b0ff", 50); // Rain drops
                    break;
                case "snow":
                    body.style.background = "linear-gradient(135deg, #e0f7fa, #b0bec5)";
                    createParticles("#fff", 40); // Snowflakes
                    break;
                default:
                    body.style.background = "linear-gradient(135deg, #0d1b2a, #1b263b)";
                    createParticles("#00ffcc", 20);
            }
        }

        function createParticles(color, count) {
            const particlesDiv = document.getElementById("particles");
            for (let i = 0; i < count; i++) {
                const particle = document.createElement("div");
                particle.className = "particle";
                particle.style.background = color;
                particle.style.width = `${Math.random() * 5 + 2}px`;
                particle.style.height = particle.style.width;
                particle.style.left = `${Math.random() * 100}vw`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particlesDiv.appendChild(particle);
            }
        }

        function clearParticles() {
            const particlesDiv = document.getElementById("particles");
            particlesDiv.innerHTML = "";
        }