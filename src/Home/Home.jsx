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












// props

// const Home = () => {

//   const navigate = useNavigate();

//   const [name, setName] = useState("")
//   const [value, setValue] = useState(0)
  
//   // useEffect berfungsi untuk merender setiap perubahan object / data yang terjadi didalam browser.
//   useEffect(() => {
//     // setValue(10) value 10 saat browser pertama kali dijalankan
//     if(value <= 5){
//       setName("Rafi Alfian")
//     } else if(value >= 5 && value <= 10) {
//       setName("Ervin Alfianto")
//     } else {
//       setName("Ali Imron")
//     }
//   })
//   // setiap ada perubahan data, maka apapun yang didalam useEffect akan tereksekusi / dirender kembali. 
//   // fungsi [] berfungsi agar useeffect dirender sekali saat browser pertama kali dijalankan
//   // jika ada isinya [value], maka value akan dianggap sebagai trigger, ketika ada perubahan data di value maka setName() akan diubah

//   useEffect(() => {
//     // jika local storage isAdmin == true maka navigate
//     JSON.parse(localStorage.getItem("isAdmin")) &&
//     navigate("/list_transaction");
//   },[]);


//   return (
//     <>
//       <button onClick={() => setValue((data)=> data + 1)}>Click</button>
//       <p>Value :{value}</p>
//       <p>Name : {name}</p>
//     </>
//   );
// };


