import styled from "styled-components/native"

export const Container = styled.View`
width: 100%;
margin: 32px 0;
padding: 22px;
border-radius 6px;

background-color: ${({ theme }) => theme.COLORS.GRAY_700};

flex-direction: row;
align-items: center;
`

export const Message = style.Text`
color: ${({ theme }) => theme.COLORS.GRAY_100};
font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const TextHighlight = style.Text`
flex: 1;
padding: 32px;
color: ${({ theme }) => theme.COLORS.GRAY_100};
font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`