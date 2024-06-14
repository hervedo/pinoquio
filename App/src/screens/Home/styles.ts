import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    backgroundColor: ${({ theme }) => theme.COLORS.GRAY_100};
    alignItems: 'center';
    justifyContent: 'center';
    margin-top: 48px;

`


export const Text = styled.Text`
    flex: 1;
    color: ${({ theme }) => theme.COLORS.GRAY_400};            
    text-align: center;
    margin-bottom: 0px;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_400};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    text-align: center;
    margin: 24px;


`
