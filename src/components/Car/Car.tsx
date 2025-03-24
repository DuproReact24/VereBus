import React, { useState } from 'react';
import styles from './Car.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../store/trip/tripslice';
import { setBook } from '../../store/book/bookslice';
import { useHistory } from 'react-router-dom';


interface CarProps {
  companyName: string;
  rating: number;
  reviews: number;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  location: string;
  price: number;
  discount: number;
  remainingSeats: number;
  imageUrl: string;
  from: any;
  to: any;
  from_local: number;
  to_local: number;
  bus_operator_id:number
}

export default function Car({
  companyName,
  rating,
  reviews,
  busType,
  departureTime,
  arrivalTime,
  duration,
  location,
  price,
  discount,
  remainingSeats,
  imageUrl,
  from,
  to,
  from_local,
  to_local,
  bus_operator_id,
}: CarProps) {
  const discountedPrice = price - (price * discount) / 100;
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [showPickupDropoff, setShowPickupDropoff] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState<number>(from_local); // State for selected pickup location
  const [selectedDropoff, setSelectedDropoff] = useState<number>(to_local); // State for selected drop-off location
  const useId = useSelector(selectUserId);

  const toggleSeatSelection = (seatId: string) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length > 0) {
      setShowPickupDropoff(true);
    } else {
      alert("Vui lòng chọn ít nhất một ghế!");
    }
  };
const dispatch = useDispatch();
  const history = useHistory();
  const handleConfirmPickupDropoff = () => {
    const payload = {
      seats: selectedSeats,
      id_pick_up: selectedPickup,
      id_drop_off: selectedDropoff,
      booking_time: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }),
      customer_id:useId,
      from:from,
      to:to,
      total :calculateTotalPrice(),
      companyName:companyName,
      departureTime,
      arrivalTime,
      bus_operator_id,
      imageUrl
    };
    dispatch(setBook(payload));
    history.push('/order')
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * discountedPrice;
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="Bus" className={styles.image} />
        <span className={styles.badge}>✔ Xác nhận tức thì</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.companyName}>{companyName}</h3>
        <div className={styles.rating}>⭐ {rating} <span>({reviews})</span></div>
        <p className={styles.busType}>{busType}</p>
        <div className={styles.schedule}><strong>{departureTime}</strong> → <strong>{arrivalTime}</strong></div>
        <p className={styles.duration}>{duration} | {location}</p>
        <div className={styles.priceContainer}>
          <span className={styles.discountedPrice}>{discountedPrice.toLocaleString()}đ</span>
          <span className={styles.originalPrice}>{price.toLocaleString()}đ</span>
          <span className={styles.discount}>-{discount}%</span>
        </div>
        <p className={styles.remainingSeats}>Còn {remainingSeats} chỗ trống</p>
        <button className={styles.bookButton} onClick={() => setShowSeatSelection(!showSeatSelection)}>
          {showSeatSelection ? "Ẩn chọn chỗ" : "Chọn chuyến"}
        </button>
        <p className={styles.notice}>KHÔNG CẦN THANH TOÁN TRƯỚC</p>
      </div>

      {showSeatSelection && (
        <div className={styles.seatSelection}>
          <h4>Chọn chỗ mong muốn</h4>
          <div className="row">
            <div className="col-6">
              <h2>Chú thích</h2>
              <div style={{ display: "flex" }}>
                <div className={`${styles.seat} ${styles.booked}`} style={{ marginRight: "10px" }}></div>
                <span>Ghế không bán</span>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div className={`${styles.seat} ${styles.selected}`} style={{ marginRight: "10px" }}></div>
                <span>Đang chọn</span>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div className={styles.seat} style={{ marginRight: "10px" }}></div>
                <span>Còn trống</span>
              </div>
              {hoveredSeat && (
                <div style={{ marginTop: "20px", color: "#555" }}>
                  <p>Ghế: {hoveredSeat}</p>
                  <p>Giá vé: {discountedPrice.toLocaleString()}đ</p>
                </div>
              )}
              <div style={{ marginTop: "20px", color: "#555" }}>
                <p>Tổng số tiền: {calculateTotalPrice().toLocaleString()}đ</p>
              </div>
            </div>
            <div className="col-6" style={{ padding: "33px" }}>
              <div className="row">
                <div className={`col-6 ${styles.seat__row}`} style={{ paddingRight: "10px", textAlign: 'center' }}>
                  <p>Tầng dưới</p>
                  <div className='row' style={{ padding: "10px" }}>
                    <div className='col-4'>
                      <div
                        className={`${styles.seat} ${selectedSeats.includes("A1") ? styles.selected : ""}`}
                        onClick={() => toggleSeatSelection("A1")}
                        onMouseEnter={() => setHoveredSeat("A1")}
                        onMouseLeave={() => setHoveredSeat(null)}
                      >
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div
                        className={`${styles.seat} ${selectedSeats.includes("A2") ? styles.selected : ""}`}
                        onClick={() => toggleSeatSelection("A2")}
                        onMouseEnter={() => setHoveredSeat("A2")}
                        onMouseLeave={() => setHoveredSeat(null)}
                      >
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div
                        className={`${styles.seat} ${selectedSeats.includes("A3") ? styles.selected : ""}`}
                        onClick={() => toggleSeatSelection("A3")}
                        onMouseEnter={() => setHoveredSeat("A3")}
                        onMouseLeave={() => setHoveredSeat(null)}
                      >
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A4") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A4")} onMouseEnter={() => setHoveredSeat("A4")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A5") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A5")} onMouseEnter={() => setHoveredSeat("A5")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A6") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A6")} onMouseEnter={() => setHoveredSeat("A6")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A7") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A7")} onMouseEnter={() => setHoveredSeat("A7")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A8") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A8")} onMouseEnter={() => setHoveredSeat("A8")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A9") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A9")} onMouseEnter={() => setHoveredSeat("A9")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A10") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A10")} onMouseEnter={() => setHoveredSeat("A10")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A11") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A11")} onMouseEnter={() => setHoveredSeat("A11")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A12") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A12")} onMouseEnter={() => setHoveredSeat("A12")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A13") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A13")} onMouseEnter={() => setHoveredSeat("A13")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A14") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A14")} onMouseEnter={() => setHoveredSeat("A14")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A15") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A15")} onMouseEnter={() => setHoveredSeat("A15")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A16") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A16")} onMouseEnter={() => setHoveredSeat("A16")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A17") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A17")} onMouseEnter={() => setHoveredSeat("A17")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("A18") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("A18")} onMouseEnter={() => setHoveredSeat("A18")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`col-6 ${styles.seat__row}`} style={{paddingRight:"10px",textAlign:'center'}} >
                  <p>tầng trên</p>
                  <div className='row' style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B1") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B1")} onMouseEnter={() => setHoveredSeat("B1")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B2") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B2")} onMouseEnter={() => setHoveredSeat("B2")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B3") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B3")} onMouseEnter={() => setHoveredSeat("B3")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B4") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B4")} onMouseEnter={() => setHoveredSeat("B4")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B5") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B5")} onMouseEnter={() => setHoveredSeat("B5")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B6") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B6")} onMouseEnter={() => setHoveredSeat("B6")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B7") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B7")} onMouseEnter={() => setHoveredSeat("B7")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B8") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B8")} onMouseEnter={() => setHoveredSeat("B8")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B9") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B9")} onMouseEnter={() => setHoveredSeat("B9")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B10") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B10")} onMouseEnter={() => setHoveredSeat("B10")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B11") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B11")} onMouseEnter={() => setHoveredSeat("B11")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B12") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B12")} onMouseEnter={() => setHoveredSeat("B12")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B13") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B13")} onMouseEnter={() => setHoveredSeat("B13")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B14") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B14")} onMouseEnter={() => setHoveredSeat("B14")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B15") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B15")} onMouseEnter={() => setHoveredSeat("B15")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'style={{padding:"10px"}}>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B16") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B16")} onMouseEnter={() => setHoveredSeat("B16")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B17") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B17")} onMouseEnter={() => setHoveredSeat("B17")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={`${styles.seat} ${selectedSeats.includes("B18") ? styles.selected : ""}`} onClick={() => toggleSeatSelection("B18")} onMouseEnter={() => setHoveredSeat("B18")} onMouseLeave={() => setHoveredSeat(null)}>
                        <div className={styles.seats}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.confirmButton} onClick={handleConfirmSeats}>
            Tiếp tục
          </button>
        </div>
      )}

      {showPickupDropoff && (
        <div className={styles.pickupDropoff}>
          <div className={styles.pickupDropoffContainer}>
            <div className={styles.pickup}>
              <h4>Điểm đón</h4>
              <div className={styles.pickupOptions}>
                <label>
                  <input
                    type="radio"
                    name="pickup"
                    value={from_local}
                    checked={selectedPickup === from_local}
                    onChange={() => setSelectedPickup(from_local)}
                  />
                  <span>{from.name}</span>
                  <p>{from.address}</p>
                </label>
              </div>
            </div>
            <div className={styles.dropoff}>
              <h4>Điểm trả</h4>
              <div className={styles.dropoffOptions}>
                <label>
                  <input
                    type="radio"
                    name="dropoff"
                    value={to_local}
                    checked={selectedDropoff === to_local}
                    onChange={() => setSelectedDropoff(to_local)}
                  />
                  <span>{to.name}</span>
                  <p>{to.address}</p>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.pickupDropoffFooter}>
            <button className={styles.backButton} onClick={() => setShowPickupDropoff(false)}>
              Quay lại
            </button>
            <button className={styles.continueButton} onClick={handleConfirmPickupDropoff}>
              Tiếp tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
