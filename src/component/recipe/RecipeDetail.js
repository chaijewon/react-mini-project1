import React,{Component,Fragment} from "react";
import axios from "axios";
class RecipeDetail extends Component{
    // 출력에 필요한 데이터를 받을 준비 (변수)
    constructor(props) {
        super(props);
        // 저장 공간
        this.state={
            recipe_detail:{},
            food:[],
            img:[]
        }
    }
    // 시작과 동시에 데이터를 받아 온다(서버) axios.get()
    // 다른 라이브러리 연결 (Jquery) ==> window.onload => $(function(){})
    // VueJS => mounted:function(){}
    componentDidMount() {
        axios.get("http://localhost:8080/web/recipe/rest_detail.do",{
            params:{
                no:this.props.match.params.no
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({recipe_detail:response.data})
            // => render를 호출 해서 HTML을 변경
        })

        axios.get("http://localhost:8080/web/recipe/rest_foodmake.do",{
            params:{
                no:this.props.match.params.no
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({food:response.data})
            // => render를 호출 해서 HTML을 변경
        })

        axios.get("http://localhost:8080/web/recipe/rest_foodimg.do",{
            params:{
                no:this.props.match.params.no
            }
        }).then(response=>{
            console.log(response.data)
            this.setState({img:response.data})
            // => render를 호출 해서 HTML을 변경
        })

    }
    // 읽기온 데이터 출력
    /*
        {this.state.recipe_detail.title} => ${vo.title}
     */
    render() {
        let foodmake= this.state.food.map((f, index) =>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td width={"90%"} style={{"fontSize": "15px", "fontWeight": "bold"}}>{f}</td>
                            <td width={"10%"}><img src={this.state.img[index]}
                                                   style={{"width": "120px", "height": "90px"}}/></td>
                        </tr>
                        </tbody>
                    </table>
            )

        return (
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td className={"text-center"}><img src={this.state.recipe_detail.poster} style={{"width":"960px","height":"350px"}}/></td>
                    </tr>
                    <tr>
                        <td className={"text-center"}><h3>{this.state.recipe_detail.title}</h3></td>
                    </tr>
                    <tr>
                        <td class={"text-center"} style={{"color":"gray"}}>{this.state.recipe_detail.content}</td>
                    </tr>
                    </tbody>
                </table>
                <table className={"table"}>
                 <tbody>
                    <tr>
                        <td className={"text-center"}><img src={"http://localhost:3000/info1.png"}/></td>
                        <td className={"text-center"}><img src={"http://localhost:3000/info2.png"}/></td>
                        <td className={"text-center"}><img src={"http://localhost:3000/info3.png"}/></td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>{this.state.recipe_detail.info1}</td>
                        <td className={"text-center"}>{this.state.recipe_detail.info2}</td>
                        <td className={"text-center"}>{this.state.recipe_detail.info3}</td>
                    </tr>
                 </tbody>
                </table>
                <table className={"table"}>
                    <caption><h3>레시피 만드는 방법</h3></caption>
                  <tbody>
                    <tr>
                        <td>
                            {foodmake}
                        </td>
                    </tr>
                  </tbody>
                </table>
                <table className={"table"}>
                  <tbody>
                    <tr>
                        <td className={"text-right"}><img src={this.state.recipe_detail.chef_poster}
                                 style={{"width":"75px","height":"75px"}}/></td>
                        <td className={"text-left"}>{this.state.recipe_detail.chef}<br/>
                            {this.state.recipe_detail.chef_profile}
                        </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        )
    }
}

export default RecipeDetail