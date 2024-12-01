const apiKey = '91f6f373fd60b291cadd60f97d6475c4';

function getWeather(event) {
  event.preventDefault();

  const city = document.getElementById('cityInput').value.trim();
  const container = document.querySelector('.container');
  const cara = document.querySelector('.Cara');

  if (!city) {
    alert('Masukkan nama kota terlebih dahulu!');
    container.style.display = 'none';
    cara.style.display = 'block';
    return;
  }

  cara.style.display = 'none';
  container.style.display = 'block';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert('Kota tidak ditemukan!');
        container.style.display = 'none';
        return;
      }

      const weather = data.weather[0];
      const temperature = data.main.temp;
      const location = data.name;
      const description = weather.description;

      document.getElementById('location').innerText = location;
      document.getElementById('temp').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('weather-title').innerText = `Weather Today`;
      document.getElementById('weather-icons').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    })
    .catch(error => {
      alert("Terjadi kesalahan atau data cuaca tidak ditemukan.");
      container.style.display = 'none';
    });
}
