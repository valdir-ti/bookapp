import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const base_url = process.env.NODE_ENV === "development" ? "http://localhost:3333" : "https://bookapi-solid.onrender.com"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/${url}`, { mode: 'cors'});
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    };

      fetchData();

  }, [url, base_url]);


  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

const useFetchHotels = (url) => {
  const [dataHotels, setDataHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDataHotels = async () => {
      setLoading(true);
      try {
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3333/hotels/countByCityName/?cities=london,rome,berlim" : "https://bookapi-solid.onrender.com/hotels/countByCityName/?cities=london,rome,berlim"
        const res = await axios.get(url, { mode: 'cors'});
        setDataHotels(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    };
    fetchDataHotels();
  }, []);


  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setDataHotels(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { dataHotels, loading, error, reFetch };
};

export { useFetch, useFetchHotels };
