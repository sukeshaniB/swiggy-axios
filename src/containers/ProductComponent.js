import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScrollView, Text, View } from "react-native";
import StarsIcon from "@mui/icons-material/Stars";
import Shimmer from "react-js-loading-shimmer";
const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { title } = product;
    console.log(product.data);

    return (
      <View style={{ margin: 30 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Shimmer height={"500px"} />
          <div className="product_info">
            <div className="four wide column" key={8}>
              <Link to={`/product/${product.data.id}`}>
                <div className="ui link cards">
                  <div className="card">
                    <div className="image">
                      <img
                        src={`
https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${product.data.cloudinaryImageId}`}
                        alt={title}
                      />
                    </div>

                    <Text
                      style={{ marginTop: 10, fontSize: 17, fontWeight: "500" }}
                    >
                      {product.data.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 3,
                      }}
                    >
                      <StarsIcon name="stars" size={24} color="success" />
                      <Text style={{ marginLeft: 4 }}>
                        {product.data.avgRating}
                      </Text>
                      <Text style={{ marginLeft: 4 }}>.</Text>
                      <Text style={{ marginLeft: 4 }}>
                        {product.data.slaString}
                      </Text>
                      <Text style={{ marginLeft: 4 }}>.</Text>
                      <Text
                        style={{
                          marginLeft: 4,
                          fontSize: 15,
                          fontWeight: "400",
                        }}
                      >
                        {product.data.costForTwoString}
                      </Text>
                    </View>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </ScrollView>
      </View>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
