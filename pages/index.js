import Admin from './admin';
import Header from '../components/Header';
import connectMongo from '../utils/db/connectMongo';
import Location from '../models/Location';

export default function Home(props) {
  return (
    <>
    <Header/>
    <Admin locations={props.locations}/>
    </>
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