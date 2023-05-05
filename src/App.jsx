import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { ScrollToTop } from "./components/scrolltotop";
import { useState } from "react";
import React from "react";
import { LandingPage } from "./pages/landingPage";
import { AddProduct } from "./components/sell";
import { ProductsPage } from "./pages/BagsPage";
import { Profile } from "./pages/profile";
import { Cart } from "./pages/cart";
import { BuyProduct } from "./pages/buyproduct";
import { CheckOut } from "./pages/checkout";
import { SearchResult } from "./pages/searchresults";

export const ShowCart = React.createContext();
export const SetShowCart = React.createContext();
export const SetLoadCart = React.createContext();
export const LoadCart = React.createContext();
export const AddCart = React.createContext();
export const SetAddCart = React.createContext();
export const SetSaved = React.createContext();
export const Saved = React.createContext();

function App() {
  const [loadCart, setloadCart] = useState(false);
  const [showcart, setshowcart] = useState(false);
  const [cart, setcart] = useState(0);
  const [saved, setsaved] = useState([]);

  return (
    <div className="App bodyFont bg-[#9ec6fa]">
      <ShowCart.Provider value={showcart}>
        <SetShowCart.Provider value={setshowcart}>
          <SetLoadCart.Provider value={setloadCart}>
            <LoadCart.Provider value={loadCart}>
              <SetAddCart.Provider value={setcart}>
                <AddCart.Provider value={cart}>
                  <SetSaved.Provider value={setsaved}>
                    <Saved.Provider value={saved}>
                  <Router>
                    <ScrollToTop>
                      <Navbar />

                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Product" element={<AddProduct />} />
                        <Route
                          path="/All-Bags-Products"
                          element={<ProductsPage />}
                        />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Cart/:id" element={<Cart />} />
                        <Route
                      path="/Buy/:collections/:product/:id"
                      element={<BuyProduct />}
                    />
                     <Route
                    path="/Search/:search"
                    element={<SearchResult />}
                  />
                    <Route path="/Checkout/:id" element={<CheckOut />} />
                      </Routes>
                    </ScrollToTop>
                  </Router>
                  </Saved.Provider>
                  </SetSaved.Provider>
                </AddCart.Provider>
              </SetAddCart.Provider>
            </LoadCart.Provider>
          </SetLoadCart.Provider>
        </SetShowCart.Provider>
      </ShowCart.Provider>
    </div>
  );
}

export default App;
