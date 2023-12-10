import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../layouts/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, getAllBook, getBookCount } from '../redux/slice/bookSlice';
import Pagination from '../layouts/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import BookTable from '../layouts/BookTable';
import { Alert } from 'react-bootstrap';

export default function Dashboard() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const userToken = localStorage.getItem('user-token');
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      
      return navigate('/signin');
    }
    setIsLoggedIn(true);

    dispatch(getBookCount());

    dispatch(getAllBook(0));
  }, [isLoggedIn,navigate, userToken, dispatch]);
  
  const books = useSelector((state)=> state.book.allBooks);

  const pageCount = useSelector((state)=>state.book.bookCount) / 20 ;

  const deleteResponse = useSelector((state)=> state.book.deleteResponse);

  const bookLoadingError = useSelector((state) => state.book.bookLoadingError);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);  
    dispatch(getAllBook(newPage));
  };
  
  const handleOnDelete = (bookId) =>{
    dispatch(deleteBook(bookId))
  }    

  return (
    <div>
      <Navigation />

      <h2 className="text-center">Dashboard</h2><br/>

      <ToastContainer />
      {
          bookLoadingError ===  "ERR_BAD_REQUEST" ? (
            navigate("/signin")          
          ): bookLoadingError === "ERR_NETWORK" ? (
            <Alert variant='danger'>No internet connection</Alert>
          ):
          deleteResponse.code === 200 ? 
          ( 
            toast.success(`${deleteResponse.message}`, {
              position: toast.POSITION.TOP_LEFT,
              toastId:""
            })
          ) : null
      }

      <BookTable 
        books = {books}
        handleOnDelete = {handleOnDelete}        
      />
      
      <Pagination 
      totalPages={Math.ceil(pageCount)} 
      currentPage={currentPage}
      onPageChange={handlePageChange} />

    </div>
  )
};
