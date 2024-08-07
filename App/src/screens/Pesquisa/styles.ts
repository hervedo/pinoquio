import styled from "styled-components/native"


export const Anterior = styled.View`
margin: 400px 0px;
padding: 22px;
border-radius: 6px;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
flex-direction: row-reverse;
align-items: center;
`


export const Container = styled.View`
    flex:1;
    height: 75%;
    backgroundColor: ${({ theme }) => theme.COLORS.GRAY_100};
    alignItems: 'center';
    justifyContent: 'center';
    margin-top: 48px;
`

export const RespostaView = styled.View`
    height:50px;
    flex-direction: row;
    alignItems: 'center';
    justifyContent: 'center';
    margin-top:10px;
    
`


export const Rodape = styled.View`
    height:25%;
   
    alignItems: 'center';
    justifyContent: 'center';
    margin-top:10px;
    
`

export const Text = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_400};  
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};           
    text-align: center;
    margin-bottom: 0px;
`

export const Pergunta = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_600};  
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD}; 
    margin-bottom: 0px;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    text-align: center;
    margin: 16px;
`

export const Mostrar = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT});
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
  margin-top:50px;

`;

