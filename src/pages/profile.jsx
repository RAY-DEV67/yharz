import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SetShowCart } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import logo from "../Assets/dioLogo.webp"

export function Profile() {
  const [user] = useAuthState(auth);
  const setshowcart = useContext(SetShowCart);
  const navigate = useNavigate();

  const SignUserOut = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div className="profile pt-[120px] h-[100vh]">
      {user ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center border rounded-[10px]  mt-[2rem] w-[80%] ">
            <div className="flex flex-col items-center topnav mb-[1rem] py-[1rem] rounded-[10px] bg-[#c0e07d] text-[#282828] font-bold w-[100%]">
              <p className="mr-[0.5rem] mb-[0.5rem] text-[1.5rem]">
                Welcome Back
              </p>

              <svg
                viewBox="0 0 24 24"
                width="100px"
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
                    opacity="0.4"
                    d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                    fill="#292D32"
                  ></path>{" "}
                  <path
                    d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                    fill="#292D32"
                  ></path>{" "}
                  <path
                    d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
                    fill="#292D32"
                  ></path>{" "}
                </g>
              </svg>
              <div className="flex items-center">
                <p className="mr-[0.3rem] mb-[0.5rem] text-[1rem]">
                  {" "}
                  {user?.displayName}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-[2rem] w-[100%]">
              <div
                onClick={() => {
                    navigate(`/Cart/${user?.uid}`)
                }}
                className="rounded-[20px] bg-[#c0e07d] text-[#282828] font-bold mb-[0.5rem] mt-[rem] w-[50%] p-[0.5rem]"
              >
                <p className="text-center">View Cart</p>
              </div>
              <button
                onClick={SignUserOut}
                className="rounded-[20px] w-[50%] bg-[#c0e07d] text-[#282828] font-bold mb-[0.5rem] p-[0.5rem]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="border login-page w-[90%] pb-[1rem] rounded-[10px]">
              <div className="flex flex-col items-center justify-center py-[1rem] bg-[#c0e07d] text-[#282828] font-bold rounded-t-[10px]">
                {/* <img src={logo} alt="Logo" className="w-[25vw] " /> */}
                <p className="mt-[0.5rem]">YHARZ THE BRAND</p>
              </div>
              <p className="mt-[2rem] px-[1rem] text-[2rem] text-center mb-[0.5rem] text-bolder">
                Login
              </p>
              <p className="px-[1rem] text-center">Get access to your favorites and orders</p>
              <div className="flex flex-col items-center">
                <div
                  onClick={signInWithGoogle}
                  className="border font-bold sign-in-google rounded-[20px] bg-[#c0e07d] text-[#282828] cursor-pointer w-[60%] py-[0.3rem] mt-[2rem] flex justify-center"
                >
                  <svg
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="mx-[0.5rem]"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>Google-color</title>{" "}
                      <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                      <g
                        id="Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        {" "}
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          {" "}
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            {" "}
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <p>Sign in with Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
