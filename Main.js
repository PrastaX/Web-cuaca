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
  const city = document.getElementById('cityInput').value;
  console.log(`Input kota: ${city}`);
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`; // Mengubah 'lang' ke 'en' untuk bahasa Inggris
  console.log(`API URL: ${apiUrl}`);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Data API:', data); // Debug data API

      // Mengambil data cuaca
      const weather = data.weather[0];
      console.log('Weather:', weather);

      const temperature = data.main.temp;
      console.log('Temperature:', temperature);

      const location = data.name;
      console.log('Location:', location);

      const description = weatherDescriptions[weather.description.toLowerCase()] || "Unknown"; // Menambahkan deskripsi cuaca
      console.log('Description:', description);

      // Menampilkan data cuaca ke elemen HTML
      document.getElementById('location').innerText = `${location}`;
      document.getElementById('temp').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('weather-title').innerText = `Weather Today`;

      // Ganti gambar berdasarkan deskripsi cuaca
      const weatherIcon = document.getElementById('weather-icons');

      switch (description) {
        case "Clear Sky":
          weatherIcon.src = 'sunny.png'; // Gambar cuaca cerah
          console.log('Icon: Clear Sky');
          break;
        case "Few Clouds":
          weatherIcon.src = 'few_clouds.png'; // Gambar sedikit awan
          console.log('Icon: Few Clouds');
          break;
        case "Scattered Clouds":
          weatherIcon.src = 'scattered_clouds.png'; // Gambar awan tersebar
          console.log('Icon: Scattered Clouds');
          break;
        case "Overcast Clouds":
          weatherIcon.src = 'overcast_clouds.png'; // Gambar langit sepenuhnya tertutup awan
          console.log('Icon: Overcast Clouds');
          break;
        case "Shower Rain":
        case "Light Rain":
        case "Moderate Rain":
          weatherIcon.src = 'rainy.png'; // Gambar hujan
          console.log('Icon: Rain');
          break;
        case "Heavy Rain":
        case "Very Heavy Rain":
          weatherIcon.src = 'heavy_rain.png'; // Gambar hujan lebat
          console.log('Icon: Heavy Rain');
          break;
        case "Snow":
          weatherIcon.src = 'snow.png'; // Gambar salju
          console.log('Icon: Snow');
          break;
        case "Mist":
          weatherIcon.src = 'mist.png'; // Gambar kabut
          console.log('Icon: Mist');
          break;
        default:
          weatherIcon.src = 'images__13_-removebg-preview.png'; // Gambar default jika cuaca tidak dikenali
          console.log('Icon: Default');
          break;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Weather not found or error");
    });
}