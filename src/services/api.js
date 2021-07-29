import {mapboxAPIKey} from '../config/config';


const getLocation = async (longitude, latitude) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAPIKey}`);
    return response.json();
};

const getCategories = async () => {
    const response = await fetch('https://lugyone-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json');
    return response.json();
};


const getCountries = async () => {
    const response = await fetch('https://lugyone-default-rtdb.asia-southeast1.firebasedatabase.app/countries.json');
    return response.json();
};

export default {
    getLocation,
    getCategories,
    getCountries,
};
