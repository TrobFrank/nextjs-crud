import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import Header from '../components/Header';


import connectMongo from '../utils/db/connectMongo';
import Location from '../models/Location';

export default function Admin(props){

    const defaultFormState = {
        title:'',
        description:'',
        image:'',
        latitude:'',
        longitude:''
    }

    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState(defaultFormState);
    const [locationData, setLocationData] = useState(props.locations);

    function handleFormInputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    useEffect(() => {
        getLocations();
    },[])

    function getLocations() {
        setLoading(true)
        fetch('/api/location')
          .then((res) => res.json())
          .then((data) => {
            setLocationData(data.locationData)
            setLoading(false)
          })
    }

    async function createLocation(e){
        e.preventDefault();
        let options = {
            method: 'POST',
            body: JSON.stringify(formData)
        }

        let res = await fetch('/api/location/create', options)
        .then(res => {
            res.json();
            setFormData(defaultFormState);
            setLocationData(getLocations());
        })
        .catch(err => {console.log(err)})
        return res;
    }

    if (isLoading) return <p>Loading</p>;

    return (
        <div className={``}>
            <Header />
            <form id="formName">
                <input type="text" required name="title" placeholder="Title" value={formData.title} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="text" name="description" placeholder="Description" value={formData.description}  onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="number" required name="latitude" placeholder="Latitude" value={formData.latitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="number" required name="longitude" placeholder="Longitude" value={formData.longitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <Button variant="contained" onClick={(e)=>{createLocation(e)}}>Add Location</Button>
            </form>
            <main className={``}>
                <div className={``}>
                { locationData.length > 0 && !isLoading ?
                locationData.map(loc => {
                    return <div key={loc._id} className={``}>
                        {loc.image? <Image src={loc.image} alt={loc.title} width='160' height='90'/> : null}
                        <h2>{loc.title}</h2>
                        <p>{loc.description}</p>
                    </div>
                })
                : null
                }
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps = async () => {
    try {
        await connectMongo();
        let locations = await Location.find();
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