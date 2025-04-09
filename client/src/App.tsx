import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { LocationDetailPage } from './pages/LocationDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="location/:id" element={<LocationDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;