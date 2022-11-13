import { useState } from "react";
import Image from 'next/image';
import { MarkerF, InfoWindowF} from '@react-google-maps/api';

export default function LocationElement(props){
    /* reference models/Location.js for full props available */ 
    const {
        latitude,
        longitude,
        title,
        image,
        description
    } = props.location;

    const pos = {lat: latitude, lng: longitude};

    const [open, setOpen] = useState(false);
    
    function handleOpenClose(){
        setOpen(!open)
    }

    return <div>
        <MarkerF position={pos} onClick={() => handleOpenClose()}/>
        {open && 
         <InfoWindowF position={pos} onCloseClick={() => handleOpenClose()}>
            <>
            <h1>{title}</h1>
            <Image src={image} alt={title} width="150" height="150" />
            <p>{description}</p>
            <p>{latitude}</p>
            <p>{longitude}</p>
            </>
        </InfoWindowF>       
        }
        </div>
}