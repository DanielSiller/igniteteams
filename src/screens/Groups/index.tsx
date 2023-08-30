import { useState, useCallback } from 'react'
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [ groups, setGroups ] = useState<string[]>([]);
  const { navigate } = useNavigation()
  
  function handleNewGroup() {
    navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []))

  return (
    <Container>
      <Header/>
      <Highlight 
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      {isLoading 
      ? <Loading/>
      : <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={!groups.length && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Que tal cadastrar a primeira turma?"
            />
          )}
        />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
