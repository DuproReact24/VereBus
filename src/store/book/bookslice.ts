import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface book {
  imageUrl: string | undefined;
  total: string;
  customer_id: number;
  seat: any[];
  booking_time: Date;
  status: boolean;
  id_pick_up: number;
  id_drop_off: number;
  email: string;
  phone: string;
  companyName: string;
  to:{name:any,address:any};
  from:{name:any,
    address:any
  };
  seats:any,
  departureTime:any,
  arrivalTime:any

  }
interface booking {
  status: boolean;
  booking_time: Date;
  total: string;
  customer_id: number;
  id_pick_up: number;
  id_drop_off: number;
  seats:any,
  to:{name:any,address:any};
  from:{name:any,
    address:any
  };
  departureTime:any,
  arrivalTime:any,
  email:string,
  phone:string,
  companyName:string
  bus_operator_id:any
}
interface BookState {
  book: book;
  pay:pay;
  booking: booking;
  loading: boolean;
  user_id: string | null; // Add user_id to the state
  isloading:boolean
}
 export interface pay {
  total: number;
  customer_id: number;
  seat: any[];
  booking_time: Date;
  status: boolean;
  id_pick_up: number;
  id_drop_off: number;
  email: string;
  phone: string;
  companyName: string;
  to:{name:any,address:any};
  from:{name:any,
    address:any
  };
  seats:any,
  departureTime:any,
  arrivalTime:any
  fullname:any
  namepay:any
 
  }

const initialState: BookState = {
  book: {} as book,
  booking:{} as booking,
  pay:{} as pay,
  loading:true,
  user_id: localStorage.getItem("userId"), // Retrieve user_id from localStorage
  isloading:false
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state,action) => {

      state.book = action.payload;
    },
    setBooking:(state,action)=>{
  
      state.booking = action.payload.newBook
      state.isloading = false
    },
    setPay:(state,action)=>{
      console.log(action.payload)
      state.pay = action.payload
      state.isloading = false
    },
    setLoading :(state)=>{
      state.isloading = true
    }
  },
});
export const selectBook = (state: { book: BookState }) => state.book.book;
export const selectPay = (state: { book: BookState }) => state.book.pay;
export const selectBook1 = (state: { book: BookState }) => state.book.booking;
export const isloading = (state: { book: BookState }) => state.book.isloading;
export const { setBook,setBooking,setLoading,setPay } = bookSlice.actions;
export default bookSlice.reducer;
