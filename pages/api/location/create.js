import connectMongo from "../../../utils/db/connectMongo";
import Location from "../../../models/location";

export default async function handler(req, res){
    try {
        await connectMongo();
        const createLocation = await Location.create(req.body);
        console.log('api/location/create: ', createLocation);
        res.status(200).json(createLocation);
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}