import React, { useEffect, useState } from 'react';
import '../admin/Admim.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setTicket } from '../../store/admin/Admin.slice';
import { RootState } from '../../store';
import QLxe from '../../components/quanlyxe/QLxe';
import Trip from '../../components/Trip/Trip';

export default function Admin() {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ id: '', time: '', status: "" });
    const [number,setNumber] =  useState(0)
 console.log(formData)
    useEffect(() => {
        dispatch(setLoading());
        axios.get('http://localhost:8081/get-ticket/3').then((res) => {
            dispatch(setTicket(res.data));
        });
    }, [dispatch]);

    const ticket = useSelector((state: RootState) => state.admin.ticket);

    const handleDelete = (id:any) => {
        axios.get(`http://localhost:8081/get-Delete/${id}`).then(() => {
            window.location.reload();
        });
    };

    const handleUpdateClick = (item:any) => {
        console.log(item)
        setFormData({
            id: item.id,
            
            time: item.booking_time,
        
       
            status: item.status
        });
        
        setShowPopup(true);
    };
   
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = (e:any) => {
  
      e.preventDefault()
      if(formData.status==='1'){
        const payload = {
          id:formData.id,
          booking_time:formData.time,
          status:true
        }
        axios.put(`http://localhost:8081/update-ticket/${formData.id}`, payload).then(() => {
          setShowPopup(false);
          window.location.reload();
      });
      }
      if(formData.status==='2'){
        const payload = {
          id:formData.id,
          booking_time:formData.time,
          status:false
        }
        axios.put(`http://localhost:8081/update-ticket/${formData.id}`, payload).then(() => {
          setShowPopup(false);
          window.location.reload();
      });
      }
       
    };
    const handleNumber =(id:number)=>{
      setNumber(id)
    }
    return (
        <div>
            <div className="admin-container">
                <div className="sidebar">
                    <div className="logo">
                        <h2>Admin</h2>
                    </div>
                    <nav>
                        <a href="#" className={`${number===0?"active":""}`}onClick={() => { handleNumber(0) }}> Quản lý vé</a>
                        <a  href="#" className={`${number===1?"active":""}`} onClick={() => { handleNumber(1) }}> Quản lý xe</a>
                        <a href="#" className={`${number===2?"active":""}`}onClick={() => { handleNumber(2) }}> Quản lý tuyến</a>
             
                      
                    </nav>
                </div>
              { number==0 ? <div className="main-content">
                    <header>
                        <div className="search-bar">
                            <input type="text" placeholder="Tìm kiếm..." />
                            <button><i className="fas fa-search" /></button>
                        </div>
                        <div className="user-info">
                            <span>Admin</span>
                      
                        </div>
                    </header>
                    <div className="content ">
                        <h3 className='' >Quản lý Vé Xe</h3>
                       
                    </div>
                    <div className='container-fluid'>
                        <div className="tickets-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã vé</th>
                                        <th>Tuyến đường</th>
                                        <th>Ngày khởi hành</th>
                                       
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="ticketsList">
                                    {ticket.map((item, index) => {
                                      console.log({item})
                                     
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.location_ticket_bookings_id_drop_offTolocation.name} --- {item.location_ticket_bookings_id_pick_upTolocation.name}</td>
                                                <td>{item.booking_time.slice(0,10)}</td>
                                                <td>{item.status ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                                <td>
                                                    <button className='btn btn-danger mr-1' onClick={() => handleDelete(item.id)}>Delete</button>
                                                    <button className='btn btn-success' onClick={() => handleUpdateClick(item)}>Update</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>:number===1?<QLxe id={ticket[0].id_busop}/>:<Trip id={ticket[0].id_busop}></Trip>}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-form">
                        <h2>Cập nhật vé</h2>
                        <label>Mã vé:</label>
                        <input type="text" name="id" value={formData.id} disabled />
                      
                        <label>Thời gian:</label>
                        <input type="text" name="time" value={formData.time} onChange={handleInputChange} />
                      
                        <label>Trạng thái:</label>
                        <select name="status" value={formData.status.toString()} onChange={handleInputChange}>
                            <option value={1}>Đã thanh toán</option>
                            <option value={2}>Chưa thanh toán</option>
                        </select>
                        <div className="popup-actions mt-3">
                            <button type='submit' className='btn btn-primary' onClick={handleUpdateSubmit}>Lưu</button>
                            <button className='btn btn-secondary' onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
