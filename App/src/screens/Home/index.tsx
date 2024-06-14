import { FlatList } from "react-native";
import { Container, Text } from "./styles";
import { useEffect, useState } from "react";
import { Resposta } from "../../components/Resposta";


export type IRespostas = {
    idResposta: string
    resposta: string
}


export type IPerguntas = {
    idPergunta: string
    pergunta: string
    respostas: IRespostas[]
}

export function Home() {

    const [questionarios, setQuestionarios] = useState<IPerguntas[]>([])

    function atualiza() {
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

    useEffect(() => {
        atualiza();
    }, []);

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
        </Container >

    )
}