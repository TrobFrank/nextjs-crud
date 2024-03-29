import { useMemo, useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Header from '../components/Header';
import SideBar from "../components/Sidebar";
import LocationElement  from '../components/LocationElement';

export default function Map(props){
    const center        = useMemo(() => ({lat: 39.10146959718684, lng: -84.51280154753815}));
    const { isLoaded }  = useLoadScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY })
    if (!isLoaded) return <div>Loading...</div>;
    return <MapElement locations={props.locations} center={center} />
}

function MapElement({locations, center}){

    const [mapEl, setMapEl] = useState(null);
    const [locationsInSidebar, setLocationsInSidebar] = useState([]);

    function calculateMarkers() {
        let ne = mapEl.getBounds().getNorthEast();
        let sw = mapEl.getBounds().getSouthWest();

        let markersInView = locations.filter(loc => {
            if (
                loc.latitude    < ne.lat() && 
                loc.longitude   < ne.lng() &&
                loc.latitude    > sw.lat() &&
                loc.longitude   > sw.lng() 
            ) {
                return loc
            }
        })
        console.log('locationsInView: ', markersInView);
        setLocationsInSidebar(markersInView)  

    }

    const handleOnLoad = (map) => {
        setMapEl(map);
    }

    const handleOnIdle = () => {
        if (mapEl !== null){
            console.log('on idle');
            calculateMarkers();
        }
    }

    return (
        <div className="page_map">
            <Header />
            <div className="flex-row map-wrapper">
                <GoogleMap 
                    zoom={10} 
                    center={center} 
                    mapContainerClassName="map-container"
                    onLoad={(map) => handleOnLoad(map)}
                    onIdle={() => handleOnIdle()}
                >
                    { locations.length > 0 && 
                        locations.map(loc=>{
                            return <LocationElement location={loc} key={loc._id}/>
                        })
                    }
                </GoogleMap>
                <SideBar locations={locationsInSidebar}/>
            </div>
        </div>
    )
}

export const getServerSideProps = async (req) => {
    const { URL } = process.env;
    let res = await axios.get(`${URL}/api/location`)
        .then((res) => {
            console.log('getServerSideProps');
            return {
                props: {
                    locations: JSON.parse(JSON.stringify(res.data))
                }
            }          
        })
    return res;

  }