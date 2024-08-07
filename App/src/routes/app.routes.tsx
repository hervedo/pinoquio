import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Pesquisa } from "../screens/Pesquisa";


const {Navigator, Screen} = createNativeStackNavigator()


export function AppRoutes() {
    return (

<Navigator screenOptions={{headerShown: false}}>

            <Screen name="home" component={Home} />

            <Screen name="pesquisa" component={Pesquisa} />        

        </Navigator>
    )
}

