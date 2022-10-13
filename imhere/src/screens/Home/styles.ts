import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A202C',
      paddingTop: 80,
      padding: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#EDF2F7',

    },

    subtitle: {
        fontSize: 16,
        color: 'gray'

    },

    wrap: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 40,

    },

    input: {
      flex: 1,
      backgroundColor: '#2D3748',
      height: 56,
      borderRadius: 5,
      color: '#f7fcf7',
      padding: 16,
      fontSize: 16,
      marginRight: 12

    },

    button: {
      width: 56,
      height: 56,
      backgroundColor: '#31CF67',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,

    },

    buttonText: {

      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold'
    }

  
  });
  