import React,{Component,Fragment} from "react";

class Footer extends Component{
    render() {
        return (
                <footer className="container-fluid text-center">
                    <a href="#myPage" title="To Top">
                        <span className="glyphicon glyphicon-chevron-up"></span>
                    </a>
                    <p>WebApp Made By <a href="http://cafe.naver.com/moyaid"
                                                  title="Visit w3schools">강북쌍용교육센터 G강의장</a></p>
                </footer>

        )
    }
}

export default Footer