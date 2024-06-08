// console.log(import.meta.env.VITE_API_KEY);
import { LoadingButton } from "@mui/lab";
import {Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_CLIMA= `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`;
export default function app(){

  const [ciudad, setCiudad]= useState("");
  const[loading, setLoading]= useState(false);
  const [error, setError]= useState({
      error:false,
      message:"",
  });

  const onSubmit= async (e) => {
    e.preventDefault(); //evita el comportammiento determinado del evento
  
    setLoading(true);//cada q hacemos consuta 

    setError({
      error:false,
      message: "",
    });

    const[clima, setClima]= useState({
      city:"",
      country:"",
      temp:"",
      condition:"",
      icon:"",
      conditionText:"",
    });

    try{
      if(!ciudad.trim()) throw {message:"Debe ingresar una Ciudad"};
      const response= await fetch(`${API_CLIMA}${ciudad}`);
      const data= await response.json();

      if(data.error) throw {message: data.error.message};

      setClima({
        city:"data.location.name",
        country:"data.location.country",
        temp:"data.current.temp_c",
        condition:"data.current.condition.code",
        icon:"data.current.condition.icon",
        conditionText:"data.current.condition.text",
      })
    }
    catch(error){
    
      setError({
        error:true,
        message: error.message,
      });
    } finally{
      setLoading(false);
    }
  };

return(
  <Container
    maxWidth="xs"
    sx={{mt: 2}}
>
  <Typography
    variant="h3"
    component="h1"
    aling="center"
    gutterBottom
  >Radar del clima</Typography>

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

  </Box>
  </Container>
);
}
 