//global

var apiKey = 'd32aec8396112b0fae9348457dab7aa2';
var searchBtn = $('#search-button');
var weatherS = $('.weather-search');
var todayS = $('#today');
var forecastS = $('#forecast');
var storedHist= $('#history');

//display 5 day forecast from city 
function forecastDis(results) {
//title
$(`<h4 class="mt-1 font-weight-bold">5-Day Forecast:</h4>`).insertAfter(todayS);
//results-loop
for (var day of results.list) {
//moment js
var currentDay = moment.unix(day.dt).format("DD/MM/YYYY");
var currentHour= moment.unix(day.dt).format("hh:mm:ss a");
//push results to html page 
    if (currentHour == '12:00:00 pm') {
        forecastS.append(`
            
        <div class="mr-3 ml-3 pr-5 pl-2 pt-2 border border-dark forecast-card">
        <h6 class='font-weight-bold'>${currentDay}</h6>
        <h6>
        <p><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather icon"></p>
        <p>Temp: ${Math.round(day.main.temp)} C°</p>
        <p>Wind: ${day.wind.speed} KPH</p>
        <p>Humidity: ${day.main.humidity} %</p>
        </h6>
        </div>
        `)
}

}


}

//display weather and display new search . make alert for invalid city 
function forecast(latitude, longitude) {
   
    $.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`)
        .then(function (data) {
            forecastDis(data);

        });

        function currentWeatherDis(result, citySearch) {
            todayS.next().html('');
            todayS.html('');
            
            if (!result) {
                todayS.html('<h5>No result found. Please enter a valid city name.</h5>');
                return;
            }
            else {
                var todaysD = moment.unix(result.dt).format("DD/MM/YYYY");
                todayS.append(`
                <div class='border border-dark pl-2'>
                <p class='font-weight-bold'>
                <h2>${citySearch} (${todaysD})<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather icon"></h2>
                </p>
                <h6>
                <p>Temp: ${Math.round(result.main.temp)} C°</p>
                <p>Wind: ${result.wind.speed} KPH</p>
                <p>Humidity: ${result.main.humidity} %</p>
                </h6>
                </div>
                `)
            forecast(result.coord.lat, result.coord.lon);
        }
    
    }
    










//local storage- new city searches aand display curernt weatherf



