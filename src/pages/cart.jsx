import { Profile } from "./profile";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState, useContext } from "react";
import db from "../config/firebase";
// import { EcommerceCard } from "./ecommerceCard";
import { useNavigate, useParams } from "react-router-dom";
// import { EcommerceCard } from "../components/ecommerceCard";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/spinner";
import { EcommerceCard } from "../components/eccomerce";
import { SetSaved, Saved } from "../App";

export function Cart() {
  const setsaved = useContext(SetSaved);
  const saved = useContext(Saved);

  const [user] = useAuthState(auth);
  const { id } = useParams();

  // const [saved, setsaved] = useState([]);
  const [loading, setloading] = useState(false);
  const [empty, setempty] = useState(false);
  const [price, setprice] = useState([]);
  const [sum, setsum] = useState(0);
  const navigate = useNavigate();

  console.log(empty);

  useEffect(() => {
    setloading(true);
    db.collection("Cart")
      .where("userId", "==", id)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        const prices = collections.docs.map((cloths) => {
          console.log(cloths.data().price);
          return cloths.data().price;
        });
        // price.push(cloths.data().price)
        setsaved(cloths);
        setprice(prices);
        setTimeout(() => {
          setloading(false);
        }, 1000);
        if (cloths.length === 0) {
          setempty(true);
        }
      });
  }, []);
  
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
  }, [price]);

  console.log(saved);
  console.log(price);
  console.log(sum);

  return (
    <div className="pt-[80px]">
      {user ? (
        <div className="lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
          <p className="p-[1rem] pageHeader text-2xl text-center">Cart</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <p className="w-[100%] flex flex-col items-center loaderContainer">
              {loading ? <LoadingSpinner /> : ""}
            </p>
            <p className="w-[100%] text-center font-bold">
              {empty && "YOUR CART IS EMPTY 😪"}
            </p>
            {saved?.map((post, index) => {
              return (
                <div
                  key={index}
                  className="sm:w-[85vw] lg:w-[95%] max-w-4xl"
                >
                  <EcommerceCard post={post} />
                </div>
              );
            })}
          </div>

          {!empty && (
            <div>
              <div className="flex justify-between mx-[1rem] mt-[3rem] border-y py-[1rem]">
                <p>SUBTOTAL</p>
                <p>{sum}</p>
              </div>
              <div onClick={() => {
                navigate(`/Checkout/${saved[0].userId}`)
              }} className="flex flex-col items-center">
                <button className="text-white rounded-[20px] bg-[#deab24] font-bold mt-[2rem] py-[0.5rem] px-[1rem]">
                  Check Out
                </button>
              </div>
            </div>
          )}
          <p className="text-white lg:hidden text-center bg-[#deab24] fixed text-[10px] w-[4%] left-[93%] top-[3%] z-20 rounded-full">
            {saved.length}
          </p>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
}