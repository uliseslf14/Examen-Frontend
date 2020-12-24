import React from "react";
import "./App.css";
import 'weather-icons/css/weather-icons.css'
import Weather from './app_component/currentWeatherComponent';
import ForecastWeather from './app_component/forecastWeatherComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./app_component/formComponent"

const API_KEY = '6eee4a38fa835c11fec271ba5ca255c6';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      /*Atributos generales*/
      title:"",
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      description: "",
      list: undefined,

      /*Atributos útiles para el pronóstico*/
      forecast_icon: undefined,
      forecast_title:"",
      forecast_celsius: undefined,
      forecast_description: "", 

      /*Control de errores*/
      error: false, /*Locacion vacia*/
      error2: false,/*Locacion incorrecta*/
      first_time: true /*Primera carga de la página*/
    }; 

    this.weatherIcon = {
      Thunderstorm : "wi-thunderstorm",
      Drizzle : "wi-sleet",
      Rain : "wi-storm-showers",
      Snow : "wi-snow",
      Atmosphere : "wi-fog",
      Clear : "wi-day-sunny",
      Clouds : "wi-day-fog" 
    };
  }

  convertToCeslcius(temp){
    let celsius = Math.floor(temp-273.15);
    return celsius;
  }

  getIcon(id, op){
    /*Op nos indica si se trata del icono del clima actual o del pronóstico*/
    if(op){
      switch(true){
        case id >= 200 && id<=232:
          this.setState({icon: this.weatherIcon.Drizzle})
          break;
        case id >= 500 && id<=531:
          this.setState({icon: this.weatherIcon.Rain})
          break;
        case id >= 600 && id<=622:
          this.setState({icon: this.weatherIcon.Snow})
          break;
        case id >= 700 && id<=781:
          this.setState({icon: this.weatherIcon.Atmosphere})
          break;
        case id === 800:
          this.setState({icon: this.weatherIcon.Clear})
          break;
        case id >= 801 && id<=804:
          this.setState({icon: this.weatherIcon.Clouds})
          break;
        default:
          this.setState({icon: this.weatherIcon.Clouds})
      }
    }else{
      switch(true){
        case id >= 200 && id<=232:
          this.setState({forecast_icon: this.weatherIcon.Drizzle})
        break;
        case id >= 500 && id<=531:
          this.setState({forecast_icon: this.weatherIcon.Rain})
        break;
        case id >= 600 && id<=622:
          this.setState({forecast_icon: this.weatherIcon.Snow})
        break;
        case id >= 700 && id<=781:
          this.setState({forecast_icon: this.weatherIcon.Atmosphere})
        break;
        case id === 800:
          this.setState({forecast_icon: this.weatherIcon.Clear})
        break;
        case id >= 801 && id<=804:
          this.setState({forecast_icon: this.weatherIcon.Clouds})
        break;
        default:
          this.setState({forecast_icon: this.weatherIcon.Clouds})
      }
    }
  
}
  getWeather = async (e) => {

    e.preventDefault();
    const city=e.target.elements.city.value;

    if(city){
      this.setState({error:false})
      this.setState({error2:false})
        try{
          const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units?Metric&appid=${API_KEY}`);
          const response = await api_call.json();
          const forecast_api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=es&units=Metric`)
          const forecast_response = await forecast_api_call.json();
        
          this.setState({
            /*Propiedades del clima actual*/
            title: "CLIMA ACTUAL",
            city: `${response.name},${response.sys.country}`,
            celsius: this.convertToCeslcius(response.main.temp),
            description: response.weather[0].description,
            
            /*Propiedades del pronóstico*/
            forecast_title: "PRONOSTICO MAÑANA",
            forecast_city: forecast_response.city.name,
            forecast_celsius: forecast_response.list[5].main.temp,
            forecast_description: forecast_response.list[5].weather[0].description,

            first_time: false
            
            
          })
          /*Enviuamos el id del ícono obtenido de la api y true se es para el clima o false para pronóstico*/
          this.getIcon(response.weather[0].id, true)
          this.getIcon(forecast_response.list[5].weather[0].id, false)
      }catch(e){
        /*Si se ingresa ciudad incorrecta, el error dos se muestra*/
        this.setState({error2:true})
        this.setState({error:false})
      }
    }else{
      /*Si la locacion está vacia, mostramos el error uno */
      this.setState({error:true})
      this.setState({error2:false})
    }
  };
  render(){
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} error2={this.state.error2}/>
        <div className="row">
          <div className="col-sm">
            {/*Enviamos las propiedades al componente del clima actual*/}
            <Weather
                title={this.state.title}
                city={this.state.city} 
                country={this.state.country} 
                temp_celsius={this.state.celsius}  
                description={this.state.description}
                weatherIcon={this.state.icon}
                first_time={this.state.first_time}
              />
            </div>
            {/*Enviamos las propiedades al componente del pronostico*/}
            <div className="col-md">
              <ForecastWeather
                  title={this.state.forecast_title}
                  first_time={this.state.first_time}
                  city={this.state.forecast_city}
                  temp_celsius={this.state.forecast_celsius}
                  weatherIcon={this.state.forecast_icon}
                  description={this.state.forecast_description}
              />
            </div>
        </div>
      </div>
    );
  }
}

export default App;