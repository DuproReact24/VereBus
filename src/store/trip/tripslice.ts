import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Location {
  name: string;
  address: string;
}

interface BusOperator {
  img: string;
  id: number;
  fullname: string;
  address: string;
  phone: number;
  email: string;
  city_id: number;
}

interface Trip {
  id: number;
  bus_operator_id: number;
  departure_time: string;
  arrival_time: string;
  to_local: number;
  from_local: number;
  location_trips_from_localTolocation: Location;
  location_trips_to_localTolocation: Location;
  bus_operators: BusOperator;
  price: number;
}
interface formsearch{
  to:number,
  from:number,
  date:string

}

interface TripState {
  trips: Trip[];
  loading: boolean;
  user_id: string | null;
  formSearch:formsearch
}

const initialState: TripState = {
  trips: [],
  loading: false,
  user_id: localStorage.getItem('userId'),
  formSearch:{
    to:0,
    from:0,
    date:""
  } // Retrieve user_id from localStorage
};

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setloading: (state) => {
      state.loading = true;
    },
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload.map((trip) => ({
        ...trip,
        departure_time: new Date(trip.departure_time).toISOString().split('T')[1].slice(0, 8),
        arrival_time: new Date(trip.arrival_time).toISOString().split('T')[1].slice(0, 8),
      }));
      state.loading = false;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.user_id = action.payload; // Update user_id in the state
    },
    setSearch:(state,action)=>{
      state.formSearch = action.payload

    }
  },
});

// Selector to get trips and user_id from the state
export const selectTrips = (state: { trip: TripState }) => state.trip.trips;
export const isloading = (state: { trip: TripState }) => state.trip.loading;
export const selectUserId = (state: { trip: TripState }) => state.trip.user_id; // Selector for user_id
export const { setTrips, setloading, setUserId,setSearch } = tripSlice.actions;

export default tripSlice.reducer;