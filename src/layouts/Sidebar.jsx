import SidebarItem from "./SidebarItem"
import items from "../data/sidebar.json"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slice/authSlice";


export default function Sidebar(){
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
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
          <Link className="sidebar-item plain" onClick={hadnleSignOut}>Çıkış Yap</Link>
        </div>
    )
}