import { useField } from "formik";
import React from "react";
import '/kamp/staj/src/style/css/SignIn.css';


export default function AdemTextInput({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <input {...field} {...props} />
      {
        meta.touched && !!meta.error ? (
          <small className="text-danger">{meta.error}</small>
        ) : null
      }
    </div>
  );
}
