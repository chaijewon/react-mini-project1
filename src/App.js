import React,{Component,Fragment} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
/*
       Route : 화면 1개
       Switch : 화면 변경
       =================== 관리 Router
 */
import Header from "./component/main/Header";
import Footer from "./component/main/Footer";
import Home from "./component/main/Home";
import Recipe from "./component/recipe/Recipe";
import RecipeDetail from "./component/recipe/RecipeDetail";
// 조립기
class App extends Component{
  render() {
    return (
        <Router>
            <Fragment>
                <Header/>
                  <div style={{"height":"30px"}}></div>
                  <div className={"container"}>
                    <div className={"jumbotron"}>
                      <Switch>
                          {/*
                               path => RequestMapping
                               component => return "recipe/list" (jsp실행)
                          */}
                          <Route exact path={"/"} component={Home}/>
                          <Route path={"/recipe/list"} component={Recipe}/>
                          <Route path={"/recipe/detail/:no"} component={RecipeDetail}/>
                      </Switch>
                    </div>
                  </div>
                <Footer/>
            </Fragment>
        </Router>
    )
  }
}
export default App;
