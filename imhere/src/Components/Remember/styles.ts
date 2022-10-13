import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

wrap: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,

  },

  input: {
    flex: 1,    
    height: 56,
    backgroundColor: '#2D3748',
    borderRadius: 5,
    color: '#f7fcf7',
    padding: 16,
    fontSize: 16,
    marginRight: 12,

  },

  button: {
    width: 56,
    height: 56,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,

  },

  buttonText: {

    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },

  remember: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#f7fcf7',
    
  },

  rememberView: {
    flex: 1,    
    height: 56,
    borderRadius: 3,
    backgroundColor: '#2D3748',
    padding: 16,
    fontSize: 16,
    marginRight: 10
  }

});