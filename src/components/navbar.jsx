import { Link } from "react-router-dom";
import logo from "../assets/yarzlogo.png";
import { useEffect, useState, useContext } from "react";
import db from "../config/firebase";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import LoadingSpinner from "./spinner";
// import { EcommerceCard } from "./ecommerceCard";
import { signInWithPopup, signOut } from "firebase/auth";
import { Saved, SetSaved, LoadCart, AddCart } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "../pages/profile";

export function Navbar() {

  const {id} = useParams()

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  const SignUserOut = async () => {
    await signOut(auth);
  };
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
// console.log(user.u)

  // const [saved, setsaved] = useState([]);
  const [loading, setloading] = useState(false);
  const [empty, setempty] = useState(false);
  const [price, setprice] = useState([]);
  const [sum, setsum] = useState(0);

  const setsaved = useContext(SetSaved);
  const saved = useContext(Saved);
  const Loadcart = useContext(LoadCart);
  const cart = useContext(AddCart);
  useEffect(() => {
    setloading(true);
    db.collection("Cart")
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id }
        });
        const prices = collections.docs.map((cloths) => {
          console.log(cloths.data().price);
          return cloths.data().price;
        });
        // price.push(cloths.data().price)
       setprice(prices)
        setTimeout(() => {
          setloading(false);
        }, 1000);
        if (cloths.length === 0) {
          setempty(true);
        }
      });
  }, [cart]);

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  useEffect(() => {
    
    let sum = 0;
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return setsum(formatCur(sum, "en-NG", "NGN"));
  }, [price, Loadcart]);
  console.log(window.location.pathname);

  return (
    <div className="flex flex-col ">
      <div className="hidden lg:block lg:absolute lg:w-[30%] ">
        <Profile/>
      </div>
      <div className="fixed px-[1rem] w-[100%] navbar bg-[#9ec6fa] z-10">
        <div className="flex items-center justify-between">
          <div className="lg:w-[100vw] my-[-1rem] lg:flex lg:flex-col lg:items-center">
            <Link to="/">
            <img src={logo} alt="logo" className="w-[30%] lg:w-[300px]"/>
          </Link>
          </div>
          <div className="flex justify-between lg:hidden">
           <Link to="/Profile">
           <svg
              viewBox="0 0 24 24"
              width="30px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                  stroke={
                    window.location.pathname === "/Profile"
                      ? "#c0e07d"
                      : "#000000"
                  }
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                  stroke={
                    window.location.pathname === "/Profile"
                      ? "#c0e07d"
                      : "#000000"
                  }
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg></Link>
            <div
              className="relative"
              onClick={() => {
                {!user ? navigate(`/Profile`) : navigate(`/Cart/${user?.uid}`)}
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-[0.5rem]"
                width="30px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.78571 5H18.2251C19.5903 5 20.5542 6.33739 20.1225 7.63246L18.4558 12.6325C18.1836 13.4491 17.4193 14 16.5585 14H6.07142M4.78571 5L4.74531 4.71716C4.60455 3.73186 3.76071 3 2.76541 3H2M4.78571 5L6.07142 14M6.07142 14L6.25469 15.2828C6.39545 16.2681 7.23929 17 8.23459 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
