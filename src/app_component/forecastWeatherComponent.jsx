import React from "react";

const ForecastWeather = (props) => {
    return (
        <div>
            {/*Si se abre la página por primera vez mostramos la imágen, de lo contrario se muestra los datos de la API*/}
           {!props.first_time ? forecastweather(props) : inicio()}
       </div> 
    ) 
};
{/*Obtenemos las propiedades del clima*/}
function forecastweather(props) {
    return(
    <div className="container">
        <h1>{props.title}</h1>
        <div className="cards">
            <h1>{props.city}</h1>
            <h5 className="py-4">
                <i className={`wi ${props.weatherIcon} display-1`}></i>
            </h5>
            {props.temp_celsius ? (<h1 className="py-2">{props.temp_celsius}&deg;</h1>) : null}
            <h4 className="py-3">{props.description}</h4>
        </div>
    </div>
    )
}

{/*Muestra la imagen*/}
function inicio() {
    return(
        <img src="https://images.vexels.com/media/users/3/143097/isolated/preview/5a631e30cd478440c20da8c5578dd77c-discos-con-logo-circular-by-vexels.png" className="img-fluid" alt="Responsive image"></img>
    )
}

export default ForecastWeather;