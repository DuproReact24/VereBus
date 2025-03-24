import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Login/Login.css'

import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
export default function Login({onClose}:{onClose:any}) {
    const [is, setIs] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState(''); // Add success message state

    const handleLogin = (data:boolean) => {
        setIs(data)
    }
    
    const [form, setForm] = useState({
      account: "",
      password: "",
      phone: '',
      fullname:"",
      address:"",
      
    })
    const [errors, setErrors] = useState({
      account: "",
      password: "",
      phone: '',
      fullname:"",
      address:"",
      
    })
  
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
    
      if (value === '') {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Không được để trống',
        }));
      } else {
        let error = '';
        if (name === 'account') {
          if (value.length < 3) {
            error = 'Tài khoản phải có ít nhất 3 ký tự.';
          }
        } else if (name === 'password') {
          if (value.length < 6) {
            error = 'Mật khẩu phải có ít nhất 6 ký tự.';
          }
        } else if (name === 'phone') {
          const phoneRegex = /^[0-9]{10,11}$/; // Validate phone number format
          if (!phoneRegex.test(value)) {
            error = 'Số điện thoại không hợp lệ.';
          }
        } else if (name === 'fullname') {
          const fullnameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
          if (!fullnameRegex.test(value)) {
            error = 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.';
          }
        } else if (name === 'address') {
          if (value.length < 5) {
            error = 'Địa chỉ phải có ít nhất 5 ký tự.';
          }
        }
    
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
    
        if (!error) {
          setForm((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      // Validate the form before submission
      let hasError = false;
      const updatedErrors = { ...errors };

      if (!form.account) {
        updatedErrors.account = 'Tài khoản không được để trống.';
        hasError = true;
      }
      if (!form.password) {
        updatedErrors.password = 'Mật khẩu không được để trống.';
        hasError = true;
      }
      if (is) {
        if (!form.phone) {
          updatedErrors.phone = 'Số điện thoại không được để trống.';
          hasError = true;
        }
        if (!form.fullname) {
          updatedErrors.fullname = 'Họ và tên không được để trống.';
          hasError = true;
        }
        if (!form.address) {
          updatedErrors.address = 'Địa chỉ không được để trống.';
          hasError = true;
        }
      }

      setErrors(updatedErrors);

      if (hasError) {
        setError('Vui lòng kiểm tra lại thông tin.');
        return;
      }

      setLoading(true);

      try {
        if (is) {
          const response = await axios.post('http://localhost:8081/send-otp', { phone: form.phone });
          if (response.data.success) {
            setShowVerification(true);
         
            setSuccessMessage('Đăng ký thành công! Vui lòng nhập mã xác nhận.');
            setError('');
          } else {
            setError('Gửi OTP thất bại');
          }
        } else {
          const response = await axios.post('http://localhost:8081/sign-in', {
            account: form.account,
            password: form.password,
          });
        
          
          if (response.data.status) {

            setSuccessMessage('Đăng nhập thành công!')
           
            setError('');
            localStorage.setItem('account', form.account);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('name', response.data.name);
           
            onClose(); // Close the popup after successful login
            window.location.reload();
          } else {
            setError('Đăng nhập thất bại');
          }
        }
      } catch (error) {
        console.log(error)
        setError(is ? 'Gửi OTP thất bại' : 'Đăng nhập thất bại');
      } finally {
        setLoading(false);
        //  window.location.reload();
      }
    }
   
    const handleVerifyOtp = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8081/sign-up', { form, otp });
        if (response.data.success) {
       
          setShowVerification(false);
          setIs(false);
          setError('')
        } else {
          setError('OTP verification failed');
        }
      } catch (error) {
        setError('OTP verification failed');
      } finally {
        // await setLoading(false);
        window.location.reload();
        
      }
    }

    return (
     
      <div className="overlay">
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className="popup">
          <button className="close-btn" onClick={onClose}>&times;</button>
          
          {is ? (
            <>
              <h2 className='text-dark'>Đăng Ký</h2>
              <label className='text-dark' style={{margin:"0"}}> Tài khoản</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập tài khoản" name='account' onChange={handleForm} />
              </div>
                <p className="error-text">{errors.account}</p>
              <label className='text-dark' style={{margin:"0"}}>Mật Khẩu</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập Mật khẩu" name='password' onChange={handleForm} />
              </div>
                <p className="error-text">{errors.password}</p>
              <label className='text-dark' style={{margin:"0"}}>Số điện thoại</label>
              <div className="phone-input">
                <select>
                  <option>(Viet Nam) +84</option>
                </select>
                <input type="text" placeholder="Nhập số điện thoại" name='phone' onChange={handleForm} />
               
              </div>
              <p className="error-text">{errors.phone}</p>
              <label className='text-dark' style={{margin:"0"}}>Họ và tên</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập họ và tên" name='fullname' onChange={handleForm} />
            
              </div>
              <p className="error-text">{errors.fullname}</p>
              <label className='text-dark' style={{margin:"0"}}>Địa chi</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập địa chỉ" name='address' onChange={handleForm} />
                
              </div>
              <p className="error-text">{errors.address}</p>
            </>
          ) : (
            <>
              <h2 className='text-dark'>Đăng Nhập</h2>
              <label className='text-dark' style={{margin:0}}>Tài khoản</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập tài khoản" name='account' onChange={handleForm} />
              </div>
                <p className="error-text">{errors.account}</p>
              <label className='text-dark'  style={{margin:0}}>Mật Khẩu</label>
              <div className="phone-input">
                <input type="text" placeholder="Nhập Mật khẩu" name='password' onChange={handleForm} />
              </div>
                <p className="error-text">{errors.password}</p>
            </>
          )}

          <button className="continue-btn" onClick={handleSubmit}>
            {loading ? 'Loading...' : 'Tiếp tục'}
          </button>

          {successMessage && <p className="success-text">{successMessage}</p>} 
          {error && <p className="error-text">{error}</p>}

          <div className="divider">
            <span>hoặc</span>
          </div>

          <button className="google-btn">Tiếp tục với Google</button>

          <p className="register-text text-dark" onClick={() => { handleLogin(!is) }}>
            {is ? <>Bạn chưa có tài khoản? <a href="#">Đăng nhập</a></> : <>Bạn có tài khoản? <a href="#">Đăng ký</a></>}
          </p>
        </div>

        {showVerification && (
          <div className="overlay">
            <div className="popup">
              <button className="close-btn" onClick={() => setShowVerification(false)}>&times;</button>
              <h2 className='text-dark'>Nhập mã xác nhận</h2>
              <input type="text" placeholder="Nhập mã xác nhận" value={otp} name='otp' onChange={(e) => setOtp(e.target.value)} />
              <button className="continue-btn" onClick={handleVerifyOtp}>
                {loading ? 'Loading...' : 'Xác nhận'}
              </button>
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
        )}
      </div>
    )
}
