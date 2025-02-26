import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial Cart State
const initialState = {
  items: [],
  status: "idle",
  loading: false,
  error: null,
};

// **Fetch Cart Items**
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("/api/cart");
  return response.data.Carts;
});

// **Add Item to Cart**
export const addToCart = createAsyncThunk("cart/addToCart", async (newItem) => {
  const response = await axios.post("/api/cart", newItem);
  return response.data.Carts;
});

// **Remove Item from Cart**
export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id) => {
  await axios.delete(`/api/cart/${id}`);
  return id;
});

// **Update Item Quantity**
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }) => {
    const response = await axios.patch(`/api/cart/${id}`, { quantity });
    return response.data.Carts;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        toast.success("Item added to cart");
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        toast.success("Item removed from cart");
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
