import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import newArrivalReducer from "./features/new-arrival-slice";
import catalogReducer from "./features/catalog-slice";
import productReducer from "./features/product-slice";
import contactReducer from "./features/contact-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newArrival: newArrivalReducer,
    catalog: catalogReducer,
    product: productReducer,
    contact: contactReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
