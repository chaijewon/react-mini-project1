import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
function News(props)
{
    // 변수 설정 => 데이터를 저장하는 공간  => useState
    const [newsList,setNewsList]=useState([])
    const [fd,setFd]=useState('맛집')
    // 첫화면 실행 => 데이터 읽기 => useEffect => axios
    useEffect(()=>{
        axios.get("http://localhost:8080/web/food/news.do",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewsList(res.data)
        })
    })
    // 이벤트 처리 => const(let) 이벤트명 =()=>{이벤트}
    const newsChange=(e)=>{
        setFd(e.target.value)
    }
    const newsFind=()=>{
        axios.get("http://localhost:8080/web/food/news.do",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewsList(res.data)
        })
    }
    // const onPrev=()=>{} => 호출시 : onClick={onPrev}
    // HTML 출력 return ()
    let html=newsList.map((n)=>
      <table className={"table"}>
          <tbody>
            <tr>
                <td><h3 style={{"color":"orange"}}>{n.title}</h3></td>
            </tr>
            <tr>
              <td>{n.desc}</td>
            </tr>
            <tr>
              <td className={"text-right"}>{n.author}</td>
            </tr>
          </tbody>
      </table>
    )
    return (
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tr>
                        <td>
                            <input type={"text"} size={"30"} className={"input-sm"}
                              value={fd} onChange={newsChange}
                            />
                            <button className={"btn btn-sm btn-danger"} onClick={newsFind}>검색</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{"height":"30px"}}></div>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                     <tr>
                        <td>{html}</td>
                     </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
export default News