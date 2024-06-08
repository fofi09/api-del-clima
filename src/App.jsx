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
      let errorMessage = "Error desconocido"; 
      if (error.message === "No matching location found.") {
        errorMessage = "La ciudad no existe. Asegúrese de ingresar correctamente el nombre.";
      } else {
        errorMessage = error.message; 
      }
      setError({
        error: true,
        message: errorMessage,
      });
    } finally{
      setLoading(false);
    }
  };

return(
  <div className="background-color"   style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px"}}>
   
<Container
    maxWidth="xs"
    sx={{
      mt: 2,
      border: "1px solid black", // Agrega un borde negro
          borderRadius: "10px", // Ajusta el radio de borde
          padding: "20px", // Ajusta el relleno
          backgroundColor: "white" // Fondo blanco
    }}
   
  >


<Typography
  variant="h3"
  component="h1"
  align="center"
  gutterBottom
  sx={{
    animation: "HeartBeat 4s ease infinite",
    fontFamily: "Arial"
 
  }}
>
  Api del clima
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

    sx={{ color: "black", "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },  "&:hover fieldset": {
      borderColor: "black"} }}
    >
    </TextField>

    <LoadingButton
      type="submit"
      variant="outlined"
      loading={loading}
      loadingIndicator="Buscando..."
      sx={{ color: "black", borderColor:"black", backgroundColor: "grey", "&:hover": { backgroundColor: "gray" }, "&:hover": {
        backgroundColor: "gray" // Cambia el color de fondo al pasar el mouse
      }}}
    >
      Buscar Ubicacion
    </LoadingButton>

    
    {searched && (
  <div
    className="cardContainer"
    style={{
      display: "flex",
      maxWidth: "359px",
       margin: "auto",
        textAlign: "center",
      textAlignLast:"center",
      justifyContent: "center",
      alignItems: "center",
      
    }}
  >
    <div className="card" >
      <p className="city">
        {clima.city}, {clima.country}
      </p>
      <p className="weather">{clima.conditionText}</p>
      <img
        className="weather"
        alt={clima.conditionText}
        src={clima.icon}
        style={{ width: "100px", height: "75px" }}
      />
      <p className="temp">{clima.temp} °C</p>
    </div>
  </div>
)}

  </Box>
  </Container>
  </div>
 
);
}




