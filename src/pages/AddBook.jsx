import React from 'react'
import Navigation from '../layouts/Navigation'
import { Form, Formik } from "formik";
import AdemTextInput from '../utilities/customFormControls/AdemTextInput';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '../layouts/LoadingButton';
import { addBook } from '../redux/slice/bookSlice';
import { ToastContainer, toast } from 'react-toastify';


export default function AddBook() {
  const initialValues = {
    author: "",
    isbn: "",
    createdBy: "",
  };

  const schema = Yup.object({
    author: Yup.string()
      .required("Author field is required")
      .min(3, "Min 3 caharecters")
      .max(10, "Max 10 characters"),
    isbn: Yup.string()
      .required("ISBN field is required")
      .min(3)
      .max(8, "Max 15 characters"),
    createdBy: Yup.number()
      .required("Created By field is required")         
  });

  const dispatch = useDispatch();

  function handleOnSubmit(values){
    dispatch(addBook(values))
  }

  const isAdding = useSelector((state)=> state.book.isAdding);

  const addBookResponse = useSelector((state) => state.book.addBookResponse);

  const addBookError = useSelector((state) => state.book.addBookError);

  return (
    <div>
      <ToastContainer />
        <Navigation />
        {

         addBookResponse !== null ? 
          (
            toast.success(`${addBookResponse.message}`, {
              position: toast.POSITION.TOP_LEFT,
              toastId:""
            })
          ) : addBookError === "ERR_BAD_REQUEST" ?
          (
            toast.error(`Kitap Eklenemedi`, {
              position: toast.POSITION.TOP_LEFT,
              toastId:""
            })
          ) : null
        }
        <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          handleOnSubmit(values);
        }}>
        <Form>
          <div style={{width:500, justifyContent:'center'}}>
            <div className="form-group mb-2">
              <label htmlFor="authorId">Author</label>
              <AdemTextInput
                name="author"
                type="text"
                className="form-control"
                id="authorId"
                placeholder="Enter Author"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="isbnId">ISBN</label>
              <AdemTextInput
                name="isbn"
                type="text"
                className="form-control"
                id="isbnId"
                placeholder="Enter ISBN"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="createdById">Created By</label>
              <AdemTextInput                
                name="createdBy"
                type="number"
                className="form-control"
                id="createdById"
                placeholder="Enter Created By"
              />
            </div>

              {
                isAdding ? 
                (
                  <LoadingButton/>
                ) : (
                  <button type='submit' className="btn btn-primary" style={{width:'100%'}}>Add Book</button>
                )
              }
              
            
          </div>
        </Form>
      </Formik>
    </div>
  );
}
