import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
/* global kakao */
function FindDetail(props)
{
    const [detailList,setDetailList]=useState({}) // this.state
    // componentDidMount
    useEffect(()=>{
        axios.get("http://localhost:8080/web/food/find_detail.do",{
            params:{
                no:props.match.params.no
            }
        }).then(res=>{
            console.log(res.data)
            setDetailList(res.data) // render() => return을 변경 (HTML) => setState()
            // detailList=res.data
        })
    },{})
    let temp=String(detailList.poster);
    const img=temp.split("^");
    let html=img.map((poster)=>
        <td className={"text-center"}>
            <img src={poster} style={{"width":"200px","height":"150px"}}/>
        </td>
    )

    let temp1=String(detailList.menu)
    const menu=temp1.split("원")
    let html1=''
    if(temp1!=="no")
    {
        html1=menu.map((m)=>
            <li>{m}</li>
        )
    }
    // render
    /*
         let data={name:"",tel:"",time:""} => JS(객체:Object)
         data.name
         data.tel
         data.time
     */
    useEffect(()=>{
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=676eb5fa2637b234997b24dd7566e9ba&libraries=services";
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {
                var mapContainer = document.getElementById('map'),
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667),
                        level: 3
                    };
                var map = new kakao.maps.Map(mapContainer, mapOption);
                var geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(detailList.address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style={{"width":"150px","textAlign":"center","padding":"6px 0"}}>'+detailList.name+'</div>'
                        });
                        infowindow.open(map, marker);
                        map.setCenter(coords);
                    }
                });
            });
        };
    })
    return (
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        {html}
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"row"}>
                <div className={"col-sm-7"}>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td colSpan={"2"}>
                                <h3>
                                    {detailList.name}
                                    <span style={{"color":"orange"}}>{detailList.score}</span>
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>주소</td>
                            <td width={"85%"}>{detailList.address}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>전화</td>
                            <td width={"85%"}>{detailList.tel}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>음식종류</td>
                            <td width={"85%"}>{detailList.type}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>주차</td>
                            <td width={"85%"}>{detailList.parking}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>영업시간</td>
                            <td width={"85%"}>{detailList.time}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>가격대</td>
                            <td width={"85%"}>{detailList.price}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>메뉴</td>
                            <td width={"85%"}>
                                <ul style={{"listStyle":"none"}}>
                                    {html1}
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={"col-sm-5"}>
                    <div id="map" style={{"width": "100%", "height": "350px"}}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default FindDetail