import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${apiUrl}/travels`;

export const PlaceService = {
    getAllPublicPlaces: async(travelId) => {
        const response = await axios.get(`${baseUrl}/${travelId}/places/public-places`)
        return response.data

    }
}

export default PlaceService
