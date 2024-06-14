import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/ErrorPage';
// import Home from './pages/Home';
import EnConstruccion from './pages/EnConstruccion';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes >
      <Route path="/" element={<EnConstruccion />} />
      {/* <Route path="/" element={<Home />} /> */}
        < Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
