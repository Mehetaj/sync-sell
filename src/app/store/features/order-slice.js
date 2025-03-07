import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  orders: [],
  status: "idle",
  loading: false,
  error: null,
};

// Async Thunks

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("/api/order");
  return response.data.orders;
});

// Add a new order
export const addOrder = createAsyncThunk("orders/addOrder", async (newOrder) => {
  await axios.post("/api/order", newOrder);
  const response = await axios.get("/api/order"); // Fetch updated orders list
  return response.data.orders;
});

// Edit an existing order
export const editOrder = createAsyncThunk("orders/editOrder", async ({ updatedOrder, id }) => {
  await axios.patch(`/api/order/${id}`, updatedOrder);
  const response = await axios.get("/api/order");
  return response.data.orders;
});

// Delete an order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
  await axios.delete(`/api/order/${id}`);
  const response = await axios.get("/api/order");
  return response.data.orders;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })

      // Add Order
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        toast.success("Order placed successfully");
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to place order";
      })

      // Edit Order
      .addCase(editOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        toast.success("Order updated successfully");
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        toast.success("Order deleted successfully");
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete order";
      });
  },
});

export default orderSlice.reducer;
