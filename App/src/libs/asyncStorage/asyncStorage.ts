import AsyncStorage from "@react-native-async-storage/async-storage"


const ASYNC_STORAGE_KEY = "@pinoquio:last_sync"

export async function saveLastAsyncTimestamp(){
    const timestamp = new Date().getTime()
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, timestamp.toString())

    return timestamp
}

export async function getLastAsyncTimestamp(){
    const response = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)

    return Number(response)
}