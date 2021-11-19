import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
function FoodHouseFind(props)
{
    // 변수 설정
    const [findList,setFindList]=useState([])
    const [page,setPage]=useState(1)
    const [totalpage,setTotalpage]=useState(0)
    const [searchString,setSearchString]=useState('마포')
    // 첫번화면
    useEffect(()=>{
        axios.get("http://localhost:8080/web/food/find.do",{
            params:{
                page:1,
                ss:searchString
            }
        }).then(res=>{
            console.log(res.data) // 디버깅
            setFindList(res.data)
            setPage(res.data[0].page)
            setTotalpage(res.data[0].totalpage)
        })
    },[])
    // 이벤트 처리
    const findChange=(e)=>{
        setSearchString(e.target.value)
    }
    const findClick=()=>{
        axios.get("http://localhost:8080/web/food/find.do",{
            params:{
                page:1,
                ss:searchString
            }
        }).then(res=>{
            console.log(res.data) // 디버깅
            setFindList(res.data)
            setPage(res.data[0].page)
            setTotalpage(res.data[0].totalpage)
        })
    }
    //이전
    const onPrev=()=>{
       setPage(page>1?page-1:page)
        axios.get("http://localhost:8080/web/food/find.do",{
            params:{
                page:page,
                ss:searchString
            }
        }).then(res=>{
            console.log(res.data) // 디버깅
            setFindList(res.data)
        })
    }
    //다음
    const onNext=()=>{
       setPage(page<totalpage?page+1:page)
        axios.get("http://localhost:8080/web/food/find.do",{
            params:{
                page:page,
                ss:searchString
            }
        }).then(res=>{
            console.log(res.data) // 디버깅
            setFindList(res.data)
        })
    }
    // 데이터를 HTML에 출력
    let html=findList.map((f)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"/food/find_detail/"+f.no}>
                    <img src={f.poster} alt="Lights" style={{"width":"200px","height":"180px"}}/>
                    <div className="caption">
                        <p style={{"fontSize":"9px","fontWeight":"bold"}}>
                            {f.name}
                        </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )

    return (
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                      <tr>
                          <td>
                              <input type={"text"} className={"input-sm"} size={"30"} onChange={findChange}
                               value={searchString}
                              />
                              <button className={"btn btn-sm btn-primary"} onClick={findClick}>검색</button>
                          </td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <div style={{"height":"30px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-primary"} onClick={onPrev}>이전</button>
                    {page} page / {totalpage} pages
                    <button className={"btn btn-sm btn-primary"} onClick={onNext}>다음</button>
                </div>
            </div>
        </Fragment>
    )
}

export default FoodHouseFind