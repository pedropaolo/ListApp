import { StyleSheet, Text, View , TextInput , TouchableOpacity } from 'react-native';
import { styles } from './styles';


export function Remember(props) {

    function handleParticipantDelete() {
       props.onRemove(props.content)
    }

    return(
        <View style={styles.wrap}>
            <View style={styles.rememberView}>
                <Text  style={styles.remember}>{props.content}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleParticipantDelete}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

        </View>
          )
}