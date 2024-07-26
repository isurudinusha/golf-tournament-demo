import 'bootstrap/dist/css/bootstrap.min.css';
import SocreTable from './components/score-table';
import './App.css';
import Navagation from './components/navagation';
import Auth from './routes/authentication';
import { Route, Routes } from "react-router-dom";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Navagation />}>
        <Route index element={<SocreTable />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
