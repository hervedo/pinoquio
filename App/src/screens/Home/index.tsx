import { Alert, FlatList } from "react-native";
import { Container, Message, Text } from "./styles";
import { useEffect, useState } from "react";
import { Resposta } from "../../components/Resposta";
import { LocationAccuracy, useForegroundPermissions, watchPositionAsync, LocationSubscription } from "expo-location"
import { getAddressLocation } from "../../utils/getAddressLocation";
import { Button } from "../../components/Button";
import { useQuery, useRealm } from "../../libs/realm";
import { Respostas } from "../../libs/realm/schemas/Respostas";
import { Questionario } from "../../libs/realm/schemas/Questionario";


export type IRespostas = {
    idResposta: string
    resposta: string
}

export type IPerguntas = {
    idPergunta: string
    pergunta: string
    respostas: IRespostas[]
}

type ICoordenadas = {
    altitude: number | null
    latitude: number
    longitude: number
}

export function Home() {

    const [questionarios, setQuestionarios] = useState<IPerguntas[]>([])
    const [coordenada, setCoordenada] = useState<ICoordenadas>({ altitude: 0, longitude: 0, latitude: 0 })
    const [registrando, setRegistrando] = useState(false)


    const realm = useRealm()

    const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()



    function atualiza() {
        const recupera = useQuery(Questionario).filtered("ativa = 'S'")

        console.log(recupera)


        setQuestionarios(
            [{ idPergunta: "P000001", pergunta: "Qual sua idade?", respostas: [{ idResposta: "R00001", resposta: "15-20" }, { idResposta: "R00002", resposta: "21-25" }] },
            { idPergunta: "P000002", pergunta: "Qual sua formação?", respostas: [{ idResposta: "R00003", resposta: "Superior incompleto" }, { idResposta: "R00004", resposta: "Superior Completo" }] },
            { idPergunta: "P000003", pergunta: "Em quem você votaria para Prefeito?", respostas: [{ idResposta: "R00005", resposta: "Sandro" }, { idResposta: "R00006", resposta: "Jorginho" }, { idResposta: "R00007", resposta: "Vilço Medeiros" }, { idResposta: "R00008", resposta: "Carelli" }, { idResposta: "R00009", resposta: "Rosinha" }] },
            { idPergunta: "P000004", pergunta: "Em quem você NÃO votaria para Prefeito?", respostas: [{ idResposta: "R00010", resposta: "Sandro" }, { idResposta: "R00011", resposta: "Jorginho" }, { idResposta: "R00012", resposta: "Vilço Medeiros" }, { idResposta: "R00013", resposta: "Carelli" }, { idResposta: "R00014", resposta: "Rosinha" }] },
            { idPergunta: "P000005", pergunta: "Qual deveria ser a prioridade do próximo prefeito?", respostas: [{ idResposta: "R00015", resposta: "Trânsito" }, { idResposta: "R00016", resposta: "Educação" }, { idResposta: "R00017", resposta: "Saúde" }, { idResposta: "R00018", resposta: "Cultura" }, { idResposta: "R00019", resposta: "Auxilio a Empresas" }] }
            ]
        )
    }

    function handleResposta(idPergunta: string, pergunta: string, idResposta: string, resposta: string) {
        console.log(idPergunta + " - " + pergunta)
        console.log(idResposta + " -" + resposta)
    }

    function handleSalvar() {
        try {
            setRegistrando(true)
            const respostas = ''


            realm.write(() => {
                realm.create('Respostas', Respostas.generate({
                    respostas,
                    latitude: coordenada.latitude,
                    longitude: coordenada.longitude
                }))
            })


        } catch (error) {
            Alert.alert('Erro', 'Não foi possível registrar a resposta')
            setRegistrando(false)

        }

        Alert.alert('Resposta', 'Resposta registrada com sucesso!')

    }


    useEffect(() => {
        atualiza();
    }, []);

    useEffect(() => {
        requestLocationForegroundPermission();
    }, [])

    useEffect(() => {

        if (!locationForegroundPermission?.granted) {
            return
        }

        let subscription: LocationSubscription

        watchPositionAsync({
            accuracy: LocationAccuracy.High,
            timeInterval: 1000
        }, (location) => {
            getAddressLocation(location.coords)
                .then((address) => {
                    console.log("Altitude:" + location.coords.altitude + "latitude:" + location.coords.latitude + "longitude:" + location.coords.longitude)
                    console.log(address)
                })
            setCoordenada({ altitude: location.coords.altitude, latitude: location.coords.latitude, longitude: location.coords.longitude })
        }).then((response) => subscription = response)

        return () => subscription.remove()

    }, [locationForegroundPermission])

    if (!locationForegroundPermission?.granted) {
        return (
            <Container>
                <Message>
                    Permissão da localização negada.
                    Favor conceder a permissão para localização nas configurações do seu dispositivo
                </Message>
            </Container>
        )
    }

    return (
        <Container>
            <Text>Pinóquio</Text>
            {questionarios.length > 0 && (
                questionarios.map((quest) =>
                    <>
                        <Text key={quest.idPergunta}>{quest.pergunta}</Text>
                        <FlatList
                            data={quest.respostas}
                            keyExtractor={item => item.idResposta}
                            renderItem={({ item }) => (
                                <Resposta idResposta={item.idResposta} resposta={item.resposta} onPress={() => handleResposta(quest.idPergunta, quest.pergunta, item.idResposta, item.resposta)} />
                            )
                            }
                            horizontal
                        />

                    </>
                )
            )
            }
            <Button title="Registrar Resposta" onPress={handleSalvar} isLoading={registrando} />
        </Container >

    )
}