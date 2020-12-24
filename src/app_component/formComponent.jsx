import React from 'react';
const Form = props =>{
    return(
    <div className="container">
        <br/><br/>
        <div>{props.error ? error("Ingresa El Nombre de una Ciudad") : null}</div>
        <div>{props.error2 ? error("La ciudad ingresada es incorrecta.") : null}</div>
        <form onSubmit={props.loadweather}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" className="form-control" name="city" placeholder="Ingresa una locacion."/>
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-warning">Obtener Información</button>
                    </div>
                </div>
            </div>
        </form>
        <br/><br/>
    </div>
    
    );
};

function error(msj){
    return <div className="alert alert-danger mx-5" role="alert">
      {msj}
    </div>
  }

export default Form;