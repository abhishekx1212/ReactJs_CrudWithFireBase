import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiInstance from "../api/apiInstance"

const initialState = {
    post: [],
    error: null,
    status: ""
}

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (newPost, { rejectWithValue }) => {
        try {
            let res = await apiInstance.post("/.json", newPost);
            return { ...newPost, id: res.data.name }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchPost = createAsyncThunk(
    "posts/fetchPost",
    async (_, { rejectWithValue }) => {
        try {
            let res = await apiInstance.get("/.json");
            return Object.keys(res.data).map((val) => ({ id: val, ...res.data[val] }))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            await apiInstance.delete(`/${id}.json`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (editData, { rejectWithValue }) => {
        try {
            let data = {
                title: editData.title,
                descryption: editData.descryption
            }
            await apiInstance.put(`/${editData.id}.json`, data)
            return editData
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.post.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload;
            })
            .addCase(fetchPost.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.post = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload;
            })
            .addCase(deletePost.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.post = state.post.filter((val) => val.id != action.payload)
            })
            .addCase(editPost.pending, (state) => {
                state.status = "pending"
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.post = state.post.filter((val) => {
                    let {id,title,descryption} = action.payload;
                    if(val.id == id){
                        val.title = title;
                        val.descryption = descryption
                    }
                    return val
                })
            })
            .addCase(editPost.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload;
            })
    }
})

export default postSlice.reducer