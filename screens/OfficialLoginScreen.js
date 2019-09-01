import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Platform, StatusBar, Text, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button, Item, Icon, Card, Header } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from "react-redux";
import * as firebase from "firebase";
import { onEmailChange, onPasswordChange, OfficialLogin, userProfile } from '../src/Actions';
import AnimatedLoader from 'react-native-animated-loader';
import { Ionicons } from "@expo/vector-icons";


class LoginScren extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-settings' : 'md-settings'}
        color={tintColor}
        size={25}
      />
    )
  }

  state = {
    isLoading: true,
    visibility: true,
    passIcon: 'md-eye-off'
  }

  componentWillMount() {

    //firebase.auth().signOut()

    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref(`users/admin/${user.uid}`)
            .once('value', snapshot => {
              if (snapshot.val()) {
                this.setState({ isLoading: false })
                this.props.userProfile("admin", snapshot.val().fname, snapshot.val().lname, snapshot.val().imageUrl, snapshot.val().email)
                this.props.navigation.navigate("Home")
                console.log('success')

              } else {
                firebase
                  .database()
                  .ref(`users/official/${user.uid}`)
                  .once('value', snapshot => {
                    if (snapshot.val()) {
                      this.setState({ isLoading: false })
                      this.props.userProfile("official", snapshot.val().fname, snapshot.val().lname, snapshot.val().imageUrl, snapshot.val().email)
                      this.props.navigation.navigate("Home")
                      console.log('success')
                    }
                    else {
                      this.setState({ isLoading: false })
                   }
                  })
              }
            }
            )



        }

        else {
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 1600)
          console.log('logged out')
        }
      })

    const { navigation } = this.props
    navigation.addListener("willFocus", () => {
      firebase
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            firebase
              .database()
              .ref(`users/${user.uid}`)
              .once('value', snapshot => {
                if (snapshot.val()) {
                  this.setState({ isLoading: false })
                  this.props.navigation.navigate("Home")
                  console.log('success')
                }
              }
              )
          }
        })
    })
  }

  renderNotch = () => {
    if (Platform.OS === "android") {
      return (
        <View style={styles.notch} />
      )
    }
  }

  viewPassword = () => {
    if (this.state.visibility)
      this.setState({
        visibility: false,
        passIcon: 'md-eye'
      })
    else
      this.setState({
        visibility: true,
        passIcon: 'md-eye-off'
      })
  }

  renderButton = () => {
    if (!this.props.loading) {
      return (
        <Button
          rounded
          success
          onPress={() => { this.loginpress() }}
          style={{ margin: 10, marginTop: 10, padding: 5, width: '40%', alignSelf: 'center', marginBottom: 20 }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 16, paddingLeft: 35, fontWeight: 'bold' }}>LOGIN</Text>
        </Button>
      )
    }
    else {
      return (
        <AnimatedLoader
          visible
          source={require("../assets/192-swipe-right-indicator.json")}
          animationStyle={{ width: 100, height: 100, marginTop: 100 }}
          speed={1}
        />
      )
    }
  }

  loginpress = () => {

    const { email, password } = this.props;
    this.props.OfficialLogin({ email, password }, this.props);
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: '#000000', flexDirection: 'column' }}
        >
          <AnimatedLoader
            visible={this.state.isLoading}
            source={require("../assets/196-material-wave-loading.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: '#f9e090', marginBottom: 0, flex: 1 }}>
        {this.renderNotch()}

        <TouchableWithoutFeedback style={styles.container}
          onPress={Keyboard.dismiss}>
          <View style={styles.login}>
              <Image
                source={require("../assets/logo.png")}
                style={{
                  height: '34%',
                  width: "34%",
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: '14%',
                  zIndex: 50,
                  backgroundColor: "#f9e090",
                }}
              />
              <Card
                style={styles.Card}
              >
                <TextInput
                  placeholder="   email id"
                  style={styles.textinput}
                  value={this.props.email}
                  onChangeText={(text) => { this.props.onEmailChange(text) }}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                <View>

                  <TextInput
                    placeholder="  Password"
                    style={styles.textinput}
                    value={this.props.password}
                    onChangeText={(text) => this.props.onPasswordChange(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={this.state.visibility}
                  />
                  <Ionicons name={this.state.passIcon} size={30} style={{ color: 'black', position: 'absolute', marginLeft: '78%', marginTop: 15, backgroundColor: "#e15249" }} onPress={() => this.viewPassword()} />
                </View>

                <Text style={{ fontSize: 16, color: "yellow", marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }}> {this.props.error} </Text>
                {this.renderButton()}
              </Card>
            </View>
        </TouchableWithoutFeedback >
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  notch: {
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight
  },
  login: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  textinput: {
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    padding: 6,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    alignContent: 'center',
    shadowColor: 'black',
    elevation: 7,
    shadowOpacity: 0.8,
    fontSize: 17
  },
  lottie: {
    width: 100,
    height: 100
  },
  Card: {
    width: '90%',
    height: 'auto',
    borderRadius: 18,
    elevation: 8,
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 0,
    zIndex: 1,
    paddingTop: '8%',
    shadowColor: 'black',
    shadowOpacity: 1,
    backgroundColor: '#e15249'
  }
})


const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user
  }
}


export default connect(mapStateToProps, { onEmailChange, onPasswordChange, OfficialLogin, userProfile })(LoginScren);