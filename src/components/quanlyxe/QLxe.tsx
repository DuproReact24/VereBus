import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrip } from "../../store/admin/Admin.slice";
import { RootState } from "../../store";
import styles from "./QLxe.module.css";
export default function QLxe({ id }: any) {
  const dispatch = useDispatch();
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
      const [formData, setFormData] = useState({ id: "",
        bus_operator_id:"",
        departure_time:"",
        arrival_time:"",
        to_local:0,
        from_local:0,
        price:0,
        id_bus:0 });
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


  useEffect(() => {
    axios.get(`http://localhost:8081/get-bus/${id}`).then((res) => {
      dispatch(setTrip(res.data));
    });
  }, [id, dispatch]);

  const trip = useSelector((state: RootState) => state.admin.trip);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8081/admin/delete-trips/${id}`).then(() => {
      window.location.reload();
    });
  };

  const handleUpdateClick = (item: any) => {
    setFormData({
      id: item.id,
      bus_operator_id:item.bus_operator_id,
      departure_time:new Date(item.departure_time).toISOString(),
      arrival_time:new Date(item.arrival_time).toISOString(),
      to_local:Number(item.to_local),
      from_local:Number(item.from_local),
      price:Number(item.price),
      id_bus:Number(item.id_bus)
});
    setShowPopup(true);
  };

  const handleSave = () => {
    const payload ={
    
      bus_operator_id:formData.bus_operator_id,
      departure_time:`1970-01-01T${formData.departure_time}:00.000Z`,
      arrival_time:`1970-01-01T${formData.arrival_time}:00.000Z`,
      to_local:Number(formData.to_local),
      from_local:Number(formData.from_local),
      price:Number(formData.price),
      id_bus:Number(formData.id_bus)
    }
   
    axios.put(`http://localhost:8081/admin/update-bus-operator/${formData.id}`, payload).then((res) => {
      console.log(res)
      setShowModal(false);
      window.location.reload();
    });
  };

  return (
    <>
      <div className="main-content">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm..." />
            <button>
              <i className="fas fa-search" />
            </button>
          </div>
          <div className="user-info">
            <span>Admin</span>
          </div>
        </header>
        <div className="content">
          <h3>Quản lý Xe</h3>
        </div>
        <div className="container-fluid">
          <div className="tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Company Bus</th>
                  <th>Khởi hành</th>
                  <th>Thời Gian Đến</th>
                  <th>Nơi Đi</th>
                  <th>Nơi Đến</th>
                  <th>Giá</th>
                  <th>Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {trip.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.bus?.license_plate}</td>
                    <td>{item?.departure_time}</td>
                    <td>{item?.arrival_tim}</td>
                    <td>{item.to_local}</td>
                    <td>{item.from_local}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className='btn btn-danger mr-1' onClick={() => handleDelete(item.id)}>Delete</button>
                      <button className='btn btn-success' onClick={() => handleUpdateClick(item)}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && (
    <div className={styles.popupOverlay}>
        <div className={styles.popupForm}>
            <h2>Cập nhật vé</h2>
            <label>Mã vé:</label>
            <input type="text" name="id" value={formData.id} disabled />

            <label>Thời gian xuất phát:</label>
            <input type="text" name="departure_time" value={formData.departure_time} onChange={handleInputChange} />
            <label>Thời gian đến:</label>
            <input type="text" name="arrival_time" value={formData.arrival_time} onChange={handleInputChange} />
            <label>Nơi đi:</label>
            <input type="text" name="from_local" value={formData.from_local} onChange={handleInputChange} />
            <label>Nơi đến:</label>
            <input type="text" name="to_local" value={formData.to_local} onChange={handleInputChange} />
            <label>giá:</label>
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
            

            <label>Trạng thái:</label>
          
            <div className={styles.popupActions}>
                <button type='submit' className={styles.btnPrimary} onClick={handleSave }>Lưu</button>
                <button className={styles.btnSecondary} onClick={() => setShowPopup(false)}>Hủy</button>
            </div>
        </div>
    </div>
)}

    </>
  );
}
