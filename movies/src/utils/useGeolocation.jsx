import {useEffect, useState} from 'react';

const useGeoLocation = () => {
    //현위치
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: 0, lng: 0,}
    });

    // 성공시
    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }

    // 실패시
    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        })
    }
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location;
}

export default useGeoLocation