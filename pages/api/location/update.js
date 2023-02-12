import connectMongo from "../../../utils/db/connectMongo";
import Location from "../../../models/location";

export default async function handler(req, res){
    try {
        await connectMongo();
        const updateLocation = await Location.findByIdAndUpdate(
            {_id: req.body._id}, 
            {...req.body}, 
            {new: true}
        );
        res.status(200).json(updateLocation);
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}