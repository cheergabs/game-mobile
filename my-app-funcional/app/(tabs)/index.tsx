import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function HomeScreen() {
  const [secretNumber, setSecretNumber] = useState(null);
  const [userNumber, setUserNumber] = useState('');
  const [tries, setTries] = useState(1);
  const [message, setMessage] = useState({
    title: 'Secret number game',
    text: 'Choose a number from 1 to 1000',
  });
  const [isVerifyDisabled, setVerifyDisabled] = useState(false);
  const [isRestartDisabled, setRestartDisabled] = useState(true);

  // Inicializa um novo jogo
  useEffect(() => {
    setSecretNumber(randomNumber());
  }, []);

  // Função para gerar um número aleatório
  function randomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Função para atualizar os campos de mensagem
  function updateMessage(title, text) {
    setMessage({ title, text });
  }

  // Função para verificar o número do usuário
  function verifyNumber() {
    const userGuess = parseInt(userNumber, 10);
    if (isNaN(userGuess)) {
      updateMessage('Invalid Input', 'Please enter a valid number.');
      return;
    }

    if (userGuess === secretNumber) {
      setVerifyDisabled(true);
      setRestartDisabled(false);
      updateMessage(
        'CONGRATULATIONS!',
        `You found the secret number with ${tries} ${tries > 1 ? 'tries' : 'try'}.`
      );
    } else {
      updateMessage(
        'Almost there...',
        `The secret number is ${
          userGuess > secretNumber ? 'smaller' : 'bigger'
        } than ${userGuess}`
      );
      setTries(tries + 1);
    }
    setUserNumber('');
  }

  // Função para iniciar um novo jogo
  function newGame() {
    setSecretNumber(randomNumber());
    setUserNumber('');
    setTries(1);
    setVerifyDisabled(false);
    setRestartDisabled(true);
    updateMessage('Secret number game', 'Choose a number from 1 to 1000');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.containerBody}>
          <Text style={styles.text}>{message.title}</Text>
          <Text style={styles.textInfo}>{message.text}</Text>

          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              value={userNumber}
              onChangeText={setUserNumber}
              keyboardType="numeric"
              placeholder="Enter a number"
            />
          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity
              onPress={verifyNumber}
              disabled={isVerifyDisabled}
            >
              <View style={styles.btn1}>
                <Text style={styles.btnText}>Verify</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={newGame}
              disabled={isRestartDisabled}
            >
              <View style={styles.btn2}>
                <Text style={styles.btnText}>New Game</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBody: {
    width: 350,
    height: 600,
    backgroundColor: '#4b4b4b',
    borderRadius: 15,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 32,
    marginTop: 40,
  },
  textInfo: {
    color: '#fff',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
  },
  viewInput: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewBtn: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 100,
  },
  btn1: {
    width: 100,
    backgroundColor: '#59b55b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btn2: {
    width: 100,
    backgroundColor: '#9a9a9a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
  },
});
