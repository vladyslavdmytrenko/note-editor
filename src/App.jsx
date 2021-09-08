import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NoteContextProvider from "./context/NoteContext";

import Sort from "./components/Sort/Sort";
import Search from "./components/Search/Search";
import Navigation from "./components/Navigation/Navigation";
import Router from "./Router.jsx";

function App() {
  return (
    <NoteContextProvider>
      <BrowserRouter>
        <div className="container">
          <Sort />
          <Search />
          <Navigation />
          <Router />
        </div>
      </BrowserRouter>
    </NoteContextProvider>
  );
}

export default App;
