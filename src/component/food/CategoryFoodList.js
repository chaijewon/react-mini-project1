import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

/*
    class Category extends Component
    {
        render(){
            return (
               => 화면에 출력할 HTML
            )
        }
    }
 */
function CategoryFoodList(props)
{
     // 변수 선언 => 데이터변경이 가능 => state ==> useState(전역변수)
     // state프로그램 (React) : 데이터 중복이 많은 경우 , 실시간
    const [foodList,setFoodList]=useState([])
    const [info,setInfo]=useState({})
    // this.state={foodList:[]} , data:{foodList:[]}(Vue)
    // useEffect => componentDidMount() => setXxx()값을 채우면 => return에서 변경 => HTML이 변경후에 출력
    useEffect(()=>{
       axios.get("http://localhost:8080/web/food/rest_food_category_list.do",{
           params:{
               cno:props.match.params.cno
           }
       }).then(response=>{
           // 응답
           console.log(response.data)
           setFoodList(response.data)
       })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:8080/web/food/rest_food_category_info.do",{
            params:{
                cno:props.match.params.cno
            }
        }).then(response=>{
            // 응답
            console.log(response.data)
            setInfo(response.data)
        })
    },{})
    // kotlin ==> var a(변수)  , val b(상수)
    // var a:Int  a:String  a:Array ....
    // var a=10 var a="aaa"
    // JSX => JavaScript+XML
    /*
          <ul>
           <li>aaa</li>
           <li>bbb</li>
          </ul>

          React.createElement('ul',null,
            React.createElement('li',null,'aaa'),
            React.createElement('li',null,'bbb')
           )

           /food/detail/"+food.no
           /food/detail/1
           food/detail?no=1
     */
    let html=foodList.map((food)=>
         <table className={"table"}>
             <tbody>
             <tr>
                 <td className={"text-center"} width={"30%"} rowSpan={"4"}>
                     <NavLink to={"/food/detail/"+food.no}>
                      <img src={food.poster} style={{"width":"200px","height":"130px"}} className={"img-rounded"}/>
                     </NavLink>
                 </td>
                 <td width={"70%"} colSpan={"2"}>
                     <h3><NavLink to={"/food/detail/"+food.no}>{food.name}</NavLink> <span style={{"color":"orange"}}>{food.score}</span></h3>
                 </td>
             </tr>
             <tr>
                 <td width={"20%"}>주소</td>
                 <td width={"50%"}>{food.address}</td>
             </tr>
             <tr>
                 <td width={"20%"}>전화</td>
                 <td width={"50%"}>{food.tel}</td>
             </tr>
             <tr>
                 <td width={"20%"}>음식종류</td>
                 <td width={"50%"}>{food.type}</td>
             </tr>
             </tbody>
         </table>
    )
    return (
        <Fragment>
            <div className={"row"}>
               <div className={"text-center"}>
                   <h2>{info.title}</h2>
                   <h4 style={{"color":"gray"}}>{info.subject}</h4>
               </div>
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

export default CategoryFoodList