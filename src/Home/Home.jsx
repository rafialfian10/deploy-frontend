import React, { useEffect } from "react";

// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// css
import "./Home.scss";

// components
import Jumbotron from "../components/jumbotron/Jumbotron";
import Card1 from "../components/card1/Card1";
import Card2 from "../components/card2/Card2";
import { useNavigate } from "react-router-dom";

const Home = (props) => {

  const navigate = useNavigate();

  // jika sewaktu halaman dirender pertama kali ada local storage isAdmin maka navigate
  useEffect(() => {
    localStorage.getItem("role") === "admin" &&
    navigate("/list_transaction");
  }, []);

  return (
    <>
      <Jumbotron />
      <Card1 />
      <Card2 />
    </>
  );
};

export default Home;




