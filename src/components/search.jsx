// import { Topnav } from "./topnav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Search() {

  const navigate = useNavigate();

  const [search, setsearch] = useState("");
 

    return ( <div >
      <form className="flex flex-col items-center relative" onSubmit={() => { navigate(`/Search/${search}`)}}>
        <input
          type="text"
          placeholder="What are you looking for..."
          onChange={(e) => {setsearch(e.target.value)}}
          className="border w-[90%] my-[2rem] rounded-xl pl-[5rem] py-[0.5rem]"
        />
       <div>
       <svg
          fill="#000000"
          width="30px"
          height="30px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          className="absolute left-[7%] top-[35%]"
          onClick={() => { navigate(`/Search/${search}`) }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="m14.91 13.09-3.68-3.21a4.86 4.86 0 0 0 .86-2.77A5.34 5.34 0 0 0 6.59 2a5.35 5.35 0 0 0-5.5 5.15 5.34 5.34 0 0 0 5.5 5.15 5.71 5.71 0 0 0 3.82-1.44L14.08 14zM6.59 11a4.09 4.09 0 0 1-4.25-3.9 4.09 4.09 0 0 1 4.25-3.9 4.09 4.09 0 0 1 4.25 3.9A4.08 4.08 0 0 1 6.59 11z"></path>
          </g>
        </svg>
       </div>
      </form>
    </div> );
}

