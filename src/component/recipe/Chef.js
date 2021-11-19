import React,{Fragment,useEffect,useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

// 요청 = 응답  (axios , fetch)
function Chef(props)
{
    // 변수  useState
    const [chefList,setChefList]=useState([])
    // String[] chefList=null
    const [page,setPage]=useState(1)
    // int page=1
    const [totalpage,setTotalPage]=useState(0)
    // int totalpage=0
    // 첫페이지 출력  useEffect
    // componentWillMount , componentDidMount
    useEffect(()=>{
       axios.get("http://localhost:8080/web/recipe/chef_list.do",{
           params:{
               page:page
           }
       }).then(res=>{
           console.log(res.data)
           setChefList(res.data)
           setPage(res.data[0].page)
           setTotalPage(res.data[0].totalpage)
       })
    },[])
    // 이벤트   const 이벤트=()=>{}
    const onPrev=()=>{
        setPage(page>1?page-1:page)
        axios.get("http://localhost:8080/web/recipe/chef_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setChefList(res.data)
        })
    }
    const onNext=()=>{
        setPage(page<totalpage?page+1:page)
        axios.get("http://localhost:8080/web/recipe/chef_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setChefList(res.data)
        })
    }
    // HTML    retur  (JSX)
    let html=chefList.map((c)=>
      <table className={"table"}>
          <tbody>
            <tr>
                <td width={"30%"} className={"text-center"} rowSpan={"2"}>
                    <NavLink to={"/recipe/chef_detail/"+c.chef}>
                      <img src={c.poster} style={{"width":"100px","height":"100px"}}
                            className={"img-circle"}/>
                    </NavLink>
                </td>
                <td colSpan={"4"} width={"70%"}>
                    <h3 style={{"color":"orange"}}>
                        <NavLink to={"/recipe/chef_detail/"+c.chef}>{c.chef}</NavLink>
                    </h3>
                </td>
            </tr>
            <tr>
                <td className={"text-center"}>
                    <img src={"http://localhost:3000/mc1.png"}/>{c.mc1}
                </td>
                <td className={"text-center"}>
                    <img src={"http://localhost:3000/mc3.png"}/>{c.mc3}
                </td>
                <td className={"text-center"}>
                    <img src={"http://localhost:3000/mc7.png"}/>{c.mc7}
                </td>
                <td className={"text-center"}>
                    <img src={"http://localhost:3000/mc2.png"}/>{c.mc2}
                </td>
            </tr>
          </tbody>
      </table>
    )
    return (
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>{html}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-danger"} onClick={onPrev}>이전</button>
                    {page} page / {totalpage} pages
                    <button className={"btn btn-sm btn-danger"} onClick={onNext}>다음</button>
                </div>
            </div>
        </Fragment>
    )
}
export default Chef