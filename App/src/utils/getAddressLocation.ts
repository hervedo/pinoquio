import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location"

export async function getAddressLocation({ latitude, longitude }: LocationObjectCoords) {
    try {
        const addressResponse = await reverseGeocodeAsync({ latitude, longitude })

        return addressResponse[0]?.street + ", " + addressResponse[0]?.streetNumber + " - " + addressResponse[0]?.district
    } catch (error) {
        console.log(error)
    }
}