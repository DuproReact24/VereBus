import './App.css';
import LayoutCar from './layout/LayoutCar';
import LayoutHome from './layout/LayoutHome';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Switch } from "react-router-dom"; // Ensure BrowserRouter is used
import Profile from './pages/Profile/Profile';
import Ticket from './pages/ticket/Ticket';
import Order from './pages/order/Order';
import Pay from './pages/pay/Pay';
import Payss from './pages/paySuccess/Payss';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <LayoutHome children={<Home />} />} exact />
        <Route path="/profile" component={() => <LayoutCar children={<Profile />} />} />
        <Route
          path="/profile/orders"
          component={() => <LayoutCar children={<Profile section="orders" />} />}
        />
          <Route
          path="/ticket"
          component={() => <LayoutCar children={<Ticket />} />}
        />
        <Route path="/order" component={() => <LayoutHome children={<Order />} />} />
        <Route path="/pay" component={() => <LayoutHome children={<Pay />} />} />
        <Route path="/payss" component={() => <LayoutHome children={<Payss/>} />} />
        <Route path="/admin" component={() => <Admin/>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
