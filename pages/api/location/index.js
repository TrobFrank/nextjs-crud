import connectMongo from "../../../utils/db/connectMongo";
import Location from "../../../models/location";

export default async function handler(req, res){
    try {
        await connectMongo();
        let locationData = await Location.find({});
        res.status(200).json({locationData});
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}