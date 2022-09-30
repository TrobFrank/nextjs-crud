import connectMongo from "../../../utils/connectMongo";
import Location from "../../../models/location";

async function addLocation(req, res){
    try {
        await connectMongo();
        console.log(JSON.parse(req.body));
        const createLocation = await Location.create(JSON.parse(req.body));
        res.status(200).json({createLocation});
    } catch (error) {
        console.log(error);
        res.status(404).json({error})
    }
}

export default addLocation