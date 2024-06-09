import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/ErrorPage';
import Home from './pages/Home';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes >
        <Route path="/" element={<Home />} />
        < Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
