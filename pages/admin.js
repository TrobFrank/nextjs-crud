import { useState } from 'react';
import axios from 'axios';
import { apiGetLocations } from './api/location';
import Image from 'next/image';
import { Button } from '@mui/material';
import Header from '../components/Header';
import AdminLocationCard from '../components/AdminLocationCard';

export default function Admin(props){

    const defaultNewLoc = {
        title:'',
        description:'',
        image:'',
        type:'',
        latitude:'',
        longitude:''
    }

    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(defaultNewLoc);
    const [locationData, setLocationData] = useState(props.locations);

    function handleFormInputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function getLocations(id) {
        setLoading(true)
        let reqOptions = {};
        if (id !== null) {reqOptions = {_id: id};}
        let locationRes = await axios.post('/api/location', reqOptions)
            .then(res => {
                console.log('getLocations res.data: ', res.data);
                setLoading(false)
                return res.data
            }).catch(e =>  {
                console.log(e);
            })
        return locationRes
    }

    async function createLocation(e){
        e.preventDefault();
        let res = await axios.post('/api/location/create', formData)
            .then(res => {
                console.log('createLocation res.data: ', res.data)
                setFormData(defaultNewLoc);
                return res
            })
            .catch(err => {
                console.log(err)
            })
        let newLocationList = await getLocations();
        setLocationData(newLocationList);
        return res;
    }

    async function deleteLocationByID(title, id){
        if (!id) return;
        if (confirm(`delete ${title?title:id}?`) === true){
            let res = await axios.post('/api/location/delete', {_id: id})
                .then(res => {
                    console.log('deleteLocation res.data: ', res.data)
                    return res
                })
                .catch(err => {
                    console.log(err)
                })
        
            let newLocationList = await getLocations();
            setLocationData(newLocationList);

            return res;
        }
        return
    }

    async function saveEditedLocationByID(id, data){
        if (!id) return;
        let res = await axios.put('/api/location/update', {
            _id: id,
            title: data.title,
            description: data.description,
            image: data.image,
            type: data.type,
            latitude: data.latitude,
            longitude: data.longitude,
        }).then(res => {
            console.log(res);
        })

        let newLocation = await getLocations(id);
        console.log('saveEditedLocationByID newLocation: ', newLocation);
        let newLocationList = locationData.map(loc =>{
            if (loc._id === id){loc = newLocation;}
            return loc;
        })
        setLocationData(newLocationList);        
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
                <input type="text" name="type" placeholder="recycling or trash" value={formData.type} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="number" required name="latitude" placeholder="Latitude" value={formData.latitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <input type="number" required name="longitude" placeholder="Longitude" value={formData.longitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
                <Button variant="contained" onClick={(e)=>{createLocation(e)}}>Add Location</Button>
            </form>
            <main className={``}>
                <div className={``}>
                { locationData.length > 0 && !isLoading ?
                locationData.map(loc => {
                    return <AdminLocationCard 
                    key={loc._id}
                    {...loc} 
                    deleteLoc={deleteLocationByID}
                    saveLoc={saveEditedLocationByID}
                    />
                })
                : null
                }
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps = async () => {
    let res = await apiGetLocations();
    return {
        props: {
            locations: JSON.parse(JSON.stringify(res))
        }
    }  
  }
