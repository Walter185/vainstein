import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/ErrorPage';
import Home from './pages/Home';
import { Loginpage } from './components/Login/LoginForm';
import ForgotPassword from './components/Forgot';
import Registerpage from './components/Register/Registerpage';
import Footer from './components/Footer';
import UserProfile from './pages/Admin';
import AppointmentBooking from './components/Appointments';
// import EnConstruccion from './pages/EnConstruccion';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes >
      {/* <Route path="/" element={<EnConstruccion />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/admin" element={<UserProfile />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/turnos" element={<AppointmentBooking />} />
        < Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
