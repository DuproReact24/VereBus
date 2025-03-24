import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  isloading,
  selectTrips,
  setloading,
  setTrips,
} from "../../store/trip/tripslice";
import { RootState } from "../../store";
import { format } from "date-fns";
import Bar from "../../components/bar/Bar";
import Car from "../../components/Car/Car";
import './Ticket.css'
export default function Ticket() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.trip.formSearch);
  const newDate = search.date ? format(new Date(search.date), "yyyy-MM-dd") : "";
  const data = useSelector(selectTrips);
  const loading = useSelector(isloading);

  const [sortOrder, setSortOrder] = useState("asc");
  const [timeFilter, setTimeFilter] = useState("earliest"); 

  useEffect(() => {
    dispatch(setloading());
    if (search.date === "") {
      axios.get("http://localhost:8081/get-bus").then((res) => {
        console.log(res)
        dispatch(setTrips(res.data));
      });
    } else {
      axios
        .get(
          `http://localhost:8081/get-trips?date=${newDate}&from=${search.from}&to=${search.to}`
        )
        .then((res) => {
          dispatch(setTrips(res.data));
        });
    }
  }, [dispatch, search]); // Chỉ gọi API khi search thay đổi

  const sortedData = [...data].sort((a, b) => {

    const timeA = parseInt(a.departure_time.slice(0, 2), 10);
    const timeB = parseInt(b.departure_time.slice(0, 2), 10);
    const timeComparison = timeFilter === "earliest" ? timeA - timeB : timeB - timeA;
    console.log("timeA:", timeA, "timeB:", timeB, "timeComparison:", timeComparison);
  
    if (timeComparison === 0) {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
  
    return timeComparison;
  });

  if (loading) return <h1 style={{ color: "red", textAlign: "center" }}>Loading...</h1>;

  return (
    <>
      <div className="row">
        <div className="col-4 d-flex justify-content-end " >
         
          <div className="filter-section " style={{position:'fixed'}}>
            <h3>Bộ Lọc</h3>
            <label>
              <input
                type="radio"
                name="timeFilter"
                value="earliest"
                checked={timeFilter === "earliest"}
                onChange={() => setTimeFilter("earliest")}
              />
              Giờ đi sớm nhất
            </label>
            <label>
              <input
                type="radio"
                name="timeFilter"
                value="latest"
                checked={timeFilter === "latest"}
                onChange={() => setTimeFilter("latest")}
              />
              Giờ đi muộn nhất
            </label>

            <label>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={() => setSortOrder("asc")}
              />
              Giá tăng dần
            </label>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={() => setSortOrder("desc")}
              />
              Giá giảm dần
            </label>
          </div>
        
        </div>

        <div className="col-8">
          {sortedData.map((item, index) => (
            <Car
              key={index}
              companyName={item.bus_operators.fullname}
              rating={4.8}
              reviews={260}
              busType="Limousine 24 Phòng"
              departureTime={item.departure_time}
              arrivalTime={item.arrival_time}
              duration={`${Math.floor(
                (new Date(`1970-01-01T${item.arrival_time}Z`).getTime() -
                  new Date(`1970-01-01T${item.departure_time}Z`).getTime()) /
                  (1000 * 60 * 60)
              )}h`}
              location="VP QL13"
              price={item.price}
              discount={10}
              remainingSeats={16}
              imageUrl={item.bus_operators.img}
              from={item.location_trips_from_localTolocation}
              to={item.location_trips_to_localTolocation}
              from_local={item.from_local}
              to_local={item.to_local}
              bus_operator_id={item.bus_operator_id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
