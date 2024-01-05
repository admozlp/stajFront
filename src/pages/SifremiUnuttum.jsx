import React, { useEffect, useState } from "react";
import AdemTextInput from "../utilities/customFormControls/AdemTextInput";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import "../style/css/sifremi-unuttum.css";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordMail } from "../redux/slice/authSlice";
import LoadingButton from "../layouts/LoadingButton";
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from "../utilities/constants/recaptcha";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

export default function SifremiUnuttum() {
  const dispatch = useDispatch();

  const forgetPasswordMailSending = useSelector(
    (state) => state.auth.forgetPasswordMailSending
  );

  const forgetPasswordMailResponse = useSelector(
    (state) => state.auth.forgetPasswordMailResponse
  );

  const forgetPasswordMailError = useSelector(
    (state) => state.auth.forgetPasswordMailError
  );

  const handleOnSubmit = (values) => {
    dispatch(forgetPasswordMail(values));
  };

  const [capVal, setCapVal] = useState(null);

  useEffect(() => {
    if (forgetPasswordMailResponse && forgetPasswordMailResponse.data) {
      NotificationManager.success(
        forgetPasswordMailResponse.data.message,
        "Parola sıfırlama maili"
      );
    }

    if (forgetPasswordMailError && forgetPasswordMailError.response) {
      NotificationManager.error(
        forgetPasswordMailError.response.data.message,
        "HATA"
      );
    }
  }, [forgetPasswordMailResponse, forgetPasswordMailError]);

  const schema = Yup.object({
    email: Yup.string()
      .required("Email alanı zorunludur")
      .email("Geçerli bir e-posta adresi girin")
      .min(10, "Email adresi minimum 5 karakter olabilir")
      .max(200, "Email adresi 200 karakter olabilir")
      .matches(
        /^[a-zA-Z0-9._%+-]+@ogr\.ahievran\.edu\.tr$/,
        "Geçerli bir ahievran.edu.tr e-posta adresi girin"
      ),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleOnSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <h2 style={{ textAlign: "center", marginTop: 10 }}>
            Şifremi unuttum
          </h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <AdemTextInput
              name="email"
              type="email"
              className="sifre-unuttum-text-alani"
              id="email"
              placeholder="Email adresi"
            />
          </div>
          <div className="form-group">
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(val) => {
                setCapVal(val);
              }}
            />
          </div>
          {forgetPasswordMailSending ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              disabled={!capVal}
              className="sifre-unuttum-btn btn btn-secondary"
            >
              doğrulama maili gönder
            </button>
          )}
          <div className="link-unuttum-div">
            <Link to="/giris" className="link-unuttum">
              Giriş yap
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
