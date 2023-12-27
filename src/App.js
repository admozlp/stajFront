import "./App.css";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import StajBasvurulari from "./pages/StajBasvurulari";
import KurulOnaylari from "./pages/KurulOnaylari";
import Komisyonlar from "./pages/Komisyonlar";
import RaporYaz from "./pages/RaporYaz";
import GenelAyarlar from "./pages/GenelAyarlar";
import Profilim from "./pages/Profilim";
import StajBasbvurusu from "./pages/StajBasbvurusu";

function App() {
  return (
    <div>
      <Routes>
        <Route exact="true" path="/" element={<Dashboard />} />
        <Route exact="true" path="/basvurular" element={<StajBasvurulari />} />
        <Route exact="true" path="/stajbasvuru" element={<StajBasbvurusu />} />
        <Route exact="true" path="/kurul-onaylari" element={<KurulOnaylari />} />
        <Route exact="true" path="/komisyonlar" element={<Komisyonlar />} />
        <Route exact="true" path="/rapor" element={<RaporYaz />} />
        <Route exact="true" path="/ayarlar" element={<GenelAyarlar />} />
        <Route exact="true" path="/profilim" element={<Profilim />} />

        <Route exact="true" path="/giris" element={<SignIn />} />
        <Route exact="true" path="/kayit" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
