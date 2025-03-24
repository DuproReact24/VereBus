import React, { useState, useEffect } from 'react'
import '../Profile/Profile.css'
import SideBar from '../../components/SideBar/SideBar';
import ProfileCustomer from '../ProfileCustomer/ProfileCustomer';
import Dh from '../../components/dh/Dh';
import { useHistory } from 'react-router-dom';

interface ProfileProps {
  section?: string;
}

export default function Profile({ section }: ProfileProps) {
  const [activePage, setActivePage] = useState("profile");
  const token = localStorage.getItem('token')
  const history = useHistory()
  useEffect(() => {
    if(!token){
      history.push('/')
      alert('vui lòng đăng nhập')
    }
    if (section) {
      setActivePage(section);
    } else if (window.location.pathname === "/profile/orders") {
      setActivePage("orders");
    }
  }, [section]);

  const renderContent = () => {
    switch (activePage) {
      case "orders":
        return <Dh></Dh>
      case "offers":
        return <h2>Ưu đãi</h2>;
      default:
        return <ProfileCustomer />;
    }
  };

  return (
    <>
      <div className="container">
        <SideBar setActivePage={setActivePage} activePage={activePage} />
        <div className="content">{renderContent()}</div>
      </div>
    </>
  );
}
