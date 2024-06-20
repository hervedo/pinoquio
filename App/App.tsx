import 'react-native-get-random-values'
import { ThemeProvider } from "styled-components";
import { Home } from "./src/screens/Home";
import theme from "./src/theme";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "expo-status-bar";
import { RealmProvider } from "./src/libs/realm";
import { AppProvider } from "@realm/react";
import { REALM_APP_ID } from '@env'



export default function App() {


  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <RealmProvider>
          <Home />
        </RealmProvider>
      </ThemeProvider>

    </AppProvider>

  );
}

