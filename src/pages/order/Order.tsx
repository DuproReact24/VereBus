import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectBook, setBooking } from "../../store/book/bookslice";
import { useHistory } from "react-router-dom";

export default function Order() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const [book, setBook] = useState<any>({
    total: "",
    companyName: "",
    seats: [],
    departureTime: "",
    arrivalTime: "",
    from: { name: "" },
    to: { name: "" },
    booking_time: "",
  });

  const book1 = useSelector(selectBook);
  console.log(book1)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(book1).length === 0) {
      return history.push("/");
    }
    setBook(book1);
  }, [book1, history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing
    }));
  };

  const validateInputs = () => {
    const newErrors: { phone: string; email: string } = { phone: "", email: "" };

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    setErrors(newErrors);

    // Check if there are any non-empty error messages
    return !newErrors.phone && !newErrors.email;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newBook = { ...book, email: formData.email, phone: formData.phone };
      const payload = { newBook };
      dispatch(setBooking(payload));
      history.push("/pay");  
    }
  
};

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.contactForm}>
          <h3>Thông tin liên hệ</h3>
          <div className={styles.formGroup}>
            <label>Số điện thoại *</label>
            <div className={styles.phoneInput}>
              <select>
                <option value="VN">VN +84</option>
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Email để nhận thông tin đặt chỗ *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.notice}>
            <p>
              <i className="fas fa-check-circle"></i> Số điện thoại và email
              được sử dụng để gửi thông tin đơn hàng và liên hệ khi cần thiết.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success container-fluid mt-4"
          onClick={handleSubmit}
        >
          Tiếp tục
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.summary}>
          <h3>Tạm tính</h3>
          <p className={styles.totalPrice}>{book?.total ?? "N/A"}</p>
        </div>
        <div className={styles.tripInfo}>
          <h3>Thông tin chuyến đi {book.booking_time?.toLocaleString()}</h3>
          <div className={styles.tripDetails}>
            <img
              src={book1.imageUrl}
              alt="Bus"
              className={styles.busImage}
            />
            <div className={styles.tripContent}>
              <h4>{book.companyName}</h4>
              <p>Limousine 20 phòng</p>
              <p>
                {book.seats.map((seat: any) => (
                  <span style={{ color: "red", margin: 2 }} key={seat}>
                    {seat}
                  </span>
                ))}
              </p>
              <p>
                <strong>{book.departureTime}</strong> Trạm {book.from.name}
                <br />
                <strong>{book.arrivalTime}</strong> Trạm {book.to.name}
              </p>
            </div>
            <a
              href="#"
              className={styles.changeLink}
              onClick={() => history.push("/ticket")}
            >
              Thay đổi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
