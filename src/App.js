// import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/ErrorPage';
import Home from './pages/Home';
import { Loginpage } from './components/Login/LoginForm';
import ForgotPassword from './components/Forgot';
import Registerpage from './components/Register/Registerpage';

// import EnConstruccion from './pages/EnConstruccion';

function App() {
  return (
    <>
    <BrowserRouter>
      {/* <Header/> */}
      <Routes >
      {/* <Route path="/" element={<EnConstruccion />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
        < Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
