import { useNavigation } from '@react-navigation/native'

import logoImg from '@assets/logo.png'

import { Container, Logo, BackButton, BackIcon } from './styles';

export type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  const { navigate } = useNavigation()

  function handleGoBack() {
    navigate('groups')
  }

  return (
    <Container showBackButton={showBackButton}>
      {
        showBackButton && 
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg}/>
    </Container>
  );
}
