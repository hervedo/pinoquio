import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    
    alignItems: 'center';
    justifyContent: 'center';
    margin-top: 48px;
`

export const Rodape = styled.View`
    height:30%;
  
    alignItems: 'center';
    justifyContent: 'center';
    margin-top:200px;
    
`


export const Message = styled.Text`
    flex: 1;
    color: ${({ theme }) => theme.COLORS.GRAY_400};    
       font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};        
    text-align: center;
    margin-top: 30px;
`

export const Text = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    text-align: center;
    margin-top: 200px;
`

export const Mostrar = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT});
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-top:50px;

`;
