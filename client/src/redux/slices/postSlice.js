import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'post',
    initialState: {},
    reducers: {
        addAllPost: (state, action) => {
            return { ...action.payload };
        },
    },
});

export const { addAllPost } = userSlice.actions;

export default userSlice.reducer;
