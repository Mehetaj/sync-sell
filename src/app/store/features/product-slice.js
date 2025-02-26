import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  items: [],
  status: "idle",
  loading: false,
  error: null,
};

// Async Thunks

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/pds"); // Update API endpoint
    return response.data.Pdss; // Update to use 'Pdss' instead of 'products'
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    await axios.post("/api/pds", newProduct); // Update API endpoint
    const response = await axios.get("/api/pds"); // Fetch updated products list
    return response.data.Pdss; // Update to use 'Pdss' instead of 'products'
  }
);

// Edit an existing product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ updatedProduct, id }) => {
    await axios.patch(`/api/pds/${id}`, updatedProduct); // Update API endpoint
    const response = await axios.get("/api/pds"); // Fetch updated products list
    return response.data.Pdss; // Update to use 'Pdss' instead of 'products'
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`/api/pds/${id}`); // Update API endpoint
    const response = await axios.get("/api/pds"); // Fetch updated products list
    return response.data.Pdss; // Update to use 'Pdss' instead of 'products'
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states for each async thunk

    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Use updated payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Use updated payload
        toast.success("Product added successfully");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })

      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Use updated payload
        toast.success("Product updated successfully");
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Use updated payload
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productSlice.reducer;
