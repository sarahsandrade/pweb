import axios from "axios";

export async function getAllCountries ()  {
    try {
      const res = await axios.get('http://localhost:5173/country/all',{headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InJ1YW50YXJjaWlzaW9AYWRtaW4uY29tIiwiZXhwIjoxNzI0MzYyMzAxLCJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sIm5vbWUiOiJSdWFuIFRhcmNpc2lvIn0.vM_QWMdfYSrfjKsBZFHyIbIV5VWMbXSXjITnWDo_FSI'}});
      console .log(res.data)
      return res.data || [];
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }
