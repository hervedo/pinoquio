import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    height: 50px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;    
    margin-left: 6px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Button = styled.TouchableOpacity`
min-height: 48px;
max-height: 48px;
width: 70px;
margin-left: 2px;
border-radius: 6px;
align-items: center;
justify-content: center;
background-color: '#085EAB';
`

export const Title = styled.Text`
color: ${({ theme }) => theme.COLORS.GRAY_800};
font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
text-align: center;
`

