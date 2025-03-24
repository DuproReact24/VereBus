import React, { useState } from "react";
import styles from "./SeatSelection.module.css";

interface Seat {
  id: string;
  isBooked: boolean;
}

export default function Seat() {
  const lowerDeckSeats: Seat[] = [
    { id: "LD1", isBooked: true },
    { id: "LD2", isBooked: false },
    { id: "LD3", isBooked: true },
    { id: "LD4", isBooked: false },
    { id: "LD5", isBooked: true },
    { id: "LD6", isBooked: false },
    { id: "LD7", isBooked: false },
    { id: "LD8", isBooked: true },
  ];

  const upperDeckSeats: Seat[] = [
    { id: "UD1", isBooked: false },
    { id: "UD2", isBooked: true },
    { id: "UD3", isBooked: false },
    { id: "UD4", isBooked: false },
    { id: "UD5", isBooked: true },
    { id: "UD6", isBooked: false },
    { id: "UD7", isBooked: false },
    { id: "UD8", isBooked: true },
  ];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeatSelection = (seatId: string) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  return (
    <div className={styles.seatSelection} style={{width:"700px"}}>
      <h4>Chọn chỗ ngồi</h4>
      <div className={styles.deckContainer}>
        {/* Lower Deck */}
        <div className={styles.deck}>
          <h5>Tầng dưới</h5>
          <div className={styles.seatsGrid}>
            {lowerDeckSeats.map((seat) => (
              <div
                key={seat.id}
                className={`${styles.seat} ${
                  seat.isBooked ? styles.booked : ""
                } ${selectedSeats.includes(seat.id) ? styles.selected : ""}`}
                onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
              >
                {seat.isBooked ? "X" : seat.id}
              </div>
            ))}
          </div>
        </div>

        {/* Upper Deck */}
        <div className={styles.deck}>
          <h5>Tầng trên</h5>
          <div className={styles.seatsGrid}>
            {upperDeckSeats.map((seat) => (
              <div
                key={seat.id}
                className={`${styles.seat} ${
                  seat.isBooked ? styles.booked : ""
                } ${selectedSeats.includes(seat.id) ? styles.selected : ""}`}
                onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
              >
                {seat.isBooked ? "X" : seat.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className={styles.confirmButton}>Tiếp tục</button>
    </div>
  );
}
