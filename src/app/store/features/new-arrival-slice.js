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
export const fetchNewArrivals = createAsyncThunk(
  "new-arrivals/fetchNewArrivals",
  async () => {
    const response = await axios.get("/api/new-arrival");
    return response.data.NewArrivals;
  }
);

export const addNewArrival = createAsyncThunk(
  "new-arrivals/addNewArrival",
  async (newArrival) => {
    await axios.post("/api/new-arrival", newArrival);
    const response = await axios.get("/api/new-arrival");
    return response.data.NewArrivals;
  }
);

export const editNewArrival = createAsyncThunk(
  "new-arrivals/edit-new-arrival",
  async ({ updatedArrival, id }) => {
    await axios.patch(
      `/api/new-arrival/${id}`,
      updatedArrival
    );
    const response = await axios.get("/api/new-arrival");
    return response.data.NewArrivals;
  }
);

export const deleteNewArrival = createAsyncThunk(
  "new-arrivals/delete-new-arrival",
  async (id) => {
    await axios.delete(`/api/new-arrival/${id}`);
    const response = await axios.get("/api/new-arrival");
    return response.data.NewArrivals;
  }
);

const newArrivalSlice = createSlice({
  name: "new-arrivals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch new arrivals";
      })
      .addCase(addNewArrival.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewArrival.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        toast.success("New arrival added successfully");
      })
      .addCase(addNewArrival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add new arrival";
      })
      .addCase(editNewArrival.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNewArrival.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        toast.success("New arrival updated successfully");
      })
      .addCase(editNewArrival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update new arrival";
      })
      .addCase(deleteNewArrival.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNewArrival.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        toast.success("New arrival deleted successfully");
      })
      .addCase(deleteNewArrival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete new arrival";
      });
  },
});

export default newArrivalSlice.reducer;
