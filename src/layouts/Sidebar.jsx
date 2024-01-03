import SidebarItem from "./SidebarItem"
import items from "../data/sidebar.json"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slice/authSlice";
import 'react-bootstrap-icons'
import { BoxArrowRight } from "react-bootstrap-icons";
import '../style/css/sidebar.css'


export default function Sidebar({aktif}){
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const hadnleSignOut = () =>{
    dispatch(logout()).then((response) => {            
      if (logout.fulfilled.match(response)) {            
        localStorage.clear();
        navigate("/giris");                  
      }    
    });  
  }
    return (
        <div className="sidebar" style={{color:"#060818"}}>
          
          { items.map((item, index) => <SidebarItem key={index} item={item} aktif={aktif} />) }

            <Link className="sidebar-item plain" onClick={hadnleSignOut} >
              <BoxArrowRight />
              <small style={{marginRight:10}}></small>
              Çıkış Yap
            </Link>
        </div>
    )
}