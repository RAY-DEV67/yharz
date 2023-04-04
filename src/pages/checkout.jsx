import { Profile } from "./profile";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import db from "../config/firebase";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import LoadingSpinner from "../components/spinner";
import { storage } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard } from "../components/productsCard";

export function CheckOut() {
  const [user] = useAuthState(auth);
  const [image, setimage] = useState("");
  const [isfile, setfile1] = useState("");
  const navigate = useNavigate();

  const [saved, setsaved] = useState([]);
  const [loading, setloading] = useState(false);
  const [price, setprice] = useState([]);
  const [sum, setsum] = useState(0);
  const [product, setproduct] = useState([]);
  const [productOrder, setproductOrder] = useState("");
  const [errors, seterrors] = useState("");
  const { id } = useParams();
  console.log(product)

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
        const productName = collections.docs.map((cloths) => {
          console.log(cloths.data().price);
          return cloths.data().title;
        });
        setsaved(cloths);
        setprice(prices);
        setproduct(productName)
        setproductOrder(productName?.join(" , "))
        setTimeout(() => {
          setloading(false);
        }, 1000);
      });
  }, []);

  

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };


  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return setsum(formatCur(sum, 'en-NG' , "NGN"));
  }, [price]);

  const [name, setname] = useState("");
  const [street, setstreet] = useState("");
  const [town, settown] = useState("");
  const [state, setstate] = useState("");
  const [number, setnumber] = useState("");

    const validateForm = () => {
    let tempErrors = {};
    if (!isfile) {
      tempErrors.file1 = "Please select a Picture";
    }
    if (!name) {
      tempErrors.name = "Please add your Name";
    }
    if (!street) {
      tempErrors.street = "Please add your Street Address";
    }
    if (!town) {
      tempErrors.town = "Please add your Town/City";
    }
    if (!state) {
      tempErrors.state = "Please add state";
    }
    if (!number) {
      tempErrors.phone = "Please input your Phone Number ";
    }
    seterrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };



  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    if(validateForm()){
      emailjs
    .sendForm(
      "service_dtrv7eq",
      "template_18is4ge",
      form.current,
      "0fs2UJE4_uP27Mjo7"
    )
    .then(
      (result) => {
        console.log(result.text);
        navigate("/");
        console.log("message sent")
      },
      (error) => {
        console.log(error.text);
      }
    );
    }else{console.log("form is invalid");}
  };

  const upload = async () => {
    if (isfile == null) return;
    storage
      .ref("/images/" + isfile.name)
      .put(isfile)
      .on("state_changed", alert("success"), alert, () => {
        storage
          .ref("images")
          .child(isfile.name)
          .getDownloadURL()
          .then((imgUrl) => {
            setimage(imgUrl)
          });
      });
  };

  console.log(image)


  return (
    <div className="pt-[90px] lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
      {user ? (
        <div>
         <p className="text-center pt-[1rem] text-2xl">Check-Out</p>
          <div className="flex flex-col items-center justify-center w-[100%] mb-[1rem]">
          </div>

          <div className="flex flex-col items-center">
            <div className="form w-[95%] mb-[1rem]">
              <p className="text-left ml-[1rem] mt-[1rem]">Your Order</p>
              <div className="mb-[1rem]">
                <div className="flex flex-wrap gap-3 justify-center">
                  <p className="w-[100%] flex flex-col items-center loaderContainer">
                    {loading ? <LoadingSpinner/> : ""}
                  </p>
                  {saved?.map((post, index) => {
                    if (post.userId === user.uid) {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            // setProductsId(post.id);
                            // setProducts("Top-Accessories");
                            navigate(`/Buy/${post.category}/${post.id}`);
                          }}
                          className="sm:w-[85vw] lg:w-[95%] max-w-4xl"
                        >
                          <ProductsCard post={post} />
                        </div>
                      );
                    }
                    return "";
                  })}
                </div>
              </div>
              <div className="flex justify-between mx-[1rem] my-[1.5rem] border-y py-[1rem]">
                <p>SUBTOTAL</p>
                <p>{sum}</p>
              </div>
            </div>
          </div>

          <div className="my-[2rem] mx-[1rem]">
            <p className="text-left text-2xl">Payment Method</p>
            <div className="border-[#deab24] border my-[1rem] p-[1rem] text-left">
              <p className="text-center text-xl mb-[0.5rem]">Direct bank transfer</p>
              <p>Make your payment of {sum} directly into our bank account</p>
              <p>Account Number :</p>
              <p>Bank Name: </p>
              <p>Account Name: </p>
              <div className="mt-[1rem]">
                <h2 className="text-center text-2xl">Add photo</h2>
                <p className="text-[12px] mt-[1rem]">
                  Add a screenshot or picture of proof of payment
                </p>
                <div className="flex flex-col">
                  <div>
                    <input
                      className="mt-[1rem]"
                      multiple
                      type="file"
                      accept="image/png , image/jpg"
                      name="Image"
                      onChange={(event) => {
                        setfile1(event.target.files[0]);
                      }}
                    />
                  </div>
                  {errors.file1 && <p className="error">{errors.file1}</p>}
                </div>
              </div> 

              <button onClick={upload}  className="text-white rounded-[20px] bg-[#deab24] font-bold w-[30%] mt-[2rem] py-[0.5rem] px-[1rem]">Upload</button>
            </div>
          </div>


          <div className="flex flex-col items-center">
            <p className="text-2xl">Shipping Details</p>

<form ref={form} onSubmit={sendEmail} className="w-[90%] border-[#deab24] border my-[1rem] flex flex-col px-[1rem] pb-[1rem]">
      <label className="text-left mt-[0.5rem]">Name</label>
      <input onChange={(e) => {
setname(e.target.value)
      }} type="text" name="user_name" className="border-[#deab24] border py-[0.5rem] rounded-[10px] px-[1rem]" />
     {errors.name && <p className="error">{errors.name}</p>}
      <label className="text-left mt-[0.5rem]">Street Address</label>
      <input onChange={(e) => {
setstreet(e.target.value)
      }}  type="text" name="Street" className="border-[#deab24] border py-[0.5rem] rounded-[10px] px-[1rem]"/>
      {errors.street && <p className="error">{errors.street}</p>}
      <label className="text-left mt-[0.5rem]">Town / City</label>
      <input
      onChange={(e) => {
        settown(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border-[#deab24] border"
                type="text"
                name="Town"
              />
              {errors.town && <p className="error">{errors.town}</p>}
              <label className="text-left mt-[0.5rem]">State</label>
      <input
      onChange={(e) => {
        setstate(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border border-[#deab24]"
                type="text"
                name="State"
              />
                 {errors.state && <p className="error">{errors.state}</p>}
                 <label className="text-left mt-[0.5rem]">Phone Number</label>
      <input
      onChange={(e) => {
        setnumber(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border border-[#deab24]"
                type="text"
                name="Phone"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
      <label className="text-left mt-[0.5rem]">Order Message ( Optional )</label>
      <textarea name="message" className="border-[#deab24] border rounded-[10px]" />
      <label className="text-left mt-[0.5rem] opacity-0">Payment Picture</label>
      <input
                     className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      type="text"
                      name="Image"
                     value={image}
                    />

<label className="text-left mt-[0.5rem] opacity-0">Product</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product"
                     value={productOrder}
                    />
    <div>
    <input type="submit" value="Place Order" className="text-white rounded-[20px] bg-[#deab24] font-bold w-[50%] mt-[2rem] py-[0.5rem] px-[1rem]" />
    
        </div>
        </form>
          </div>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
}