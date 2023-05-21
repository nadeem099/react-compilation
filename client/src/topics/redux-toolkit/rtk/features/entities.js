import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAsyncData } from "../../simple-redux";

// will dispatch promise life cycle actions (pending, fullfilled, rejected)
export const fetchEntities = createAsyncThunk("entities/fetchData", () => {
  return getAsyncData().then((data) => data);
});

const initialState = {
  data: [],
  error: "",
  loading: false,
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEntities.pending, (state) => {
      console.log(fetchEntities);
      state.loading = true;
    });
    builder.addCase(fetchEntities.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEntities.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
  },
});

export default entitiesSlice.reducer;
// MH48J0431 - PVC
// MH04FU3226 - MS
