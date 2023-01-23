// component
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// api
import { API } from "../config/api";

// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// css
import "./Home.scss";

// components
import Jumbotron from "../components/jumbotron/Jumbotron";
import Card1 from "../components/card1/Card1";
import Card2 from "../components/card2/Card2";


const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("role") === "admin" &&
    navigate("/list_transaction");
  }, []);

  // state search
  const [search, setSearch] = useState("")

  // state data trips
  const [data, setData] = useState();

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: "Bearer " + localStorage.getItem("token")
    },
  };

  // get trips 
  let { data: trips } = useQuery('tripsSearchCaches', async () => {
    const response = await API.get(`/trips`, config);
    setData(response.data.data)
  });

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <Jumbotron search={search} handleSearch={handleSearch} />
      <Card1 />
      <Card2 data={data} search={search} />
    </>
  );
};

export default Home;




