import {mapboxAPIKey} from '../config/config';


const getLocation = async (longitude, latitude) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAPIKey}`)
    return response.json()
}

export default {
    getLocation
}
