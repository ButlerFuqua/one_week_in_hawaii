require('dotenv').config() // for env variables

const axios = require('axios')

const { GOOGLE_MAPS_API_KEY } = process.env

export default async function handler(req, res) {

    const { query: { category } } = req
    console.log('category', category)

    let getPlacesResponse
    try {
        getPlacesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.438916,-157.999933&radius=78012${category ? `&keyword=${category}` : ``}&key=${GOOGLE_MAPS_API_KEY}`
        );
    } catch (error) {
        getPlacesResponse = {
            data: (error = error.message || JSON.stringify(error)),
        };
        console.error(error)
    }

    if (getPlacesResponse.error)
        return res.status(500).json({ success: false, message: getPlacesResponse.error })

    const { results } = getPlacesResponse.data


    res.status(200).json({ success: true, message: `Returning places results`, results })
}