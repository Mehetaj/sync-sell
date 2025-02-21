import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer";
import { toast } from "react-toastify";

// Define the schema for your Catalog model
export interface Catalog {
    name: string;
    image: string;
}

interface CatalogState {
    items: WritableDraft<Catalog>[];
    loading: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CatalogState = {
    items: [],
    status: "idle",
    loading: false,
    error: null,
};

// Async Thunks
export const fetchCatalogs = createAsyncThunk(
    "catalog/fetchCatalogs",
    async (): Promise<Catalog[]> => {
        const response = await axios.get("http://localhost:3000/api/catalog");
        return response.data.Catalogs;
    }
);

export const addCatalog = createAsyncThunk(
    "catalog/addCatalog",
    async (catalog: Catalog): Promise<Catalog[]> => {
        await axios.post("http://localhost:3000/api/catalog", catalog);
        const response = await axios.get("http://localhost:3000/api/catalog");
        return response.data.Catalogs;
    }
);

export const editCatalog = createAsyncThunk(
    "catalog/edit-catalog",
    async ({ updatedCatalog, id }: { updatedCatalog: Catalog; id: string }): Promise<Catalog[]> => {
        await axios.patch(`http://localhost:3000/api/catalog/${id}`, updatedCatalog);
        const response = await axios.get("http://localhost:3000/api/catalog");
        return response.data.Catalogs;
    }
);

export const deleteCatalog = createAsyncThunk(
    "catalog/delete-catalog",
    async (id: string): Promise<Catalog[]> => {
        await axios.delete(`http://localhost:3000/api/catalog/${id}`);
        const response = await axios.get("http://localhost:3000/api/catalog");
        return response.data.Catalogs;
    }
);


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