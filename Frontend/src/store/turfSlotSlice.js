import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    turfSlot: null
}

const turfSlotSlice = createSlice({
    name: 'turfSlot',
    initialState,
    reducers: {
        addDetail(state, action){
            state.turfSlot = action.payload
        },
        removeDetail(state){
            state.turfSlot = null
        }
    }
})

export const { addDetail, removeDetail } = turfSlotSlice.actions;
export default turfSlotSlice.reducer;