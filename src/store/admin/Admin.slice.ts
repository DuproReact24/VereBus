import { createSlice } from "@reduxjs/toolkit";
interface adminState {
    ticket:any[]
    trip:any[]
    isloading:boolean
}
const initialState:adminState = {
  ticket:[],
  trip:[],
  isloading:false
};
export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLoading:(state)=>{
            state.isloading = true
        },
        setTicket:(state,action)=>{
          
            state.ticket= action.payload
            
            state.isloading = false
        },
        setTrip:(state,action)=>{
            console.log(action.payload)
            state.trip= action.payload
            
            state.isloading = false
        }
    },
  });
   export const loading = (state:{isloading:adminState}) => state.isloading.isloading;
   
  
  export const {setTicket ,setLoading,setTrip} = adminSlice.actions;
  export default adminSlice.reducer;
  