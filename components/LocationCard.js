
import Image from 'next/image';

export default function LocationCard(props) {
    const {
        latitude,
        longitude,
        title,
        image,
        description
    } = props.location;

    return (
        <div className={`location-card`}>
            <h1>{title}</h1>
            <Image src={image} alt={title} width="150" height="150" />
            <p>{description}</p>
            <p>{latitude}</p>
            <p>{longitude}</p>
        </div>
    )
}