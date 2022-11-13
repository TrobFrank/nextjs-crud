import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import SideBar from "../components/Sidebar";
import LocationElement  from '../components/LocationElement';

//server
import connectMongo from '../utils/db/connectMongo';
import Location from '../models/Location';

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
        <div className="flex-row">
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
    )
}

export const getServerSideProps = async () => {
    try {
        await connectMongo();
        let locations = await Location.find();
        console.log(locations);
        return {
            props: {
                locations: JSON.parse(JSON.stringify(locations))
            }
        }
    } catch (error){
        console.log(error);
        return {
            notFound: true
        }
    }
  }