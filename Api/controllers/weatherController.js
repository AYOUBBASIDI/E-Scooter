const fetch = require('node-fetch');

const handleWeatherByDay = (req, res) => {
    const { lat, long } = req.params;
    const key = process.env.WEATHER_API_KEY;
    //get date now format 2021-01-25
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month < 10) month = `0${month}`;
    let day = date.getDate();
    if(day < 10) day = `0${day}`;
    const dateNow = `${year}-${month}-${day}`;
    const count = [
        {time : `${dateNow} 00:00:00` , still : 8},
        {time : `${dateNow} 03:00:00` , still : 7},
        {time : `${dateNow} 06:00:00` , still : 6},
        {time : `${dateNow} 09:00:00` , still : 5},
        {time : `${dateNow} 12:00:00` , still : 4},
        {time : `${dateNow} 15:00:00` , still : 3},
        {time : `${dateNow} 18:00:00` , still : 2},
        {time : `${dateNow} 21:00:00` , still : 1},
      ]
      const days = ['Su', 'Mo', 'Tu', 'We', 'Tu', 'Fr', 'Sa'];
    let start = 0;
    let dataStored = [];
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < count.length; i++){
              if(count[i].time == data.list[0].dt_txt){
                start = count[i].still;
              }
            }
            var d = new Date(data.list[0].dt_txt);
            var dayName = days[d.getDay()];
            dataStored.push({
              day: data.list[0].dt_txt,
              temp: data.list[0].main.temp,
              icon: data.list[0].weather[0].icon,
              dayName: dayName
            });
            for(let i = start; i < data.list.length; i+=8){
                var d = new Date(data.list[i].dt_txt);
                var dayName = days[d.getDay()];
              dataStored.push({
                day: data.list[i].dt_txt,
                temp: data.list[i].main.temp,
                icon: data.list[i].weather[0].icon,
                dayName: dayName
              });
            }
            const city = data.city.name;
            res.status(200).json({ days : dataStored , city});
          })
        .catch(err => {
            res.status(500).json({ 'message': err.message });
        });


}

const handleWeatherByHour = (req, res) => {
    const { day, lat, long } = req.params;
    const key = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let dataStored = data.list;
            dataStored = dataStored.filter(item => item.dt_txt.includes(day));
            dataStored = dataStored.map(item => {
                return {
                    temp: item.main.temp,
                    humidity : item.main.humidity,
                    wind : item.wind.speed,
                    date : item.dt_txt,
                    icon : item.weather[0].icon
                }
            });
            res.status(200).json(dataStored);
            })
        .catch(err => {
            res.status(500).json({ 'message': err.message });
        });
}


module.exports = { handleWeatherByDay , handleWeatherByHour}