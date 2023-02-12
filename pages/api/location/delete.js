import connectMongo from "../../../utils/db/connectMongo";
import Location from "../../../models/location";

export default async function handler(req, res){
    try {
        await connectMongo();
        const deleteLocation = await Location.deleteOne({_id: req.body._id});
        console.log('api/location/delete: ', deleteLocation);
        res.status(200).json(deleteLocation);
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}