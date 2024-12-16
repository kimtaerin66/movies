import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import useGeoLocation from "../utils/useGeolocation.jsx";
import requestForMapKeword from "../config/AxiosForMap.js";

function Map(){
    const mapContainerRef = useRef(null); // 지도 div를 참조하기 위한 ref
    const location = useGeoLocation();
    //영화관 찾기
    const [marker, setMarker] = useState([]);
    const findNearCinema = async () => {
        try {
            const res = await requestForMapKeword.get(``, {
                params: {
                    query: "영화관",
                    x: location.coordinates.lng,//lng
                    y: location.coordinates.lat
                }
            });
           const list = res.data.documents.map((el) => (
               {"title": el.place_name, "latlng": new kakao.maps.LatLng(el.y, el.x)}));
            setMarker(list)
        } catch (e) {
            console.error(e)
        }
    }


    useLayoutEffect(() => {
        if (location.loaded) {
            findNearCinema()
        }
    }, [location])


    useEffect(() => {
        // 카카오 맵 API가 로드된 후에 실행되는 코드
        if (window.kakao) {
            // 지도를 표시할 div
            const mapContainer = mapContainerRef.current;

            // 지도의 중심좌표와 확대 레벨 설정
            const mapOption = {
                center: new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng), // 중심좌표
                level: 5, // 확대 레벨
            };

            // 지도 생성
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            // 마커 이미지 주소
            const imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

            // 마커 생성
            marker.forEach((position) => {
                const imageSize = new window.kakao.maps.Size(24, 35); // 마커 이미지 크기
                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

                // 마커 객체 생성
                new window.kakao.maps.Marker({
                    map: map,
                    position: position.latlng, // 마커 위치
                    title: position.title, // 마커 타이틀
                    image: markerImage, // 마커 이미지
                });
            });
        }
    }, [marker]);

    return (
        <div
            ref={mapContainerRef}
            style={{ width: '1200px', height: '600px', margin: '0 auto' }}
        />
    );

}

export default Map;