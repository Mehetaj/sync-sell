import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  users: [],
  status: "idle",
  loading: false,
  error: null,
};

// Async Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/api/user");
  return response.data.users;
});

export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  await axios.post("/api/user", newUser);
  const response = await axios.get("/api/user");
  return response.data.users;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ updatedUser, id }) => {
    await axios.patch(`/api/user/${id}`, updatedUser);
    const response = await axios.get("/api/user");
    return response.data.users;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`/api/user/${id}`);
  const response = await axios.get("/api/user");
  return response.data.users;
});

// New Async Thunk to update the user role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, newRole }) => {
    await axios.patch(`/api/user/${userId}`, { role: newRole });
    const response = await axios.get("/api/user");
    return response.data.users;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success("User added successfully");
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success("User updated successfully");
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success("User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      })
      // Handle updateRole actions
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success("User role updated successfully");
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user role";
      });
  },
});

export default userSlice.reducer;
