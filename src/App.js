import "./App.css";
import Dashboard from "./pages/Dashboard";
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
import AccessDenied from "./pages/AccessDenied";
import PageNotFound from "./pages/PageNotFound";
import VerifyAccount from "./pages/VerifyAccount";
import SifremiUnuttum from "./pages/SifremiUnuttum";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route exact="true" path="/*" element={<PageNotFound />} />
        <Route exact="true" path="/access-denied" element={<AccessDenied />} />

        <Route exact="true" path="/" element={<Dashboard />} />
        <Route exact="true" path="/basvurular" element={<StajBasvurulari />} />
        <Route exact="true" path="/staj-basvuru" element={<StajBasbvurusu />} />
        <Route exact="true" path="/kurul-onaylari" element={<KurulOnaylari />} />
        <Route exact="true" path="/komisyonlar" element={<Komisyonlar />} />
        <Route exact="true" path="/rapor-yaz" element={<RaporYaz />} />
        <Route exact="true" path="/ayarlar" element={<GenelAyarlar />} />
        <Route exact="true" path="/profilim" element={<Profilim />} />
        <Route exact="true" path="/verify-account/:token" element={<VerifyAccount />} />
        <Route exact="true" path="/sifremi-unuttum" element={<SifremiUnuttum />} />
        <Route exact="true" path="/reset-password" element={<ResetPassword />} />
        

        <Route exact="true" path="/giris" element={<SignIn />} />
        <Route exact="true" path="/kayit" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
