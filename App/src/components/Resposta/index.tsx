import { TouchableOpacityProps } from "react-native";
import { IRespostas } from "../../screens/Home";
import { Button, Container, Title } from "./styles";

type Props = TouchableOpacityProps & IRespostas

export function Resposta({ idResposta, resposta, ...rest }: Props) {
    return (
        <Container>
            <Button activeOpacity={0.7} {...rest}>
                <Title key={idResposta}>{resposta}</Title>
            </Button>
        </Container >
    )
}