import React,{Component,Fragment} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

/*
     Front : 화면 출력
             일반 HTML ==> JSP (서버를 거쳐서 다른 데이터를 읽어서 출력)
                          list.jsp?page=2 ==> 서버 (다른 페이지 요청) ==> list.jsp
                          ===============                              =========
                           class list_jsp extends HttpServlet

                          list.jsp => new list_jsp()  ==> 서버 (메모리 해제) ===> new list_jsp()
             JS => Ajax
                   = Vue (Ajax포함)
                   = React (Ajax포함) ==> axios

             JavaScript => this생략할 수 없다
             Java => this를 생략할 수 있기 때문에 생략하고 있다
             클래스에서 자신의 객체 => this , 상위 클래스 => super()
 */
class Recipe extends Component{
    // 데이터 받기 => 스프링 서버에서 받는다 (JSON) => Kotlin(모바일)
    constructor(props) {
        super(props);
        this.state={
            recipe_list:[],
            page:1,
            totalpage:0,
            startPage:1,
            endPage:0
        }

        // <a>를 클릭시 처리 => 이벤트
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
        //this.pages=this.pages.bind(this);
    }

    prev()
    {
        this.state.page=this.state.startPage>1?this.state.startPage-1:this.state.startPage
        this.springGetData()
    }
    next()
    {
        this.state.page=this.state.endPage<this.state.totalpage?this.state.endPage+1:this.state.endPage
        this.springGetData()
    }
    pages(page)
    {
        //this.setState({page:page})
        this.state.page=page;
        this.springGetData()
    }
    // 화면 출력과 동시에 데이터를 읽어 온다
    /*
        this.setState({}) => render() 재호출
     */
    springGetData()
    {
        axios.get("http://localhost:8080/web/recipe/rest_list.do",{
            params:{
                page:this.state.page
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({recipe_list:response.data})
            // setState() => 데이터 갱신 (수정) => 다시 HTML을 만든다 ==> render()
            this.setState({page:response.data[0].page})
            this.setState({totalpage:response.data[0].totalpage})
            this.setState({startPage:response.data[0].startPage})
            this.setState({endPage:response.data[0].endPage})
        })
    }
    componentDidMount() {
       this.springGetData()
    }

    render(){
        // for(RecipeVO vo: list)
        let html=this.state.recipe_list.map((vo)=>
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

        let row=[];
        if(this.state.startPage>1)
            row.push(<li><a href={"#"} onClick={this.prev}>&lt;</a></li>)
            // < 1 2 3 4...     > <Pagination active="page" ........
        for(let i=this.state.startPage;i<=this.state.endPage;i++)
        {
            if(i==this.state.page)
            {
                row.push(<li className={"active"}><a href={"#"} onClick={this.pages.bind(this,i)}>{i}</a></li> )
            }
            else
            {
                row.push(<li><a href={"#"} onClick={this.pages.bind(this,i)}>{i}</a></li> )
            }
        }

        if(this.state.endPage<this.state.totalpage)
            row.push(<li><a href={"#"} onClick={this.next}>&gt;</a></li>)

        return (
              <Fragment>
                <div className={"row"}>
                    {html}
                </div>
                <div className={"row"}>
                    <div className={"text-center"}>
                        <ul className={"pagination"}>
                            {row}
                        </ul>
                    </div>
                </div>
              </Fragment>
        )
    }
}

export default Recipe