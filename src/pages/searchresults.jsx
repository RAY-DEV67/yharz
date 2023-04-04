import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { EcommerceCard } from "../components/ecommerceCard";
import db from "../config/firebase";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { TopCard } from "../components/topcard";
import { Search } from "../components/search";
import LoadingSpinner from "../components/spinner";

export function SearchResult() {
  const {search} = useParams()
  const navigate = useNavigate();


  const [results, setresults] = useState([]);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(true);
  const [empty, setempty] = useState(false);
 
console.log(error)
 

  useEffect(() => {
  try{
    setloading(true)
  let unsubscribe;
  if(search.toLowerCase().split(" ").length > 0){
    let query = db.collection("Products")
    query = query.where("searchKeywords", "array-contains-any", search.toLowerCase().split(" ")).limit(10)
query.get().then((querySnapshot) => {
  const productDoc = []
  querySnapshot.forEach((doc) => {
    productDoc.push({id: doc.id, ...doc.data()})
  })
  setresults(productDoc)
  setloading(false)
  if(productDoc.length === 0){setempty(true)
}
})
  }
  return () => {
    if (unsubscribe) {
      unsubscribe()
    }
  }
  } catch (err) {
    seterror(err)
    console.log(err)
   }
  }, [search]);

  return (
    <div className="pt-[90px] lg:absolute lg:top-[13%] lg:left-[35%] lg:w-[60%] lg:z-[-1]">
        <Search/>
      <div >
      <p className="mx-[1rem] text-left text-xl">Search Results for {search}:</p>
      <div className="flex">
      </div> 
      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">{loading ? <LoadingSpinner/> : ""}</p>
      <p className="w-[100%] text-xl">{empty ? <div className="flex flex-col items-center justify-center">
        <svg width="40%" viewBox="0 -2.5 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M87.538 92.1827C97.9431 92.1645 106.519 94.2223 114.589 98.2723C116.331 99.0502 117.883 100.197 119.138 101.632C119.933 102.664 120.369 104.903 119.77 105.838C119.061 106.944 117.043 107.783 115.639 107.724C113.96 107.656 112.218 106.694 110.692 105.799C98.8416 98.8465 86.2305 98.0448 73.1575 101.083C66.1964 102.7 60.7311 106.722 56.2288 112.153C55.7263 112.759 55.2808 113.415 54.7797 114.021C53.7294 115.286 52.7144 117.294 50.7784 115.975C48.8824 114.685 49.353 112.551 50.4074 110.829C54.8386 103.583 60.9255 98.3014 68.9991 95.4147C74.9745 93.3853 81.2285 92.2951 87.538 92.1827Z" fill="#000000"></path> <path d="M54.0803 78.0532C49.5096 77.8419 45.3919 76.3223 42.2702 72.6393C40.9518 71.0819 39.9117 69.2014 41.677 67.5533C43.3916 65.9518 44.9043 67.2879 46.2816 68.6632C52.0293 74.3986 59.4542 72.6177 62.1736 64.9002C62.5481 63.8384 62.8954 62.7651 63.3248 61.7271C64.0019 60.0945 65.3176 58.879 66.9746 59.6333C67.5691 59.9691 68.0816 60.4329 68.475 60.9909C68.8685 61.5489 69.1331 62.1873 69.2498 62.86C69.4694 65.0038 69.1479 67.1683 68.3148 69.1557C67.4816 71.1431 66.1634 72.8899 64.4806 74.2361C61.5181 76.7328 58.0301 77.8277 54.0803 78.0532Z" fill="#000000"></path> <path d="M105.686 73.2745C103.031 73.029 100.473 72.1462 98.2312 70.701C95.9893 69.2558 94.1294 67.2912 92.8092 64.9735C91.9507 63.3999 91.5519 61.6166 91.658 59.8271C91.7061 58.825 92.9818 57.254 93.8994 57.1037C94.7566 56.9601 96.4048 58.1464 96.7671 59.1019C97.7225 61.6283 98.9665 63.733 101.334 65.1428C105.489 67.6171 108.169 66.9033 110.372 62.6372C112.149 59.1973 113.868 58.0422 115.853 58.9536C117.709 59.8061 118.149 62.2297 117.064 65.6323C115.548 70.3954 111.681 73.2393 105.686 73.2745Z" fill="#000000"></path> <path d="M41.2736 52.0625C39.2472 51.067 37.2845 49.9469 35.3967 48.7087C34.8874 48.3396 34.9017 46.8018 35.1895 45.9797C35.3249 45.6005 36.8146 45.3133 37.4769 45.5612C44.0702 48.0382 48.9443 44.7885 53.5347 40.7852C54.8714 39.6192 55.8025 37.9974 56.9746 36.6316C58.1258 35.2915 59.5126 34.0584 61.3084 35.2773C63.0656 36.4725 62.5476 38.3143 61.7621 39.8406C58.5835 46.0162 53.0858 49.0581 46.6312 50.6832C45.002 51.0936 43.3132 51.2573 41.6494 51.535C41.5235 51.7106 41.3982 51.8864 41.2736 52.0625Z" fill="#000000"></path> <path d="M111.841 48.0808C105.864 47.6597 100.966 45.7027 97.2146 41.373C96.3542 40.4872 95.7235 39.4044 95.3775 38.2189C95.1933 37.3169 95.5935 35.7925 96.2619 35.3612C96.9302 34.9298 98.7267 35.1486 99.2 35.7424C103.127 40.6707 108.366 41.8768 114.283 41.6337C116.029 41.562 117.843 42.0753 117.963 44.2638C118.074 46.2817 116.616 47.2432 114.824 47.6427C113.733 47.8865 112.609 47.9725 111.841 48.0808Z" fill="#000000"></path> <path d="M3.29432 55.9748C-3.71551 83.5259 2.42283 107.831 21.5516 128.223C22.0499 128.75 22.5571 129.277 23.065 129.785C33.34 140.06 46.1388 146.404 56.2804 150.819C60.6324 152.719 82.9668 155.028 89.0089 154.128C124.92 148.765 148.553 128.511 156.783 94.625C158.355 87.9873 159.138 81.1873 159.115 74.3661C159.154 58.2974 152.388 39.6163 138.435 25.6251C136.999 24.4373 135.568 23.2069 134.183 22.0145C131.181 19.4339 128.078 16.762 124.832 14.4834C100.034 -2.97008 74.2695 -3.06774 48.2549 6.1875C24.701 14.5618 9.57486 31.3158 3.29432 55.9748ZM48.3557 14.4373C71.181 4.95246 94.0828 3.27855 116.419 17.4844C120.504 20.0847 131.392 28.8849 133.106 30.2067L133.216 30.2879L133.307 30.3889C142.021 39.6299 152 56.5268 151.78 73.8963C151.707 81.3232 150.702 88.7115 148.787 95.8878C143.113 116.511 129.548 131.541 107.317 141.821C84.7172 152.642 52.3062 141.702 43.6828 136.01C34.1511 129.493 25.8111 121.386 19.0272 112.043C8.38782 96.9802 6.0002 75.3276 11.714 55.5339C14.3899 46.3946 19.0661 37.9653 25.4035 30.8571C31.7409 23.7489 39.5807 18.1401 48.3544 14.4373H48.3557Z" fill="#000000"></path> </g></svg>
        <p className="mt-[0.5rem]">No Results Found</p>
      </div>: ""}</p>
      <div className="flex flex-wrap gap-3 justify-center mb-[1rem]">
      {results.map((post, index) => {
            return (
              <div
              key={index}
              onClick={() => {
                navigate(`/Buy/Products/${post.category}/${post.id}`);
              }}
              className="lg:w-[95%] max-w-4xl"
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