import {
    // getDoc,
    getDocs,
    collection,
    doc,
    // addDoc,
    where,
    query,
    deleteDoc,
  } from "firebase/firestore";
  import db from "../config/firebase";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useState} from "react";
  import { auth} from "../config/firebase";
  import { useNavigate } from "react-router-dom";
  
  export function EcommerceCard(props) {
    const { post } = props;
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [Cart, setCart] = useState([]);
    const [loading, setloading] = useState(false);
  
    const removeCart = async () => {
      setloading(true)
      try {
  
        const docRef = collection(db, "Cart");
        const CartToDeleteQuery = query(
          docRef,
          where("postId", "==", post?.id),
          where("userId", "==", user?.uid)
        );
  
        const CartToDeleteData = await getDocs(CartToDeleteQuery);
        const CartToDelete = doc(db, "Cart", post.id);
        await deleteDoc(CartToDelete);
        window.location.reload()
        console.log("DocumentDeleted");
        setloading(false)
        if (user) {
          setCart((prev) =>
            prev.filter((like) => like.saveId === CartToDeleteData?.docs[0].id)
          );
          console.log(Cart);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const formatCur = function (value, locale, currency) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
  
      
  
    console.log(post)
  
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
        <div className="border-y border-[#deab24] lg:h-[190px] w-[90vw] lg:w-[100%] flex rounded-[10px]">
          <div className="w-[40%]">
            <img
              src={post.images}
              alt="Product"
              className="rounded-[10px] h-[150px] w-[100%]"
              onClick={() => {
                navigate(`/Buy/Products/${post.category}/${post.id}`);
              }}
            />
          </div>
          <div className="ml-[1rem]">
            <div>
              <div className="flex justify-between w-[40vw]">
                <h1 className="text-[#deab24] font-bold mt-[0.5rem] text-left">{formatCur(post.price , 'en-NG' , "NGN")}</h1>
                {loading ? (
              <div className="spinner-container px-[0.5rem] pt-[0.5rem] flex justify-center items-center">
                <div className="Cartloading-spinner"></div>
              </div>
            ) : (
              <p className="mt-[0.5rem]" onClick={() => {removeCart()}}>X</p>
            )}
              
              </div>
              {/* <p>{post.id}</p> */}
              <div className="w-[90%]">
                <h1 className="text-left mt-[1rem] text-xl">{post.title}</h1>
              </div>
            </div>
  
          </div>
        </div>
      </div>
  
      </div>  );
  }
  