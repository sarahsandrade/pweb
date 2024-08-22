import { useEffect, useState } from "react";
import { getAllCountries } from '../../index';
import Topbar from '../../Topbar/Topbar';
import './Homepage.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
        try {
            const result = await getAllCountries();
            setCountries(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    getData();
}, []);
  return (
 <div>
  <Topbar />
  <h1>Home</h1>
    <div>
      {countries?.map((country)=>(
        <h3>country.name</h3>
      ))}
    </div>
 </div>   
  );
};


export default Home;