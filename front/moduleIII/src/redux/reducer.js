import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userAppointments: [],
  userData: {
    name: "",
    email: "",
    nDni: null,
    photo: "",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    allUser: (state, action) => {
      state.userData = action.payload;
    },
    allAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    addAppointments: (state, action) => {
      state.userAppointments.push(action.payload);
    },

    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.userAppointments.find(
        (appointment) => appointment.id === id
      );
      if (appointment) {
        appointment.status = status;
      }
    },
  },
});

export const {
  addUser,
  allAppointments,
  addAppointments,
  updateAppointmentStatus,
  allUser,
} = todoSlice.actions;

export default todoSlice.reducer;
