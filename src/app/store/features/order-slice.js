import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

// Initial state
const initialState = {
  orders: [], // Stores all orders
  userOrders: {}, // Stores user-specific order (single object)
  loading: false,
  error: null,
}

// Async Thunks

// Fetch orders for a specific user
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/order?email=${email}`)
    return response.data.orders // Expecting an object
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch your orders")
  }
})

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/order`)
    return response.data.orders // Expecting an array
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch orders")
  }
})

// Add a new order
export const addOrder = createAsyncThunk("orders/addOrder", async (newOrder, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/order", newOrder)
    return response.data.order
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to place order")
  }
})

// Edit an existing order
export const editOrder = createAsyncThunk("orders/editOrder", async ({ updatedOrder, id }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/api/order/${id}`, updatedOrder)
    return response.data.order
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update order")
  }
})

// Delete an order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/order/${id}`)
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete order")
  }
})

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearUserOrders: (state) => {
      state.userOrders = {} // Clear user orders
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.userOrders = action.payload // Expecting an object
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch your orders"
      })

      // Fetch all Orders (✅ Fixed)
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload // ✅ Corrected
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
        state.orders.push(action.payload) // ✅ Add to global orders
        state.userOrders = action.payload // ✅ Update latest user order
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
        const updatedOrder = action.payload
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
        if (state.userOrders._id === updatedOrder._id) {
          state.userOrders = updatedOrder // ✅ Update user order
        }
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
        const deletedOrderId = action.payload
        state.orders = state.orders.filter((order) => order._id !== deletedOrderId)
        if (state.userOrders._id === deletedOrderId) {
          state.userOrders = {} // Clear deleted user order
        }
        toast.success("Order deleted successfully")
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to delete order"
        toast.error(action.payload || "Failed to delete order")
      })
  },
})

export const { clearUserOrders } = orderSlice.actions
export default orderSlice.reducer
