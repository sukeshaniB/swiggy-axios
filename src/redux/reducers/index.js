import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import { productsReducer,selectedProductsReducer} from "./productsReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  cart:CartReducer,
});
export default reducers;