import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/slice/authSlice';
import "../style/css/navigation.css";
import { Link } from 'react-router-dom';
import { LoadingButtonSuccess } from './LoadingButton';


export default function Navigation() {
    
    const navigate =  useNavigate();

    const dispatch = useDispatch();

    const isLoading = useSelector((state)=> state.auth.isLoading);

    const handleSignOut = ()=>{
        dispatch(logout()).then((response) => {            
            if (logout.fulfilled.match(response)) {            
              localStorage.clear();
              navigate("/signin");                  
            }    
          });                
    }
    
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to="/" style={{textDecoration:'none'}}><b className="navbar-brand">Staj Yap</b></Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link to="/addbook" className="nav-link" style={{textDecoration:'none'}}>Add Book</Link>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Link</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link disabled">Disabled</span>
                    </li>
                </ul>

                <div className="ml-auto my-2 my-lg-0">
                {
                  isLoading ? (
                    <LoadingButtonSuccess />
                  ) : (
          
                    <button onClick={handleSignOut} className="btn btn-outline-success my-2 my-sm-0" type="submit" >Çıkış Yap</button>
                )}

                </div>
            </div>
        </nav>
    </div>
  )
}
