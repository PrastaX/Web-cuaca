// API Key dan endpoint
const apiKey = '91f6f373fd60b291cadd60f97d6475c4'; // Ganti dengan API Key Anda dari OpenWeatherMap

// Fungsi untuk mendapatkan cuaca berdasarkan input lokasi
function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Mengambil data cuaca
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const location = data.name;
      const description = weather.description;

      // Menampilkan data cuaca ke elemen HTML
      document.getElementById('location').innerText = `${location}, Indonesia`;
      document.getElementById('temp').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('weather-title').innerText = `Cuaca Hari Ini`;

      // Ganti gambar berdasarkan cuaca
      const weatherIcon = document.getElementById('weather-icon');
      
      if (description.includes('clear') || description.includes('sunny')) {
        weatherIcon.src = 'sunny.png';  // Gambar cuaca cerah
      } else if (description.includes('rain') || description.includes('shower')) {
        weatherIcon.src = 'rainy.png';  // Gambar cuaca hujan
      } else if (description.includes('cloudy') || description.includes('overcast')) {
        weatherIcon.src = 'cloudy.png';  // Gambar cuaca mendung
      } else {
        weatherIcon.src = 'images/default.png';  // Gambar default jika cuaca tidak dikenali
      }
    })
    .catch(error => alert("Cuaca tidak ditemukan atau error"));
}