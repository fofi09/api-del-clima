// console.log(import.meta.env.VITE_API_KEY);
import './index.css'
import { LoadingButton } from "@mui/lab";
import {Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";


const API_CLIMA= `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`;
export default function app(){

  const [ciudad, setCiudad]= useState("");
  const[loading, setLoading]= useState(false);
  const [error, setError]= useState({
      error:false,
      message:"",
  });
  //////////
  const [clima, setClima] = useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    icon:"",
    conditionText:"",
  });
  //////////
  const [searched, setSearched] = useState(false); // Definir el estado searched aquí
  //////////

  const onSubmit= async (e) => {
    e.preventDefault(); //evita el comportammiento determinado del evento
  
    setLoading(true);//cada q hacemos consuta 

    setError({
      error:false,
      message: "",
    });

    // const[clima, setClima]= useState({
    //   city:"",
    //   country:"",
    //   temp:"",
    //   condition:"",
    //   icon:"",
    //   conditionText:"",
    // });

    try{
      if(!ciudad.trim()) throw {message:"Debe ingresar una Ciudad"};
      const response= await fetch(`${API_CLIMA}${ciudad}`);
      const data= await response.json();

      if(data.error) throw {message: data.error.message};

      setClima({
        city:data.location.name,
        country:data.location.country,
        temp:data.current.temp_c,
        condition:data.current.condition.code,
        icon:data.current.condition.icon,
        conditionText:data.current.condition.text,
      });
      setSearched(true);
    }
    catch(error){
      setError({
        error: true,
        message: error.message,
      });
    } finally{
      setLoading(false);
    }
  };

return(
  <div className="background-color">
   
<Container
    maxWidth="xs"
    sx={{
      mt: 2
    }}
   
  >




<Typography
  variant="h3"
  component="h1"
  align="center"
  gutterBottom
  sx={{
    animation: "HeartBeat 4s ease infinite",
 
  }}
>
  api del clima
</Typography>

  <Box
  sx={{display:"grid", gap: 2}}
  component="form"
  autoComplete="off"
  onSubmit={onSubmit}
  >
    <TextField
    id="ciudad"
    label="localidad o region"
    variant="outlined"
    size="small"
    // required
    fullWidth
    value={ciudad}
    onChange={(e) => setCiudad(e.target.value)}
    error={error.error}
    helperText={error.message}
    >
    </TextField>

    <LoadingButton
      type="submit"
      variant="outlined"
      loading={loading}
      loadingIndicator="Buscando..."
    >
      Buscar Ubicacion
    </LoadingButton>

    {searched && (
            <div className="cardContainer">
              <div className="card">
                <p className="city">
                  {clima.city}, {clima.country}
                </p>
                <p className="weather">{clima.conditionText}</p>
                <img
                  className="weather"
                  alt={clima.conditionText}
                  src={clima.icon}
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="temp">{clima.temp} °C</p>
              </div>
            </div>
          )}





      {/* {clima.city &&(
        <Box 
        sx={{
          mt:2,
          display: "grid",
          gap: 2,
          textAlign: "center",
        }}
        >
      <Typography variant='h4' component="h2">
        {clima.city}, {clima.country}
      </Typography>

      <Box 
      component="img"
      alt={clima.conditionText}
      src={clima.icon}
      sx={{margin:"0 auto"}}
      />

      <Typography 
      variant='h5' component='h3'>
        {clima.temp} °C
      </Typography>

      <Typography 
      variant='h6' component='h4'>
        {clima.conditionText}
        </Typography>
        </Box>
      )}
       */}


  </Box>
  </Container>
  </div>
 
);
}
 