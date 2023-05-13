import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../redux/actions/productsActions";
import { Input, Header, Segment } from "semantic-ui-react";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const Search = () => {
  //for search
  const [img, setImg] = useState("");
  const inputEvent = (event) => {
    const data = event.target.value;
    console.log(data);
    setImg(data);
  };
  //img button

  let product = useSelector((state) => state.product);
  const { id, name, cuisines, price, cloudinaryImageId } = product;
  const dispatch = useDispatch();
  useEffect(() => {
    const url = `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=21.145923&lng=79.08762999999999`;

    const fetchProducts = async (id) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data.cards[1].card.card);
        dispatch(selectedProduct(json.data.cards[1].card.card));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProducts();
  }, []);

  console.log("Product:", product);

  return (
    <div className="relative flex cards-center">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <Segment></Segment>
          <div style={styles}>
            <div class="ui icon input">
              <Input
                type="text"
                placeholder="Search for restaurants and food"
                style={{ width: "370px", height: "40px" }}
                className="search"
                value={img}
                onChange={inputEvent}
              />
              <i class="search icon"></i>
            </div>
          </div>
          <Header as="h2" icon textAlign="center">
            <Header.Content>{product.header.title}</Header.Content>
          </Header>

          <div className="ui container">
            <div class="ui equal width padded grid"></div>
            <div class="ui grid">
              <div class="ui equal width row">
                <div class="ui column">
                  <div class="ui padded grid">
                    <div class="ui white row">
                      <div className="gameStatistics"></div>

                      {product.imageGridCards.info &&
                        product.imageGridCards.info.map((user, index) => (
                          <div className="item-container">
                            <img
                              src={`
https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${user.imageId}`}
                              style={{ width: "80px" }}
                              alt={name}
                              size="medium"
                              centered
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
