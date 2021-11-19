import React,{Fragment,useState,useEffect} from "react";
// props.match.params.chef  ==> request.getParameter("chef")
import axios from "axios";
import {NavLink} from "react-router-dom";
function ChefDetail(props)
{
     const [recipeList,setRecipeList]=useState([]) // 20개
     // 데이터 읽기
     useEffect(()=>{
          axios.get("http://localhost:8080/web/recipe/chef_detail.do",{
               params:{
                    chef:props.match.params.chef
               }
          }).then(res=>{
               console.log(res.data)
               setRecipeList(res.data)
          })
     },[])

     // HTML을 모아서 출력 준비
     let html=recipeList.map((vo)=>
         <div className="col-md-3">
              <div className="thumbnail">
                   <NavLink to={"/recipe/detail/"+vo.no}>
                        <img src={vo.poster} alt="Lights" style={{"width":"100%"}}/>
                        <div className="caption">
                             <p style={{"fontSize":"9px","fontWeight":"bold"}}>{vo.title}</p>
                             <p style={{"fontSize":"9px","fontWeight":"bold"}}>By {vo.chef}</p>
                        </div>
                   </NavLink>
              </div>
         </div>
     )
     return (
         <div className={"row"}>
              {html}
         </div>
     )
}

export default ChefDetail