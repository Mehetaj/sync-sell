import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

// Initial state
const initialState = {
  orders: [],
  loading: false,
  error: null,
}

// Async Thunks

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/order")
    return response.data.orders
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch orders")
  }
})

// Add a new order
export const addOrder = createAsyncThunk("orders/addOrder", async (newOrder, { rejectWithValue }) => {
  try {
    await axios.post("/api/order", newOrder)
    const response = await axios.get("/api/order") // Fetch updated orders list
    return response.data.orders
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to place order")
  }
})

// Edit an existing order
export const editOrder = createAsyncThunk("orders/editOrder", async ({ updatedOrder, id }, { rejectWithValue }) => {
  try {
    await axios.patch(`/api/order/${id}`, updatedOrder)
    const response = await axios.get("/api/order")
    return response.data.orders
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update order")
  }
})

// Delete an order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/order/${id}`)
    const response = await axios.get("/api/order")
    return response.data.orders
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete order")
  }
})

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch orders"
      })

      // Add Order
      .addCase(addOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        toast.success("Order placed successfully")
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to place order"
        toast.error(action.payload || "Failed to place order")
      })

      // Edit Order
      .addCase(editOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        toast.success("Order updated successfully")
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to update order"
        toast.error(action.payload || "Failed to update order")
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        toast.success("Order deleted successfully")
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to delete order"
        toast.error(action.payload || "Failed to delete order")
      })
  },
})

export default orderSlice.reducer

