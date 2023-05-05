import { useState } from "react";
import db from "../config/firebase";
import { Search } from "../components/search";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Footer } from "../components/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopCard } from "../components/topcard";
import LoadingSpinner from "../components/spinner";

export function ProductsPage() {
  const { product } = useParams();
  const navigate = useNavigate();

  const [clothsList, setclothsList] = useState([]);
  const [lastDocuments, setlastDocuments] = useState(null);
  const [isEmpty, setisEmpty] = useState(false);
  const [hasmore, sethasmore] = useState(true);
  const [loading, setloading] = useState(false);
  const [empty, setempty] = useState(false);

  console.log(isEmpty);
  console.log(loading);

  // console.log(locationlist);

  useEffect(() => {
    setloading(true);
    setempty(false);
    db.collection("Products")
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        const lastDoc = collections.docs[collections.docs.length - 1];
        setclothsList(cloths);
        setlastDocuments(lastDoc);
        setloading(false);
        if (cloths.length === 0) {
          setempty(true);
        }
      });
  }, []);


  console.log(clothsList.length)
 
  return (
    <div>
      <div className="lg:absolute lg:top-[13%] pt-[90px] lg:left-[35%] lg:z-[-1] lg:w-[60%]">
        <p className="mt-[rem] font-bold text-2xl text-center border-y border-[#c0e07d] py-[1rem]">Yharz The Brand</p>
        <Search />

        {/* <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
          {loading ? (
            <img alt="Logo" className="loader mb-[-1rem]" src={logo1} />
          ) : (
            ""
          )}
        </p>

        <p className="w-[100%] text-center text-2xl">
          {empty ? "No Results Found!!" : ""}
        </p> */}

<div className="flex lg:flex flex-wrap gap-3 justify-center mb-[1rem]">
        {clothsList.map((post, index) => {
            return (
              <div
              key={index}
              className="max-w-4xl"
            >
                <TopCard post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}