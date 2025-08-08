import React from "react";
import "./Main.css";
import NavBar from "./NavBar";
import Home from "./Home";
import RecipeInstruction from "./RecipeInstruction";
import { Routes, Route } from "react-router-dom";
import Favourite from "./Favourite";
import SearchList from "./SearchList";
import RegisterForm from "./pages/Login";
import RefrigeratorPage from "./pages/Refrigerator";
import World from "./pages/World";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/RecipeInstruction/:id" element={<RecipeInstruction />} />
        <Route path="/Favourite" element={<Favourite />} />
        <Route path="/World" element={<World />} />
          <Route path="/SearchList" element={<SearchList/>}/>
          <Route path="/refrigerator" element={<RefrigeratorPage/>}/>

      </Routes>
    </>
  );
};

export default Main;
