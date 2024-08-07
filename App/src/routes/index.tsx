import { NavigationContainer } from "@react-navigation/native"
import { AppRoutes } from "./app.routes"


export function Routes() {
    console.log("Rotas")
    

    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}