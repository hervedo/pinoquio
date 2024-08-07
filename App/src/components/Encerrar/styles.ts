import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  margin: 20px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: #9B111E; 
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;



export const Loading = styled.ActivityIndicator
    .attrs(({ theme }) => ({
        color: theme.COLORS.WHITE
    }))
    `

`