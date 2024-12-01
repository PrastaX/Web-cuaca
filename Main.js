// API Key dan endpoint
const apiKey = '91f6f373fd60b291cadd60f97d6475c4'; // Ganti dengan API Key Anda dari OpenWeatherMap
console.log(`API Key: ${apiKey}`);

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

console.log('Weather descriptions:', weatherDescriptions);

// Fungsi untuk mendapatkan cuaca berdasarkan input lokasi
function getWeather(event) {
  // Prevent form submission (mencegah halaman reload)
  event.preventDefault();

  const city = document.getElementById('cityInput').value.trim();
  const container = document.querySelector('.container');
  const cara = document.querySelector('.Cara'); // Seleksi elemen .Cara
  
  console.log(`City Input: ${city}`);
  
  // Jika input kosong, tampilkan pesan cara
  if (!city) {
    console.log('City input is empty, showing instructions...');
    alert('Masukkan nama kota terlebih dahulu!');
    container.style.display = 'none'; // Pastikan kontainer tetap tersembunyi
    cara.style.display = 'block'; // Tampilkan elemen .Cara
    return;
  }

  // Sembunyikan elemen .Cara setelah input valid
  cara.style.display = 'none';
  console.log('Valid city input, showing container...');
  container.style.display = 'block'; // Tampilkan kontainer jika input valid
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`; 
  console.log(`API URL: ${apiUrl}`);

  fetch(apiUrl)
    .then(response => {
      console.log('API Response:', response);
      return response.json();
    })
    .then(data => {
      console.log('API Data:', data); // Debug data API

      if (data.cod !== 200) { // Jika respon gagal
        console.log('City not found!');
        alert('Kota tidak ditemukan!');
        container.style.display = 'none'; // Sembunyikan kontainer
        return;
      }

      // Menampilkan data cuaca ke elemen HTML
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const location = data.name;
      const description = weatherDescriptions[weather.description.toLowerCase()] || "Unknown";

      console.log(`Location: ${location}`);
      console.log(`Temperature: ${temperature}°C`);
      console.log(`Description: ${description}`);
      
      document.getElementById('location').innerText = `${location}`;
      document.getElementById('temp').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('weather-title').innerText = `Weather Today`;

      // Ganti gambar berdasarkan deskripsi cuaca
      const weatherIcon = document.getElementById('weather-icons');
      switch (description) {
        case "Clear Sky":
          console.log('Setting icon for Clear Sky');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Few Clouds":
          console.log('Setting icon for Few Clouds');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Scattered Clouds":
          console.log('Setting icon for Scattered Clouds');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Broken Clouds":
          console.log('Setting icon for Broken Clouds');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Overcast Clouds":
          console.log('Setting icon for Overcast Clouds');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Shower Rain":
        case "Light Rain":
        case "Moderate Rain":
          console.log('Setting icon for Rain');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Heavy Rain":
        case "Very Heavy Rain":
          console.log('Setting icon for Heavy Rain');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Snow":
          console.log('Setting icon for Snow');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        case "Mist":
          console.log('Setting icon for Mist');
          weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
          break;
        default:
          console.log('Setting default icon');
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

// Menangani submit form (termasuk tekan enter)
document.getElementById('searchForm').addEventListener('submit', getWeather);