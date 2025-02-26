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
export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  const response = await axios.get("http://localhost:3000/api/contact");
  return response.data.contacts;
});

export const addContact = createAsyncThunk("contacts/addContact", async (newContact) => {
  await axios.post("http://localhost:3000/api/contact", newContact);
  const response = await axios.get("http://localhost:3000/api/contact");
  return response.data.contacts;
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
  await axios.delete(`http://localhost:3000/api/contact/${id}`);
  const response = await axios.get("http://localhost:3000/api/contact");
  return response.data.contacts;
});

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        toast.success("Contact added successfully");
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add contact";
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        toast.success("Contact deleted successfully");
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete contact";
      });
  },
});

export default contactSlice.reducer;
