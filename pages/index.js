import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import connectMongo from "../utils/connectMongo";
import Location from "../models/location";
import { useEffect, useState } from 'react';

export default function Home(props) {
  let {locations} = props;

  const defaultFormState = {
    title:'',
    description:'',
    image:'',
    latitude:'',
    longitude:''
  }

  const [formData, setFormData] = useState(defaultFormState);

  useEffect(()=>{
    console.log(formData);
  },[formData]);

  function handleFormInputChange(e){
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  async function addLocation(e){
    e.preventDefault();

    let options = {
      method: 'POST',
      body: JSON.stringify(formData)
    }

    let res = await fetch('/api/location/add', options)
    .then(res =>
      res.json()
    ).catch(err => {
      console.log(err)
    })
    return res;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={addLocation} id="formName">
        <input type="text" name="title" defaultValue={formData.title} onChange={(e)=>handleFormInputChange(e)} /><br/>
        <input type="text" name="description" defaultValue={formData.description}  onChange={(e)=>handleFormInputChange(e)} /><br/>
        <input type="text" name="image" defaultValue={formData.image} onChange={(e)=>handleFormInputChange(e)} /><br/>
        <input type="number" name="latitude" defaultValue={formData.latitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
        <input type="number" name="longitude" defaultValue={formData.longitude} onChange={(e)=>handleFormInputChange(e)} /><br/>
        <input type="submit" value="Submit Form"/>
      </form>
      <main className={styles.main}>
        <div className={styles.grid}>
        {
          locations.map(loc => {
            return <div key={loc._id} className={styles.card}>
              {loc.image? <Image src={loc.image} alt={loc.title} width='160' height='90'/> : null}
              <h2>{loc.title}</h2>
              <p>{loc.description}</p>
            </div>
          })
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