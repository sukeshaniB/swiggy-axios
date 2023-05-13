import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import CarouselD from "../carousel/CarouselD";
const ProductListing = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer1 = setLoading(true);
    const url =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.145923&lng=79.08762999999999&page_type=DESKTOP_WEB_LISTING";
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data.cards[2].data.data.cards);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        dispatch(setProducts(json.data.cards[2].data.data.cards));
      } catch (error) {
        console.log("error", error);
      }
      return () => {
        clearTimeout(timer1);
      };
    };

    fetchProducts();
  }, []);
  console.log("Products :", products);
  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="main-content">
          <>
            <CarouselD />
            <div className="ui grid container">
              <ProductComponent />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default ProductListing;



