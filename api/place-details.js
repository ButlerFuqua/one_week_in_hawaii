require('dotenv').config() // for env variables

const axios = require('axios')

const { GOOGLE_MAPS_API_KEY } = process.env

export default async function handler(req, res) {

    const { query: { id } } = req

    let getPlaceResponse
    try {
        getPlaceResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GOOGLE_MAPS_API_KEY}`
        );
    } catch (error) {
        getPlaceResponse = {
            data: (error = error.message || JSON.stringify(error)),
        };
        console.error(error)
    }

    if (getPlaceResponse.error)
        return res.status(500).json({ success: false, message: getPlaceResponse.error })



    const { result } = getPlaceResponse.data


    res.status(200).json({ success: true, message: `Returning places result`, result })
}