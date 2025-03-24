import React from 'react'
import '../../pages/Profile/Profile.css'

export default function SideBar({ setActivePage }:any) {
  return (
    <div className="sidebar">
    <ul>
      <li onClick={() => setActivePage("profile")}>🔐 Thông tin tài khoản</li>
      <li onClick={() => setActivePage("orders")}>📦 Đơn hàng của tôi</li>
      <li onClick={() => setActivePage("offers")}>🎁 Ưu đãi</li>
    </ul>
  </div>
  )
}
