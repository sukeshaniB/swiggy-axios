import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../redux/actions/productsActions";
import { Pressable, Text, ScrollView, View } from "react-native";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/reducers/CartReducer";

import "./productinfo.css";

const ProductDetails = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  let product = useSelector((state) => state.product);
  const { productId } = useParams();
  console.log(productId);
  const { name } = product;

  const dispatch = useDispatch();
  useEffect(() => {
    let timer1 = setLoading(true);
    const url = `https://www.swiggy.com/dapi/menu/v4/full?lat=21.145923&lng=79.08762999999999&menuId=${productId}`;

    const fetchProducts = async (id) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data);
        dispatch(selectedProduct(json.data));
      } catch (error) {
        console.log("error", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      return () => {
        clearTimeout(timer1);
      };
    };
    fetchProducts();
  }, []);

  console.log("Product:", product);
  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="main-content">
          <div className="relative flex cards-center">
            {Object.keys(product).length === 0 ? (
              <div>data not found</div>
            ) : (
              <>
                <ScrollView style={{ marginTop: 50 }}>
                  <View
                    style={{
                      height: 300,
                      backgroundColor: "B0C4DE",
                      borderBottomLeftRadius: 400,
                      borderBottomRightRadius: 400,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 17,
                        fontWeight: "500",
                        marginTop: 10,
                      }}
                    >
                      Menu
                    </Text>
                    <Text
                      style={{
                        borderColor: "gray",
                        borderWidth: 1.6,
                        height: 1,
                        marginTop: 12,
                      }}
                    ></Text>

                    {Object.entries(product.menu.items).map(
                      ([key, item], index) => (
                        <h5 key={key}>
                          <Text style={{ fontSize: 18, fontWeight: 600 }}>
                            {item.name}
                          </Text>
                          <Text>
                            <p className="mt-1 text-base font-normal">
                              {item.price > 0
                                ? new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  }).format(item.price / 100)
                                : " "}
                              <br />
                              {item.attributes.portionSize}
                              <Text
                                style={{
                                  width: 180,
                                  marginTop: 8,
                                  color: "gray",
                                  fontSize: 16,
                                }}
                              >
                                {(index ? " | " : "") + item.description}
                              </Text>
                            </p>
                          </Text>
                          <Pressable>
                            <div
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: 9,
                              }}
                            >
                              <img
                                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.cloudinaryImageId}`}
                                alt={name}
                              />
                            </div>
                            {selected ? (
                              <Pressable
                                style={{
                                  position: "absolute",
                                  top: 140,
                                  left: 50,
                                  flexDirection: "row",
                                  paddingHorizontal: 25,
                                  paddingVertical: 17,
                                  alignItems: "center",
                                  backgroundColor: "white",
                                  borderRadius: 5,
                                }}
                              >
                                <Pressable
                                  onPress={() => {
                                    if (additems === 1) {
                                      dispatch(removeFromCart(item));
                                      setSelected(false);
                                      setAddItems(0);
                                    } else {
                                      setAddItems((c) => c - 1);
                                      dispatch(decrementQuantity(item));
                                    }
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 25,
                                      color: "green",
                                      paddingHorizontal: 6,
                                    }}
                                  >
                                    -
                                  </Text>
                                </Pressable>

                                <Pressable>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: "green",
                                      paddingHorizontal: 6,
                                    }}
                                  >
                                    {additems}
                                  </Text>
                                </Pressable>
                                <Pressable
                                  onPress={() => {
                                    setAddItems((c) => c + 1);
                                    dispatch(incrementQuantity(item));
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: "green",
                                      paddingHorizontal: 6,
                                    }}
                                  >
                                    +
                                  </Text>
                                </Pressable>
                              </Pressable>
                            ) : (
                              <Pressable
                                onPress={() => {
                                  setSelected(true);
                                  if (additems === 0) {
                                    setAddItems((c) => c + 1);
                                  }
                                  dispatch(addToCart(item));
                                }}
                                style={{
                                  position: "absolute",
                                  top: 90,
                                  left: 20,

                                  flexDirection: "row",
                                  paddingHorizontal: 25,
                                  paddingVertical: 10,
                                  alignItems: "center",
                                  backgroundColor: "white",
                                  borderRadius: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 22,
                                    fontWeight: "600",
                                    color: "#018749",
                                  }}
                                >
                                  ADD
                                </Text>
                              </Pressable>
                            )}
                          </Pressable>
                        </h5>
                      )
                    )}
                  </View>
                </ScrollView>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
