import React, {Fragment, useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
// class Category extends Component
// function형 => Hooks (state전역 변수 설정)  => 16버전부터 지원 ==> 17(18=>Hooks)
// 데이터 관리 <==> 화면 출력 ====> MVC (Redux)
/*
    class A
    {
       int a;
       public void display()
       {
           int a=10;
       }
       main()
       {
           A a=new A();
           a.display();  => a=>사용후 메모리에서 삭제
           a.display();  => a변수가 다시 생성
       }
    }
 */
function Category(props)
{
    /*
         class Category extends Component{
            constructor(props)
            {
                this.state={
                    cateList:[]
                }
            }
         }
     */
    const [cateList,setCateList]=useState([])
    const [cateno,setCateno]=useState(1)
    // [변수명 , setter]   const [name ,setName]=useState('') , const [age,setAge]=useState(0)
    // componentDidMount() => axios.get()
    // componentDidMount ==> useEffect()
    // 1.오라클에서 데이터 읽기 =>
    // componentDidMount()
    // http://localhost:8080/web/food/rest_category.do?no=1
    useEffect(()=>{
         axios.get("http://localhost:8080/web/food/rest_category.do",{
             params:{
                 no:1
             }
         }).then(response=>{
             console.log(response.data)
             setCateList(response.data) //this.setState({변수:값})
         })
    },[]) // cateList[]을 초기화
    // 이벤트 처리
    const categoryChange=(no)=>{
        axios.get("http://localhost:8080/web/food/rest_category.do",{
            params:{
                no:no
            }
        }).then(response=>{
            console.log(response.data)
            setCateList(response.data) //this.setState({변수:값})
        })
    }
    /*
       useMemo(기능을 기억하고 있다가 재호출) , useCallback(자동 호출) , useContext(전역=모든 function()) ,
       useState(멤버변수 설정)
     */
    let html=cateList.map((food)=>
        <div className="col-md-4">
            <div className="thumbnail">
                <NavLink to={"/food/category_food_list/"+food.cno}>
                    <img src={food.poster} alt="Lights" style={{"width":"100%"}}/>
                    <div className="caption">
                        <p style={{"fontSize":"9px","fontWeight":"bold"}}>{food.title}</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
    return (
        <Fragment>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-lg btn-danger"} onClick={()=>categoryChange(1)}>믿고 보는 맛집 리스트</button>
                    <button className={"btn btn-lg btn-success"} onClick={()=>categoryChange(2)}>지역별 맛집 리스트</button>
                    <button className={"btn btn-lg btn-info"} onClick={()=>categoryChange(3)}>메뉴별 맛집 리스트</button>
                </div>
            </div>
            <div style={{"height":"30px"}}></div>
            <div className={"row"}>
                {html}
            </div>
        </Fragment>

    )
}

export default Category