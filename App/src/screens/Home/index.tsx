import { useEffect, useState } from "react";
import { useUser } from "@realm/react";
//import { requestBackgroundPermissionsAsync } from "expo-location"
import { CloudArrowUp } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { saveLastAsyncTimestamp } from "../../libs/asyncStorage/asyncStorage";

import { TopMessage } from "../../components/TopMessage";
//import { startLocationTask } from "../../tasks/backgroudLocationTask";
import { useRealm } from "../../libs/realm";
import { Container, Text, Message, Mostrar, Rodape } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Realm } from "realm"
import { Encerrar } from "../../components/Encerrar";


export function Home() {

    const [registrando, setRegistrando] = useState(false)
    const [percentageToSync, setPercentageToSync] = useState<string>('')

    const {navigate} = useNavigation()

    const realm = useRealm()
    const user = useUser()


    
    //const backgroundPermissionas = await requestBackgroundPermissionsAsync()

    //setRegistrando(true)

    //if(!backgroundPermissionas.granted){
    //    setRegistrando(false)
    //    return Alert.alert("Localização","Não obtive os dados de localização, habilite nas Permissões (Permitir o tempo todo)")
    //}

    async function ProgressNotification(transferred: number, transferable: number) {
        const percProgress = (transferred/transferable)*100

        if(percProgress === 100){
            await saveLastAsyncTimestamp()
            setPercentageToSync('')

        }else{
            setPercentageToSync(`${percProgress.toFixed(0)} % sincronizado.`)
        }
    }

    function handlePesquisa(){
        navigate('pesquisa')
    }

 
     useEffect(() => {
         realm.subscriptions.update((mutableSubs, realm) => {
        
          const respostasQuery = realm.objects('Respostas')
          mutableSubs.add(respostasQuery, {name: 'respostas_atualiza'})
    
          const questionarioQuery = realm.objects('Questionario')
          mutableSubs.add(questionarioQuery, {name: 'questionario_atualiza'})
         })
     },[realm])
    
    
     useEffect(() => {
         const syncSession = realm.syncSession;
    
         console.log("Sincronizando")
    
         if(!syncSession){
             return
         }
    
         syncSession.addProgressNotification(
             Realm.ProgressDirection.Upload,
             Realm.ProgressMode.ReportIndefinitely,
             ProgressNotification
         )
    
         return () => syncSession.removeProgressNotification(ProgressNotification)
    
     },[])
    


   // useEffect(() => {
   //     startLocationTask().then(() =>
   //     console.log("startLocation"))
   // },[])

    return (
        
        <Container>
            { 
     percentageToSync!='' && <TopMessage title={percentageToSync} icon={CloudArrowUp} />
  }

            
      
             <Mostrar>Pinóquio</Mostrar>

             <Message>Gestão de Pesquisas</Message>

<Rodape>
            <Button title="Iniciar Nova Pesquisa"  onPress={handlePesquisa}  isLoading={registrando} />

            <Encerrar title=" Encerrar" />
            

</Rodape>
            

            
        </Container >

    )
}



