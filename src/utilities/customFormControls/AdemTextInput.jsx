import { useField } from "formik";
import React from "react";
import '/kamp/staj/src/style/css/signin.css';


export default function AdemTextInput({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <input {...field} {...props} />
      {
        meta.touched && !!meta.error ? (
          <small className="text-danger" style={{margin:0, fontSize:13, maxWidth:400}}>{meta.error}</small>
        ) : null
      }
    </div>
  );
}
