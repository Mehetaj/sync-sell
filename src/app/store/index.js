import { configureStore } from "@reduxjs/toolkit";
import newArrivalReducer from "./features/new-arrival-slice";
import catalogReducer from "./features/catalog-slice";
import productReducer from "./features/product-slice";
import contactReducer from "./features/contact-slice";
import cartReducer from "./features/cart-slice";
import orderReducer from "./features/order-slice";

export const store = configureStore({
  reducer: {
    newArrival: newArrivalReducer,
    catalog: catalogReducer,
    product: productReducer,
    contact: contactReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
