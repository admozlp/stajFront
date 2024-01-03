import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import Sidebar from "../layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "../style/css/profilim.css";
import AdemTextInput from "../utilities/customFormControls/AdemTextInput";
import { Field, Form, Formik } from "formik";
import { checkTokenExpired } from "../redux/slice/authSlice";
import { Col, Row } from "react-bootstrap";

export default function Profilim() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  useEffect(() => {
    dispatch(checkTokenExpired());

    if (!LoginController()) {
      setIsLoggedIn(false);
      return navigate("/giris");
    }
    if (tokenCheckError && tokenCheckError.code === 401) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, tokenCheckError, dispatch]);

  return (
    <div className="profilim-container">
      {isLoggedIn ? (
        <>
          <Sidebar aktif={7} />
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              // submit form values
            }}
          >
            <Form className="form">
              <label htmlFor="email">Email</label>
              <AdemTextInput
                name="email"
                type="email"
                className="profilim-text-alani"
                id="email"
                placeholder="Email adresi"
              />

              <label htmlFor="fakulte">Fakülte</label>
              <Field as="select" name="fakulte" aria-label="Seçiniz">
                <option>Seçiniz</option>
                <option value="1">Mühendislik Mimarlık Fakültesi</option>
                <option value="2">Eğitim Fakültesi</option>
                <option value="3">Tıp Fakültesi</option>
              </Field>

              <label htmlFor="bolum">Bölüm</label>
              <Field as="select" name="bolum" aria-label="Seçiniz">
                <option>Seçiniz</option>
                <option value="1">Bilgisayar Mühendisliği</option>
                <option value="2">Bilgisayar Programcılığı</option>
                <option value="3">Bilişim Ve Yönetim Sistemleri</option>
              </Field>

              <label htmlFor="program">Program</label>
              <Field as="select" name="program" aria-label="Seçiniz">
                <option>Seçiniz</option>
                <option value="1">Bilgisayar Mühendisliği</option>
                <option value="2">Bilgisayar Programcılığı</option>
                <option value="3">Bilişim Ve Yönetim Sistemleri</option>
              </Field>
              <label htmlFor="sinif">Sınıf</label>
              <Field as="select" name="sinif" aria-label="Seçiniz">
                <option>Seçiniz</option>
                <option value="1">1. Sınıf</option>
                <option value="2">2. Sınıf</option>
                <option value="3">3. Sınıf</option>
                <option value="4">4. Sınıf</option>
              </Field>
              <label htmlFor="largeText">Large Text</label>
              <Field as="textarea" name="largeText" />

              <Row>
                <Col>
                  <label htmlFor="il">İl</label>
                  <Field as="select" name="il" aria-label="Seçiniz">
                    <option>İl</option>
                    <option value="Ankara">Ankara</option>
                    <option value="Denizli">Denizli</option>
                    <option value="Kırşehir">Kırşehir</option>
                  </Field>
                </Col>
                <Col>
                  <label htmlFor="sinif">İlçe</label>
                  <Field as="select" name="ilce" aria-label="Seçiniz">
                    <option>Seçiniz</option>
                    <option value="Merkez">Merkez</option>
                    <option value="Kaman">Kaman</option>
                    <option value="Mucur">Mucur</option>
                    <option value="Özbağ">Özbağ</option>
                  </Field>
                </Col>
              </Row>
            </Form>
          </Formik>
        </>
      ) : null}
    </div>
  );
}
