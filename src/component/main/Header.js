import React,{Component,Fragment} from "react";
import {NavLink} from "react-router-dom";

class Header extends Component{
   render() {
       return (
           <nav className="navbar navbar-inverse">
               <div className="container-fluid">
                   <div className="navbar-header">
                       <NavLink className="navbar-brand" to="/">Front-End</NavLink>
                   </div>
                   <ul className="nav navbar-nav">
                       <li className="active"><NavLink to="/">Home</NavLink></li>
                       <li className="dropdown">
                           <a className="dropdown-toggle" data-toggle="dropdown" href="#">레시피
                               <span className="caret"></span></a>
                           <ul className="dropdown-menu">
                               <li><NavLink to={"/recipe/list"}>레시피목록</NavLink></li>
                               <li><NavLink to={"/recipe/chef"}>쉐프목록</NavLink></li>
                           </ul>
                       </li>
                       <li><a href="#">맛집</a></li>
                       <li><a href="#">서울 여행</a></li>
                   </ul>
               </div>
           </nav>
       )
   }
}
export default Header