var APIkey = '103dd07a28330ea8dc30aa76cbbf42fd';
var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?';
var city = "denver";
var foo;
$('#citySearch').on('click', function(evt){
  evt.preventDefault();
  
  foo = $(this)
  .siblings("#newCity")
  .val();
  city = foo;
  console.log(city);
  renderWeather();
});
$('.city').on('click', function(evt){
  evt.preventDefault();
  cityBtn = $(this).text();
  city = cityBtn;
  console.log(city);
  renderWeather();
});

// function getUVIndex(lat, lon){
//   var query = 'http://api.openweathermap.org/data/2.5/uvi?appid='+ APIkey + '&lat='+lat+'&lon='+ lon;
//   $.ajax({
//     url: query,
//     dataType: 'json',
//     type: "GET",
//     success: function (data){
//       console.log(data);
//     }
//   })
// }



function renderWeather() {

$.ajax({
  url: queryURL, //API Call
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: APIkey,
    units: "imperial",
    cnt: "6"
  },
  success: function(data) {
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lat;
    // getUVIndex(lat, lon);
    var today = moment().format("MMM Do YYYY");
    var wf = "";
    var forecastList = $('<ul>')
    var cD = '';
    cD += "<h2>" + data.city.name + "</h2>"; 
    console.log(data);
    cD += '<p>';
    cD += '<b>' + today + ' </b>';
    cD += data.list[0].main.temp_max + '&degF';
    cD += data.list[0].main.humidity;
    cD += "<span> | " + data.list[0].weather[0].description + "</span>"; 
    cD += "<img src='https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>";
    cD += "</p>"
    $('.weather').html(cD);

    for (var i =1; i<6; i++) {
      var val = data.list[i];
      var day = moment().add(i, 'day').format("MMM Do YYYY");
      wf += "<li>"
      wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
      wf += "<p>" + day  + "</p> " 
      wf += '<p>Temperature High: ' + val.main.temp + "&degF" + ' ' + '</p>';
      wf += '<p>Humidity: ' + val.main.humidity + '</p>';
      wf += "<span>" + val.weather[0].description + "</span>";
      wf += "</li>"
    };
    forecastList.append(wf);
    $(".forecast").html(forecastList);
  }
});
}
// });

renderWeather();
// getUVIndex();