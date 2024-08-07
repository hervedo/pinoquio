import { TouchableOpacityProps } from "react-native";
import { Button, Container, Title } from "./styles";

type IRespostas = {
    idResposta: string
    resposta: string
}

type Props = TouchableOpacityProps & IRespostas

export function Resposta({ idResposta, resposta, ...rest }: Props) {
    return (
        <Container>
            <Button key={'B'+idResposta} activeOpacity={0.7} {...rest}>
                <Title key={'T'+idResposta}>{resposta}</Title>
            </Button>
        </Container >
    )
}