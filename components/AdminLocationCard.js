import { useRef, useState } from 'react';
import Image from 'next/image';

export default function AdminLocationCard(props) {
    const {
        _id,
        title,
        description,
        image,
        type,
        latitude,
        longitude,
        deleteLoc,
        saveLoc
    } = props;

    const defaultValues = {
        title: title,
        description: description,
        image: image,
        type: type,
        latitude: latitude,
        longitude: longitude,
    }

    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState(defaultValues)
    
    function handleSave(id){
        saveLoc(id, editData);
        setIsEditing(false)
    }

    function handleEdit(e){
        console.log(e)
        setEditData({...editData, [e.target.name]: e.target.value});
    }

    function cancelEdit(){
        setIsEditing(false)
        setEditData(defaultValues);
    }

    return (
        <div className={`adminLocationCard`}>
            {image? <Image src={image} alt={title} width='160' height='90'/> : null}
            { !isEditing ? 
                <>
                    <h2>{title} {_id}</h2>
                    <p>{description}</p>
                    <p>{type}</p>
                    <p>{`latitude: ${latitude}`}</p>
                    <p>{`longitude: ${longitude}`}</p>
                    <button onClick={() => deleteLoc(title, _id)}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            : 
                <form id="formName">
                    <input type="text" required name={`title`} placeholder="Title" value={editData.title} onChange={(e)=>handleEdit(e)} /><br/>
                    <input type="text" name={`description`} placeholder="Description" value={editData.description}  onChange={(e)=>handleEdit(e)} /><br/>
                    <input type="text" name={`image`} placeholder="Image URL" value={editData.image} onChange={(e)=>handleEdit(e)} /><br/>
                    <input type="text" name={`type`} placeholder="recycling or trash" value={editData.type} onChange={(e)=>handleEdit(e)} /><br/>
                    <input type="number" required name={`latitude`} placeholder="Latitude" value={editData.latitude} onChange={(e)=>handleEdit(e)} /><br/>
                    <input type="number" required name={`longitude`} placeholder="Longitude" value={editData.longitude} onChange={(e)=>handleEdit(e)} /><br/>
                    <button onClick={()=>handleSave(_id)}>Save</button>
                    <button onClick={()=>cancelEdit()}>Cancel</button>
                </form>
            }
        </div>
    )
}