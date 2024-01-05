import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { checkTokenExpired, resetPassword } from "../redux/slice/authSlice";
import { NotificationManager } from "react-notifications";
import { Form, Formik } from "formik";
import AdemTextInput from "../utilities/customFormControls/AdemTextInput";
import * as Yup from "yup";
import LoadingButton from "../layouts/LoadingButton";

export default function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  const passworResetSending = useSelector(
    (state) => state.auth.passworResetSending
  );
  const passwordResetResponse = useSelector(
    (state) => state.auth.passwordResetResponse
  );
  const passwordResetError = useSelector(
    (state) => state.auth.passwordResetError
  );


  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {

    if (passwordResetResponse && passwordResetResponse.data) {
      NotificationManager.success(
        passwordResetResponse.data.message,
        "Parola sıfırlama"
      );

      navigate("/giris");
    }

    if (passwordResetError && passwordResetError.response) {
      NotificationManager.error(
        passwordResetError.response.data.message,
        "HATA"
      );
    }

    dispatch(checkTokenExpired(token));

    if (
      tokenCheckError.response &&
      tokenCheckError.response.data.code === 401 
    ) {
      NotificationManager.error(
        "Parola yenileme süresi doldu. Tekrar parola sıfırlama isteğinde bulununuz.",
        "Doğrulama süresi"        
      );

      localStorage.clear();
      return navigate("/giris");
    }
  }, [dispatch, token, tokenCheckError.response, navigate,passwordResetError, passwordResetResponse]);

  const handleOnSubmit = (values) => {
    dispatch(resetPassword(values));
  };

  const schema = Yup.object({
    password: Yup.string()
      .required("Parola alanı zorunludur")
      .min(8, "Parola minimum 8 karakter olabilir")
      .max(100, "Parola maksimum 150 karakter olabilir"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"
    // ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Parolalar uyuşmuyor"
    ),
  });

  return (
    <div>
      <Formik
        initialValues={{password:"", token:token}}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleOnSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <h2 style={{ textAlign: "center", marginTop: 10 }}>Parola sıfırla</h2>
          <div className="form-group">
            <label htmlFor="email">Parola</label>
            <AdemTextInput
              name="password"
              type="password"
              className="sifre-unuttum-text-alani"
              id="email"
              placeholder="Parola"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Parola tekrar</label>
            <AdemTextInput
              name="passwordConfirmation"
              type="password"
              className="sifre-unuttum-text-alani"
              id="email"
              placeholder="Parola tekrar"
            />
          </div>

          {passworResetSending ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className="sifre-unuttum-btn btn btn-secondary"
            >
              parolayı sıfırla
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}
