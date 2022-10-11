
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is my fockin title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
    </View>
  );
}