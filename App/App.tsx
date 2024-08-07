import 'react-native-get-random-values'
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "expo-status-bar";
import { RealmProvider, syncConfig } from "./src/libs/realm";
import { AppProvider, useApp, Realm, UserProvider } from "@realm/react";
import { REALM_APP_ID, API_KEY} from '@env'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SignIn } from './src/screens/SignIn';
import { TopMessage } from './src/components/TopMessage';
import { WifiSlash } from 'phosphor-react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Routes } from './src/routes';


export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  const netInfo = useNetInfo()

    if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{flex: 1, backgroundColor: theme.COLORS.GRAY_800}} >
        {
         !netInfo.isConnected &&
          <TopMessage title='Off-line' icon={WifiSlash} />
        
        }

        <StatusBar style="light" backgroundColor="transparent" translucent />

        <UserProvider fallback={SignIn}> 
          <RealmProvider sync={syncConfig} fallback={Loading}>          
             <Routes />          
        </RealmProvider>
        </UserProvider>

        </SafeAreaProvider>
      </ThemeProvider>

    </AppProvider>

  );
}

