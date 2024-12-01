// API Key dan endpoint
const apiKey = '91f6f373fd60b291cadd60f97d6475c4'; // Ganti dengan API Key Anda dari OpenWeatherMap

// Daftar deskripsi cuaca dari OpenWeatherMap
const weatherDescriptions = {
  "clear sky": "Clear Sky",
  "few clouds": "Few Clouds",
  "scattered clouds": "Scattered Clouds",
  "broken clouds": "Broken Clouds",
  "overcast clouds": "Overcast Clouds",
  "shower rain": "Shower Rain",
  "light rain": "Light Rain",
  "moderate rain": "Moderate Rain",
  "heavy intensity rain": "Heavy Rain",
  "very heavy rain": "Very Heavy Rain",
  "extreme rain": "Extreme Rain",
  "freezing rain": "Freezing Rain",
  "light snow": "Light Snow",
  "snow": "Snow",
  "heavy snow": "Heavy Snow",
  "sleet": "Sleet",
  "shower sleet": "Shower Sleet",
  "mist": "Mist",
  "smoke": "Smoke",
  "haze": "Haze",
  "dust": "Dust",
  "fog": "Fog",
  "sand": "Sand",
  "ash": "Ash",
  "squall": "Squall",
  "tornado": "Tornado"
};

// Fungsi untuk mendapatkan cuaca berdasarkan input lokasi
function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const container = document.querySelector('.container');

  if (!city) {
    alert('Masukkan nama kota terlebih dahulu!');
    container.style.display = 'none'; // Pastikan kontainer tetap tersembunyi
    return;
  }

  container.style.display = 'block'; // Tampilkan kontainer jika input valid
  console.log(`Input kota: ${city}`);
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`; 
  console.log(`API URL: ${apiUrl}`);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) { // Jika respon gagal
        alert('Kota tidak ditemukan!');
        container.style.display = 'none'; // Sembunyikan kontainer
        return;
      }

      console.log('Data API:', data); // Debug data API

      // Menampilkan data cuaca ke elemen HTML
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const location = data.name;
      const description = weatherDescriptions[weather.description.toLowerCase()] || "Unknown";

      document.getElementById('location').innerText = `${location}`;
      document.getElementById('temp').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('weather-title').innerText = `Weather Today`;

      // Ganti gambar berdasarkan deskripsi cuaca
      const weatherIcon = document.getElementById('weather-icons');
      switch (description) {
        case "Clear Sky":
          weatherIcon.src = 'sunny.png';
          break;
        case "Few Clouds":
          weatherIcon.src = 'few_clouds.png';
          break;
        case "Scattered Clouds":
          weatherIcon.src = 'scattered_clouds.png';
          break;
        case "Broken Clouds":
          weatherIcon.src = 'broken_clouds.png';
          break;
        case "Overcast Clouds":
          weatherIcon.src = 'overcast_clouds.png';
          break;
        case "Shower Rain":
        case "Light Rain":
        case "Moderate Rain":
          weatherIcon.src = 'rainy.png';
          break;
        case "Heavy Rain":
        case "Very Heavy Rain":
          weatherIcon.src = 'heavy_rain.png';
          break;
        case "Snow":
          weatherIcon.src = 'snow.png';
          break;
        case "Mist":
          weatherIcon.src = 'mist.png';
          break;
        default:
          weatherIcon.src = 'images__13_-removebg-preview.png';
          break;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Terjadi kesalahan atau data cuaca tidak ditemukan.");
      container.style.display = 'none'; // Sembunyikan kontainer jika error
    });
}

document.getElementById('cityInput').addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        getWeather();
      }
    });
