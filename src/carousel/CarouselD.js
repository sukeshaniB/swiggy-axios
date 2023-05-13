import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./style.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
function CarouselD() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const url =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.145923&lng=79.08762999999999&page_type=DESKTOP_WEB_LISTING";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data.cards[0].data.data.cards);
        setCards(json.data.cards[0].data.data.cards);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="back-ground color">
        <div className="data">
          <Carousel breakPoints={breakPoints}>
            {cards.map((values) => {
              return (
                <Item>
                  <img
                    className="position"
                    src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/${values.data.creativeId}`}
                    alt=""
                  />
                </Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default CarouselD;
