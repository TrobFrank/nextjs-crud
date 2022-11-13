import LocationCard from "./LocationCard";

export default function SideBar({locations}){
    if (locations.length > 0) {
        const locationsHTML = locations.map((loc, i ) => {
            return <LocationCard location={loc} key={i} />
        });
        return (
            <div className={`side-bar`}>
                {locationsHTML}
            </div>
        )
    } else {
        return (<div>No locations in view</div>)
    }
}