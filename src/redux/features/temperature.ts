import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kelvin: 0,
  celsius: 0,
  fahrenheit: 0,
}

const temperature = createSlice({
 name: "temperature",
 initialState,
 reducers: {
  setKelvin: (state, action) => {
   state.kelvin = action.payload;

   if(state.kelvin) {
    state.celsius = state.kelvin - 273.15;
    state.fahrenheit = state.celsius * 1.8 + 32;
   }
  },
 }
})

export const { setKelvin } = temperature.actions;

export default temperature.reducer;

