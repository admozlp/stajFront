import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import AdemTextInput from '../utilities/customFormControls/AdemTextInput';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getBookById, updateBook } from '../redux/slice/bookSlice';
import { Alert, Spinner } from 'react-bootstrap';


export default function UpdateBook() {
    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {                                
        dispatch(getBookById(id));
      }, [dispatch, id]);

    const getBookByIdLoading = useSelector((state)=> state.book.getBookByIdLoading);  

    const getBookByIdResponse = useSelector((state)=> state.book.getBookByIdResponse);
    
    const getBookByIdError = useSelector((state)=> state.book.getBookByIdError);

    const isUpdating = useSelector((state)=> state.book.isUpdating);
    
    const updateBookError = useSelector((state)=> state.book.updateBookError);
    
    const updateBookResponse = useSelector((state) => state.book.updateBookResponse);

    const schema = Yup.object({
        author: Yup.string()
            .required("Author field is required")
            .min(3, "Min 3 caharecters")
            .max(10, "Max 10 characters"),
        isbn: Yup.string()
            .required("ISBN field is required")
            .min(3)
            .max(8, "Max 15 characters"),     
    });    

    function handleOnUpdate(values){
        dispatch(updateBook(values));
    }
    
  return (
    <div>
      <ToastContainer />
      <Navigation />
      {
        updateBookResponse !== null ? (
          toast.success(`${updateBookResponse.message}`, {
            position: toast.POSITION.TOP_LEFT,
            toastId:""
          })
        ) : updateBookError !== null ?
        (
          <Alert variant='danger'>{updateBookError}</Alert>
        ) : null
      }
      {
        getBookByIdLoading || isUpdating ? 
        (
            <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        ) :  getBookByIdError ?  
        (
            <Alert variant='danger'>{getBookByIdError}</Alert>
        ): getBookByIdResponse ?
      (
      <Formik
      initialValues={{
        author : getBookByIdResponse.author,
        isbn : getBookByIdResponse.isbn,
        id: id
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        //resetForm();
        handleOnUpdate(values);
      }}>
      <Form>
        <div style={{width:500, justifyContent:'center'}}>
        <h2 style={{textAlign:'center', color:"green"}}>Update Book</h2>        
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
          <button type='submit' className="btn btn-success" style={{width:'100%'}}>Update</button>
        </div>
      </Form>
    </Formik>
  ) : null}
  </div>
  )
}
