
import { StyleSheet, Text, View , TextInput , TouchableOpacity , ScrollView } from 'react-native';
import { Remember } from '../../Components/Remember';
import { styles } from './styles';
import { useState } from 'react'

export default function Home() {

  
  const [ remember , setRemember ] = useState('');
  const [ rememberList , setRememberList ] = useState<string[]>(['Meu primeiro lembrete'])


  function handleParticipantAdd(){
    
    setRememberList([...rememberList, remember ])

    // console.log(rememberList)
  }

  function handleParticipantDelete(rememberToDelete: string) {

    const commentsWithoutDeletedOne = rememberList.filter( item => {
      return item != rememberToDelete;
  })

    setRememberList(commentsWithoutDeletedOne)
    
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testando o git</Text>
      <Text style={styles.subtitle}>Coisas que eu não posso esquecer</Text>

      <View style={styles.wrap}>
      <TextInput
         style={styles.input}
         placeholder="Digite aqui..."
         placeholderTextColor="#1A202C"
         onChangeText={ newtext => setRemember( newtext ) }
         value = {remember}
      />

      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      </View>

      <ScrollView>
        {
          rememberList.map( item => (
            <Remember key ={item} content={item} onRemove={handleParticipantDelete}/>
          ))
        }

      </ScrollView>
    </View>
  );
}