import { useEffect, useState } from 'react';
import styles from './Dh.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Dh() {
    const history = useHistory();
    const id = localStorage.getItem('userId');

    interface HistoryItem {
        seat: string;
        booking_time: string;
        status: boolean;
        id_pick_up: string;
        id_drop_off: string;
        email: string;
        phone: string;
        id: string;
    }

    const [arr, setArr] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {  
        if (!id) {
            history.push('/login');
            return;
        }

        // Gọi API chỉ khi `id` có giá trị
        axios.get(`http://localhost:8081/get-history/${id}`)
            .then((res) => {
                console.log(res.data)
                setArr(res.data);
                setLoading(false); // Tắt loading khi có dữ liệu
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu lịch sử:", error);
                setLoading(false);
            });
    }, [id]); // Chỉ chạy lại khi `id` thay đổi

    if (loading) return <h1>Loading...</h1>; // Hiển thị loading trong khi chờ API
    if (arr.length === 0) return <h1>Không có dữ liệu</h1>;

    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="tickets-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã Ghế</th>
                                <th>Thời Gian đặt vé</th>
                                <th>Thanh toán</th>
                                <th>Nơi Đi</th>
                                <th>Nơi Đến</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr.map((item, index) => (
                                <tr key={index}>
                                    <td>{JSON.parse(item.seat)}</td>
                                    <td>{item.booking_time}</td>
                                    <td>{item.status ? "đã thanh toán":"chưa thanh toán"}</td>
                                    <td>{item.id_pick_up}</td>
                                    <td>{item.id_drop_off}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
