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
import * as Yup from "yup";

export default function Profilim() {
  const schema = Yup.object({
    ogrenciNo: Yup.string().required("Öğrenci numarası zorunludur"),
    tcNo: Yup.string().required("Tc alanı zorunludur"),
    fakulte: Yup.string().required("Fakulte alanı zorunludur"),
    bolum: Yup.string().required("Bölüm alanı zorunludur"),
    program: Yup.string().required("Program alanı zorunludur"),
    sinif: Yup.string().required("Sınıf alanı zorunludur"),
    adres: Yup.string().required("Adres alanı zorunludur"),
    il: Yup.string().required("İl alanı zorunludur"),
    ilce: Yup.string().required("İlçe alanı zorunludur"),
  });

  const initialValues = {
    ogrenciNo: "",
    tcNo: "",
    fakulte: "",
    bolum: "",
    program: "",
    sinif: "",
    adres: "",
    il: "",
    ilce: "",
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  useEffect(() => {

    const token = localStorage.getItem("user-token");

    dispatch(checkTokenExpired(token));

    if (!LoginController()) {
      setIsLoggedIn(false);
      return navigate("/giris");
    }

    if (
      tokenCheckError.response &&
      tokenCheckError.response.data.code === 401
    ) {
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
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
              // submit form values
              // console.log(values);
            }}
          >
            <Form className="form">
              <div className="form-container">
                <Row>
                  <Col>
                    <label htmlFor="ogrenciNo">Öğrenci numarası</label>
                    <AdemTextInput
                      name="ogrenciNo"
                      type="text"
                      className="profilim-text-alani"
                      id="ogrenciNo"
                      placeholder="Öğrenci numarası"
                    />
                  </Col>
                  <Col>
                    <label htmlFor="tcNo">Tc no</label>
                    <AdemTextInput
                      name="tcNo"
                      type="text"
                      className="profilim-text-alani"
                      id="tcNo"
                      placeholder="TC kimlik numarası"
                    />
                  </Col>
                </Row>

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
                <label htmlFor="adres">Large Text</label>
                <Field as="textarea" name="adres" />

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
                    <label htmlFor="ilce">İlçe</label>
                    <Field as="select" name="ilce" aria-label="Seçiniz">
                      <option>Seçiniz</option>
                      <option value="1">Merkez</option>
                      <option value="2">Kaman</option>
                      <option value="3">Mucur</option>
                      <option value="4">Özbağ</option>
                    </Field>
                  </Col>
                </Row>

                <label htmlFor="sgkKaydi"
                style={{display:"inline"}}
                >SGK kaydı var mı?</label>
                <div role="group" aria-labelledby="sgkKaydi">
                  <label style={{display:"inline"}}>
                    <Field type="radio" name="sgkKaydi" value="true" />
                    Evet
                  </label >
                  <label style={{display:"inline"}}>
                    <Field type="radio" name="sgkKaydi" value="false" />
                    Hayır
                  </label>                  
                </div>

                <button
                  type="submit"
                  className="profili-kaydet-btn btn btn-secondary"
                >
                  Kaydet
                </button>

             


              </div>
            </Form>
          </Formik>
        </>
      ) : null}
    </div>
  );
}
