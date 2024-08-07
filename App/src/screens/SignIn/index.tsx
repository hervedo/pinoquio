import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Realm, useApp } from '@realm/react';
import { Container, Title, Slogan } from './styles';
import { Button } from '../../components/Button';
import { API_KEY} from '@env'

export function SignIn() {
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const app = useApp();

  function handleSignIn(){
    setIsAuthenticating(true);

    const credentials = Realm.Credentials.apiKey(API_KEY)

    console.log('SignIn')

    try {
       const user = app.logIn(credentials) 
    } catch(error) {
          console.log(error);
          Alert.alert('Entrar', 'Não foi possível conectar-se.')
          setIsAuthenticating(false);
    }
    
}    

  return (
    <Container >
      <Title>Pinoquio</Title>

      <Slogan>
        Gestão de pesquisas
      </Slogan>

      <Button 
        title='Entrar' 
        onPress={handleSignIn} 
        isLoading={isAuthenticating} 
      />
    </Container>
  )

}