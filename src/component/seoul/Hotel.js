import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function Hotel(props)
{
    // 데이터를 저장할 변수 => useState   ,  this.state (class형)
    const [locList,setLocList]=useState([])
    const [page,setPage]=useState(1)
    const [totalpage,setTotalpage]=useState(0)
    /*
        this.state={
            locList:[],
            page:1,
            totalpage:0
        }
     */
    // 처음에 출력할 데이터 읽어 오기 : componentDidMount() => useEffect()
    // http://localhost:8080/web/seoul/location_list.do?page=1
    useEffect(()=>{
        axios.get("http://localhost:8080/web/seoul/hotel_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setLocList(res.data)
            setPage(res.data[0].page)
            setTotalpage(res.data[0].totalpage)
        })
    },[])

    // -- 이벤트 처리 (페이지 나누기 : 이전/다음)
    // list.do?page=${curpage>1?curpage-1:curpage}
    const onPrev=()=>{
        setPage(page>1?page-1:page)
        axios.get("http://localhost:8080/web/seoul/hotel_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setLocList(res.data)
        })
    }
    // list.do?page=${curpage<totalpage?curpage+1:curpage}
    const onNext=()=>{
        setPage(page<totalpage?page+1:page)
        axios.get("http://localhost:8080/web/seoul/hotel_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setLocList(res.data)
        })
    }
    // 데이터를 출력할 HTML을 만들어서 화면에 출력 => render() => return ()
    let html=locList.map((loc)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"/seoul/location_detail/"+loc.no}>
                    <img src={loc.poster} alt="Lights" style={{"width":"200px","height":"180px"}}/>
                    <div className="caption">
                        <p style={{"fontSize":"9px","fontWeight":"bold"}}>
                            {loc.name}
                            <span style={{"color":"orange"}}>{loc.score}</span>
                        </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
    return (
        <Fragment>
            <div className={"row"}>
                {html}
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
export default Hotel