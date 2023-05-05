import Footer from "../components/footer";
import { Search } from "../components/search";
import { useState, useEffect } from "react";
import db from "../config/firebase";
import { TopCard } from "../components/topcard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/spinner";
// import bag2 from "../assets/bags2.webp";
import yarz from "../assets/yarz.jpg";
// import shoe1 from "../assets/shoe1.webp";
// import shoe2 from "../assets/shoe2.webp";

export function LandingPage() {
  const navigate = useNavigate();

  const [clothsList, setclothsList] = useState([]);
  const [shoelist, setshoelist] = useState([]);
  const [lastDocuments, setlastDocuments] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [empty, setempty] = useState(false);
  const [empty2, setempty2] = useState(false);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          const lastDoc = collections.docs[collections.docs.length - 1];
          setclothsList(cloths);
          setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setempty(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);


  return (
    <div className="lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
      <div className="relative text-left border-b rounded-b-[20px] pt-[16%] lg:pt-[8%] lg:top-[25%]">
        <img src={yarz} alt="Cadmus" className="w-[100%] animate-zoom-in-fade"/>
      </div>
      <Search />
      <div className="flex justify-between p-2 px-[1.5rem] mb-[1rem] text-[#282828] bg-[#c0e07d] font-bold rounded-[20px] heading">
        <h2 className="uppercase">Collections</h2>
        <p
          onClick={() => {
            navigate("/All-Bags-Products");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {empty && "Please Check Your Network Connection"}
      </p>

      <div className="flex lg:flex flex-wrap gap-3 justify-center mb-[1rem]">
        {clothsList.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className="flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>

           <Footer />
    </div>
  );
}
