// import { Profile } from "./profile";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import db from "../config/firebase";
import { storage } from "../config/firebase";
import { updateDoc, addDoc, collection } from "firebase/firestore";

export function AddProduct() {
  const [user] = useAuthState(auth);

  const [isfile, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [file4, setfile4] = useState("");
  const [file5, setfile5] = useState("");
  const [prices1, setprices1] = useState(null);
  const [prices2, setprices2] = useState(null);
  const [prices3, setprices3] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState("Categories");
  const [categories, setcategories] = useState();
  const [highlight, sethighlight] = useState(false);
  const [size1, setsize1] = useState("");
  const [size2, setsize2] = useState("");
  const [size3, setsize3] = useState("");

  const [errors, seterrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (category === "Categories") {
      tempErrors.category = "Please select a Category";
    }
    if (!isfile) {
      tempErrors.file1 = "Please select a title Picture";
    }
    if (!title) {
      tempErrors.title = "Please add a title";
    }
    if (!description) {
      tempErrors.description = "Please input a description for the product";
    }
    if (!prices1) {
      tempErrors.price = "Please input a price for the product";
    }
    if (isNaN(prices1)) {
      tempErrors.price = "Please input a number";
    }
    seterrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

 

  const upload = async () => {
    setloading(true)
    const docRef = await addDoc(collection(db, "Products"), {
      size1: size1,
      size2: size2,
      size3: size3,
      title: title,
      description: description,
      price1: Number(prices1),
      price2: Number(prices2),
      price3: Number(prices3),
      userId: user?.uid,
      AprilSales: highlight,
      category: category,
      searchKeywords:
        `${title.toLowerCase()} ${category?.toLowerCase()}`.split(
          " "
        ),
    });

    if (isfile == null) return;
    storage
      .ref("/images/" + isfile.name)
      .put(isfile)
      .on("state_changed", alert("Product Successfully uploaded"), alert, () => {
        storage
          .ref("images")
          .child(isfile.name)
          .getDownloadURL()
          .then((imgUrl) => {
            console.log(imgUrl)
            updateDoc(docRef, {
              images: imgUrl,
            //   username: user?.displayName,
            });
          });
      });

    if (file2 == null) return;
    storage
      .ref("/images/" + file2.name)
      .put(file2)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file2.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              images2: imgUrl,
            });
          });
      });

    if (file3 == null) return;
    storage
      .ref("/images/" + file3.name)
      .put(file3)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file3.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              images3: imgUrl,
            });
          });
      });

      
    if (file4 == null) return;
    storage
      .ref("/images/" + file4.name)
      .put(file4)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file4.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              images4: imgUrl,
            });
          });
      });

      
    if (file5 == null) return;
    storage
      .ref("/images/" + file5.name)
      .put(file5)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file5.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              images5: imgUrl,
            });
          });
      });
      setloading(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      upload();

      console.log("form is valid");
      // console.log(isfile.name);
    } else {
      console.log("form is invalid");
      setloading(false)
    }
  };

  return (
    <div>
      <div className="pt-[120px] lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
          <p className="text-center py-[1rem] ">Add A New Product</p>
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit}
              className="w-[90%] bg-[#c0e07d] mb-[2rem] rounded-[10px] flex flex-col px-[1rem] pb-[2.5rem]"
            >
               <div
                onClick={() => {
                  setcategories(!categories);
                }}
                className="flex mt-[2rem] px-[1rem] justify-between border py-[0.5rem] rounded-[10px] items-center bg-white"
              >
                <p>{category}</p>
                <p>&#8964;</p>
              </div>
              {errors.category && <p className="error">{errors.category}</p>}

              {categories ? (
                <div className="flex flex-col items-center mt-[1rem] bg-blue-300 py-[1rem] rounded-[10px]">
                  <p
                    onClick={() => {
                      setcategories(false);
                      setcategory("Yharz The Brand");
                    }}
                    className="w-[100%] text-center pb-[0.5rem]"
                  >
                    Yharz The Brand
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className="mt-[2rem]">
                <h2>Add photo</h2>
                <p className="text-[12px] mt-[1rem]">
                  First picture is the title picture
                </p>
                <div className="flex flex-col">
                  <div>
                    <input
                      className="mt-[1rem]"
                      type="file"
                   
                      name="photos"
                      onChange={(event) => {
                        setfile1(event.target.files[0]);
                      }}
                    />
                    {errors.file1 && <p className="error">{errors.file1}</p>}
                  </div>

                   <div>
                    <input
                      className="mt-[1rem]"
                      type="file"
                      name="photos2"
                      onChange={(event) => {
                        setfile2(event.target.files[0]);
                        console.log(event.target.files[0]);
                      }}
                    />
                  </div>

                   <div>
                    <input
                      className="mt-[1rem]"
                      type="file"
                      name="photos3"
                      onChange={(event) => {
                        setfile3(event.target.files[0]);
                      }}
                    />
                  </div> 
                  
                  <div>
                    <input
                      className="mt-[1rem]"
                      type="file"
                      name="photos4"
                      onChange={(event) => {
                        setfile4(event.target.files[0]);
                      }}
                    />
                  </div> 
                  
                   <div>
                    <input
                      className="mt-[1rem]"
                      type="file"
                      name="photos5"
                      onChange={(event) => {
                        setfile5(event.target.files[0]);
                      }}
                    />
                  </div> 
                </div>
                <p className="text-[12px] mt-[1rem]">
                  Each picture must not exceed 5MB
                </p>
                <p className="text-[12px]">
                  Supported formats are *.jpg and *jpeg
                </p>
              </div>


              <input
                className="mt-[1rem] py-[0.5rem] rounded-[10px] px-[1rem]"
                type="text"
                placeholder="TITLE*"
                name="title"
                onChange={(e) => {settitle(e.target.value)}}
                // value={values.title}
                // {...register("title")}
              />
              {errors.title && <p className="error">{errors.title}</p>}
              <input
                className="mt-[1rem] py-[0.5rem] rounded-[10px] px-[1rem]"
                type="text"
                placeholder="size"
                name="size1"
                onChange={(e) => {setsize1(e.target.value)}}
                // value={values.title}
                // {...register("title")}
              />

              
              <textarea
                rows="4"
                cols="50"
                className="mt-[1rem] p-[0.5rem] rounded-[10px]"
                placeholder="Description*"
                name="description"
                onChange={(e) => {setdescription(e.target.value)}}
                // value={values.description}
                // {...register("description")}
              />
              {errors.description && <p className="error">{errors.description}</p>}

              <div className="relative">
                <input
                  className="mt-[1rem] py-[0.5rem] rounded-[10px] px-[3rem] w-[100%]"
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={(e) => {
                    setprices1(e.target.value)
                  }}
                  // value={Number(values.price)}
                  // {...register("price")}
                />
                <svg
                  fill="#000000"
                  width="20"
                  height="20"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496.262 496.262"
                  className="absolute top-[48%] left-[2%]"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              {errors.price && <p className="error">{errors.price}</p>}

             
              <input
                type="submit"
                value={loading ? "Sending Product..." : "Post Ad"}
                className="text-center bg-[#3EB812] text-white mt-[2rem] border py-[0.5rem] rounded-[10px] items-center"
              />
            </form>
          </div>
        </div>
    </div>
  );
}