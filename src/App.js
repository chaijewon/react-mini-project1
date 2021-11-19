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
import Category from "./component/food/Category";
import CategoryFoodList from "./component/food/CategoryFoodList";
import Detail from "./component/food/Detail";
import Nature from "./component/seoul/Nature";
import Hotel from "./component/seoul/Hotel";
import Location1 from "./component/seoul/Location1";
import News from "./component/food/News";
import FoodHouseFind from "./component/food/FoodHouseFind";

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
                          <Route path={"/food/category"} component={Category}/>
                          <Route path={"/food/category_food_list/:cno"} component={CategoryFoodList}/>
                          {
                              /*
                                   ~food/category_food_list/1 ==> PathValiable
                               */
                          }
                          <Route path={"/food/detail/:no"} component={Detail}/>
                          <Route path={"/seoul/location"} component={Location1}/>
                          <Route path={"/seoul/nature"} component={Nature}/>
                          <Route path={"/seoul/hotel"} component={Hotel}/>
                          <Route path={"/food/find"} component={FoodHouseFind}/>
                          <Route path={"/food/news"} component={News}/>
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
