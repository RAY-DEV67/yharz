import { useNavigate } from "react-router-dom";
 
 export function ProductsCard(props) {
    const { post } = props;
    const navigate = useNavigate();

    const formatCur = function (value, locale, currency) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center w-[100%] mt-[0.5rem] productfont">
        <div className="border-y border-[#282828] w-[80vw] lg:w-[100%] lg:h-[190px] flex rounded-[10px]">
          <div className="w-[40%]">
            <img
              src={post.images}
              alt="Product"
              className="rounded-[10px] h-[150px] w-[200px]"
              onClick={() => {
                // setProductsId(post.id);
                navigate(`/Buy/Products/${post.category}/${post.id}`);
                // setProducts("Top-Shoes");
              }}
            />
          </div>
          <div className="ml-[1rem]">
            <div>
              <div className="flex justify-between w-[40vw]">
                <h1 className="text-[#282828] font-bold mt-[0.5rem] text-left">{formatCur(post.price1 , 'en-NG' , "NGN")}</h1>
              </div>
  
              <div>
                <h1 className="text-left text-xl">{post.title}</h1>
              </div>
            </div>
  
  
            {/* <div>
              <p className="mt-[4rem] border px-[1rem] mx-[1rem] text-center">
                Add to cart
              </p>
            </div> */}
          </div>{" "}
        </div>
      </div>
  
      </div>  );
  }
  