import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function Nature(props)
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
        axios.get("http://localhost:8080/web/seoul/nature_list.do",{
            params:{
                page:page
            }
        }).then(res=>{
            console.log(res.data)
            setLocList(res.data)
        })
    },[])

    // -- 이벤트 처리 (페이지 나누기 : 이전/다음)
    // 데이터를 출력할 HTML을 만들어서 화면에 출력 => render() => return ()
    let html=locList.map((loc)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"/seoul/location_detail/"+loc.no}>
                    <img src={loc.poster} alt="Lights" style={{"width":"200px","height":"180px"}}/>
                    <div className="caption">
                        <p style={{"fontSize":"9px","fontWeight":"bold"}}>{loc.title}</p>
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
export default Nature