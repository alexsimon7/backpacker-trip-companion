import React from "react";
import './App.css';
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ItemSearchBar from "./components/ItemSearchBar";
import OwnedItemList from "./components/OwnedItemList";
import PackList from "./components/PackList";
import SavePackList from "./components/SavePackList";
import PastTrips from "./components/PastTrips";


function App() {
  return (
    <body>
      <Header />
      <NavBar />
      <main>
        <ItemSearchBar />
        <OwnedItemList />
        <PackList />
        <SavePackList />
        <PastTrips />
      </main>
      <Footer />
    </body>
  );
}

export default App;
