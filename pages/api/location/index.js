import connectMongo from "../../../utils/db/connectMongo";
import Location from "../../../models/location";

export async function apiGetLocations(){
    try {
        await connectMongo();
        let locationData = await Location.find({});
        return locationData;
    } catch (error) {
        console.log(error);
        return
    }
}

export async function apiGetLocationByID(id){
    try {
        await connectMongo();
        let locationData = await Location.findOne({_id: id});
        return locationData;
    } catch (error) {
        console.log(error);
        return
    }
}

export default async function handler(req, res){
    try {
        let locationData;
        if (req.body._id){
            locationData = await apiGetLocationByID(req.body._id);
        } else {
            locationData = await apiGetLocations();
        }
        res.status(200).json(locationData);
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}