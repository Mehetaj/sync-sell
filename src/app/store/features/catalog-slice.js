import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: "idle",
    loading: false,
    error: null,
};

// Async Thunks
export const fetchCatalogs = createAsyncThunk("catalog/fetchCatalogs", async () => {
    const response = await axios.get("/api/catalog");
    return response.data.Catalogs;
});

export const addCatalog = createAsyncThunk("catalog/addCatalog", async (catalog) => {
    await axios.post("/api/catalog", catalog);
    const response = await axios.get("/api/catalog");
    return response.data.Catalogs;
});

export const editCatalog = createAsyncThunk("catalog/edit-catalog", async ({ updatedCatalog, id }) => {
    await axios.patch(`/api/catalog/${id}`, updatedCatalog);
    const response = await axios.get("/api/catalog");
    return response.data.Catalogs;
});

export const deleteCatalog = createAsyncThunk("catalog/delete-catalog", async (id) => {
    await axios.delete(`/api/catalog/${id}`);
    const response = await axios.get("/api/catalog");
    return response.data.Catalogs;
});

const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCatalogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCatalogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch catalogs";
            })
            .addCase(addCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                toast.success("Catalog added successfully");
            })
            .addCase(addCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add catalog";
            })
            .addCase(editCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                toast.success("Catalog updated successfully");
            })
            .addCase(editCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update catalog";
            })
            .addCase(deleteCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                toast.success("Catalog deleted successfully");
            })
            .addCase(deleteCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete catalog";
            });
    },
});

export default catalogSlice.reducer;
