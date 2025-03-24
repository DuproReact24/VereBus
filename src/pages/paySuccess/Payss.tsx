import React, { useEffect, useState } from 'react'
import styles from "./Pay.module.css";
import { useSelector } from 'react-redux';
import {  selectBook, selectBook1, selectPay } from '../../store/book/bookslice';
import pay  from '../../store/book/bookslice';
import { useHistory } from 'react-router-dom';
export default function Payss() {
    const history = useHistory()
    const [data1,setDate1] = useState<any>({
        companyName:"",
        arrivalTime:"",
        booking_time:"",
        departureTime:"",
        email:"",
        id_drop_off:1,
        customer_id:2,
        from:{name:"",address:""},
        fullname:"",
        namepay:"",
        phone:"",
        seats:[],
        id_pick_up:0,
        to:{name:"",address:""},
        status:true,
        seat:[],
        total: ""
        

    })
    console.log(data1)
    const data = useSelector(selectPay)
    console.log({data})
    useEffect(() => { 
        if(Object.keys(data).length === 0){
            history.push('/')
        }
        setDate1(data)
     },[])
    
    return (
        <>
          <div className={styles.ticketContainer} style={{marginTop:20}}>
          
            
            <div className={styles.section}>
              <h2>Thông tin dịch vụ</h2>
              <p><strong>Hãng xe:</strong> {data1.companyName}</p>
              <p><strong>Điểm đón:</strong> {data1.from.name}</p>
              <p>{data1.from.address}</p>
         
              <p><strong>Điểm trả:</strong> {data1.to.name}</p>
              <p>{data1.to.address}</p>
              <p><strong>Số ghế/giường:</strong> VIP:{data1.seats}</p>
              <p><strong>Giá vé:</strong> {data1.total}</p>
              <p><strong>Loại xe:</strong> Limousine 20 phòng</p>
          
              <p>( ngày {data1.booking_time})</p>
              <h3 className={styles.totalPrice}>Tổng tiền: {data1.total}</h3>
            </div>
      
            <div className={styles.section}>
              <h2>Thông tin hành khách</h2>
              <p><strong>Họ tên:</strong> {data1.fullname}</p>
              <p><strong>Điện thoại:</strong> {data1.phone}</p>
              <p><strong>Email:</strong> {data1.email}</p>
              <p><strong>Hình thức thanh toán:</strong> {data1.namepay}</p>
            </div>
            
            
          </div></>
        )

    
 
}
