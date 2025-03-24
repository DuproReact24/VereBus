import React, { useEffect, useState } from "react";
import styles from "./Pay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { isloading, selectBook1, setBooking, setLoading, setPay } from "../../store/book/bookslice";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Pay() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullname: "", // Add fullname to errors state
    phone: "",
    email: "",
  });

  const [selectedPayment, setSelectedPayment] = useState<number | null>(null); // State for selected payment method
  const book1 = useSelector(selectBook1);
  console.log(book1)
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(book1).length === 0) {
      return history.push("/");
    }
    setFormData({ ...formData, phone: book1.phone, email: book1.email });
  }, []);

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

  const handlePaymentSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(Number(e.target.value)); // Update selected payment method
  };

  const validateInputs = () => {
    const newErrors: { fullname: string; phone: string; email: string } = { fullname: "", phone: "", email: "" };

    if (!formData.fullname) {
      newErrors.fullname = "Họ và tên không được để trống."; // Validate fullname
    }

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
    return !newErrors.fullname && !newErrors.phone && !newErrors.email;
  };
  const loading = useSelector(isloading)
    const dispatch = useDispatch()
// Removed duplicate declaration of history
  const handlePayment = () => {
    if (!validateInputs()) {
      alert("Vui lòng kiểm tra lại thông tin liên hệ!");
      return;
    }

    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    const number = selectedPayment
    let namepay='';
    if(number ==4 ){
        
        namepay = 'thanh toán trực tiếp'
        const payload = {
          data:{
            customer_id: Number(book1.customer_id),
            seat: book1.seats,
            booking_time: book1.booking_time,
            status: false,
            id_pick_up: book1.id_pick_up,
            id_drop_off: book1.id_drop_off,
            email: formData.email,
            phone: formData.phone,
            id_busop:book1.bus_operator_id
            
          },
        payinf:{
          total:book1.total,
          fullname:formData.fullname,
          companyName:book1.companyName,
          to:book1.to,
          from:book1.from,
        }
        };
          const pay= {
              customer_id: Number(book1.customer_id),
              seat: book1.seats,
              booking_time: book1.booking_time,
              status: false,
              id_pick_up: book1.id_pick_up,
              id_drop_off: book1.id_drop_off,
              email: formData.email,
              phone: formData.phone,
              fullname:formData.fullname,
              to:book1.to,
              from:book1.from,
              namepay:namepay,
              total:book1.total,
              otal:book1.total,
        
          companyName:book1.companyName,
   
            };
          dispatch(setLoading())
          axios
            .post("http://localhost:8081/book-ticket", payload)
            .then((res) => {
              dispatch(setPay(pay))
            
              alert("Thanh toán thành công!");
              history.push('/payss')
              
            })
            .catch((error) => {
      
              alert("Đã xảy ra lỗi trong quá trình thanh toán.");
            });
    }
    if(number ==3 ){
        
        namepay = 'thanh toán momo'
        const payload = {
            customer_id: Number(book1.customer_id),
            seat: book1.seats,
            booking_time: book1.booking_time,
            status: false,
            id_pick_up: book1.id_pick_up,
            id_drop_off: book1.id_drop_off,
            email: formData.email,
            phone: formData.phone,
            
          };
          const pay= {
              customer_id: Number(book1.customer_id),
              seat: book1.seats,
              booking_time: book1.booking_time,
              status: false,
              id_pick_up: book1.id_pick_up,
              id_drop_off: book1.id_drop_off,
              email: formData.email,
              phone: formData.phone,
              fullname:formData.fullname,
              to:book1.to,
              from:book1.from,
              namepay:namepay,
              bus_operator_id:book1.bus_operator_id
            };
          dispatch(setLoading())
          axios
            .post(`http://localhost:8081/pay?amount=${book1.total}`)
            .then((res) => {
              
                window.location.href = res.data.payUrl
             
              
            })
            .catch((error) => {
      
              alert("Đã xảy ra lỗi trong quá trình thanh toán.");
            });
    }
  
  };
  if (loading) return <h1>...loading</h1> 
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.paymentOptions}>
          <h3>Phương thức thanh toán</h3>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              id="shopeepay"
              value={1}
              onChange={handlePaymentSelection}
            />
            <label htmlFor="shopeepay">
              <strong>Ví ShopeePay</strong>
              <p>Giảm 10K khi thanh toán đơn hàng xe khách từ 50K</p>
              <a href="#">Điều kiện sử dụng</a>
            </label>
          </div>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              id="zalopay"
              value={2}
              onChange={handlePaymentSelection}
            />
            <label htmlFor="zalopay">
              <strong>Ví ZaloPay</strong>
              <p>Giảm 15K và 35K khi nhập mã ZLPVXR</p>
              <a href="#">Điều kiện sử dụng</a>
            </label>
          </div>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              id="momo"
              value={3}
              onChange={handlePaymentSelection}
            />
            <label htmlFor="momo">
              <strong>Ví MoMo</strong>
              <p>Giảm 20K khi nhập mã MOMOVXR cho đơn hàng từ 400K</p>
              <a href="#">Điều kiện sử dụng</a>
            </label>
          </div>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              id="cash"
              value={4}
              onChange={handlePaymentSelection}
            />
            <label htmlFor="cash">
              <strong>Thanh toán khi lên xe</strong>
              <p>Bạn có thể thanh toán cho tài xế khi lên xe</p>
            </label>
          </div>
        </div>
        <div className={styles.contactForm}>
          <h3>Thông tin liên hệ</h3>
          <div className={styles.formGroup}>
            <label>Hành khách</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            {errors.fullname && <p className={styles.error}>{errors.fullname}</p>} {/* Display fullname error */}
          </div>
          <div className={styles.formGroup}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
        </div>
        <button type="submit" className={styles.submitButton} onClick={handlePayment}>
          Thanh toán
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.tripInfo}>
          <h3>Thông tin chuyến đi</h3>
          <div className={styles.tripDetails}>
            <img
              src="https://source.unsplash.com/100x100/?bus"
              alt="Bus"
              className={styles.busImage}
            />
            <div className={styles.tripContent}>
              <h4>{book1.companyName}</h4>
              <p>Limousine 20 phòng</p>
              <p>
                <i className="fas fa-user"></i> 1{" "}
                <i className="fas fa-chair"></i> {(book1.seats || []).join(", ")} {/* Add fallback to ensure seats is an array */}
              </p>
              <p>
                <strong>{book1.departureTime}</strong> Trạm {book1.from.name}
                <br />
                <strong>{book1.arrivalTime}</strong> Trạm {book1.to.name}
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
        <div className={styles.contactSummary}>
          <h3>Thông tin liên hệ</h3>
          <p>
            <strong>Hành khách:</strong> {formData.fullname}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {formData.phone}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
        </div>
      </div>
    </div>
  );
}
