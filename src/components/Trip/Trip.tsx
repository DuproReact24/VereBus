import React, { useEffect, useState } from 'react';
import styles from './Trip.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrips, setTrips } from '../../store/trip/tripslice';

export default function Trip({ id }: any) {
  console.log(id);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    bus_operator_id: '',
    departure_time: '',
    arrival_time: '',
    to_local: 0,
    from_local: 0,
    price: 0,
    id_bus: 0
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrips();
  }, [id, dispatch]);

  const fetchTrips = () => {
    axios.get(`http://localhost:8081/get-bus/${id}`).then((res) => {
      dispatch(setTrips(res.data));
    });
  };

  const trips = useSelector(selectTrips);

  // Hàm xử lý khi click Update
  const handleUpdateClick = (item: any) => {
    setFormData({
      id: item.id,
      bus_operator_id: item.bus_operator_id,
      departure_time: item.departure_time,
      arrival_time: item.arrival_time,
      to_local: item.to_local,
      from_local: item.from_local,
      price: item.price,
      id_bus: item.id_bus
    });
    setShowPopup(true);
  };

  // Xử lý cập nhật dữ liệu
  const handleSave = () => {
    if (!formData.departure_time || !formData.arrival_time) {
      alert('Thời gian xuất phát và đến không được để trống!');
      return;
    }

    const updatedData = {
      ...formData,
      departure_time: formatDate(formData.departure_time),
      arrival_time: formatDate(formData.arrival_time),
    };

    console.log('📤 Dữ liệu gửi đi:', updatedData);

    axios
      .put(`http://localhost:8081/update-trip/${formData.id}`, updatedData)
      .then(() => {
        alert('Cập nhật thành công!');
        setShowPopup(false);
        fetchTrips();
      })
      .catch((error) => {
        console.error('❌ Lỗi khi cập nhật:', error);
        alert('Cập nhật thất bại!');
      });
  };

  // Format thời gian về chuẩn ISO 8601
  const formatDate = (time: string) => {
    if (!time) return null;
    return `2025-03-24T${time}:00.000Z`; // Giả định ngày hiện tại
  };

  const handleDelete = (tripId: number) => {
    if (window.confirm('Bạn có chắc muốn xóa vé này không?')) {
      axios.delete(`http://localhost:8081/delete-trip/${tripId}`).then(() => {
        alert('Xóa thành công!');
        fetchTrips();
      }).catch((error) => {
        console.error('Lỗi khi xóa:', error);
        alert('Xóa thất bại!');
      });
    }
  };

  return (
    <>
      <div className="main-content">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm..." />
            <button><i className="fas fa-search" /></button>
          </div>
          <div className="user-info"><span>Admin</span></div>
        </header>
        <div className="content"><h3>Quản lý Tuyến</h3></div>
        <div className="container-fluid">
          <div className="tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Thời Gian Khởi hành</th>
                  <th>Thời Gian Đến</th>
                  <th>Nơi Đi</th>
                  <th>Nơi Đến</th>
                  <th>Giá</th>
                  <th>Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.arrival_time}</td>
                    <td>{item.to_local}</td>
                    <td>{item.from_local}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn btn-danger mr-1" onClick={() => handleDelete(item.id)}>Delete</button>
                      <button className="btn btn-success" onClick={() => handleUpdateClick(item)}>Update</button>
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
            <input type="text" name="departure_time" value={formData.departure_time} onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })} />
            
            <label>Thời gian đến:</label>
            <input type="text" name="arrival_time" value={formData.arrival_time} onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })} />

            <label>Nơi đi:</label>
            <input type="text" name="from_local" value={formData.from_local} onChange={(e) => setFormData({ ...formData, from_local: Number(e.target.value) })} />

            <label>Nơi đến:</label>
            <input type="text" name="to_local" value={formData.to_local} onChange={(e) => setFormData({ ...formData, to_local: Number(e.target.value) })} />

            <label>Giá:</label>
            <input type="text" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />

            <div className={styles.popupActions}>
              <button className={styles.btnPrimary} onClick={handleSave}>Lưu</button>
              <button className={styles.btnSecondary} onClick={() => setShowPopup(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
