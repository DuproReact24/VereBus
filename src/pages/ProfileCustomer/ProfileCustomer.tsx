import { useEffect, useState } from "react";
import '../ProfileCustomer/index.css'
import axios from "axios";

export default function ProfileCustomer() {
    const [formData, setFormData] = useState({
      address: "",
      fullname: "",
      phone: "",
   
      });
      const [originalData, setOriginalData] = useState({
        address: "",
        fullname: "",
        phone: "",
      }); // Store the original data for comparison
      const [user,setUser]=useState("");
      
   useEffect(() => {
    
    const userId = localStorage.getItem("userId")
    axios
      .get(`http://localhost:8081/get-user/${userId}`)
      .then((response) => {
        console.log({response});
        if (response.data) {
          setFormData(response.data);
          setOriginalData(response.data); // Save the original data
        }
        setUser(user);
      })
      
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
        const { name, value } = e.target;

        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
        const handleSubmitInputChange =(data:any)=>{
          // Compare formData with originalData
          if (JSON.stringify(data) === JSON.stringify(originalData)) {
            console.log("No changes detected. API call prevented.");
            return; // Prevent API call if no changes
          }
          const payload = {
            data:data,
        
          }
      

        axios.put("http://localhost:8081/update-user",payload).then((res) => { 
      
          setOriginalData(data);
          window.location.reload()
         }).catch((error) => {
          console.error("Error updating user data:", error);
        });


      }

      return (
        <div className="container-fulid">
          <form className="form">
          <div className="form-group" style={{marginTop: "0",marginBottom: "0"}}>
              <label>Họ và tên<span className="required">*</span></label>
              <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} />
            </div>
    
            <div className="form-group" style={{marginTop: "0",marginBottom: "0"}}>
              <label>Số điện thoại</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{marginTop: "0",marginBottom: "20px"}}>
              <label>Địa chỉ</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
    
         
    
           
    
            <button type="button" className="submit-btn" onClick={() => { handleSubmitInputChange(formData) }} >Lưu</button>
          </form>
        </div>
      );
}
