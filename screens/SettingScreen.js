import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, ListView, } from 'react-native';
import { Button, Header, Title, Left, Right, Icon, Body } from 'native-base';
import { connect } from 'react-redux';
import { logoutUser } from '../src/Actions'
class SettingScreen extends Component {

  renderNotch = () => {
    if (Platform.OS === "android") {
      return (
        <View style={styles.notch} />
      )
    }
  }

  render() {
    return (
      <View>
        <View>
          {this.renderNotch()}
          <Header
            style={{ backgroundColor: '#000000' }}
          >
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title style={{ marginLeft: 'auto' }}>SETTINGS</Title>
            </Body>
            <Right>
              <Button transparent small>
              </Button>
            </Right>
          </Header>
        </View>
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
          <Button
            rounded
            light
            onPress={() => { this.props.logoutUser(this.props) }}>
            <Icon name='md-log-out' />
            <Text style={{ alignSelf: 'auto' }}>LOG-OUT   </Text>
          </Button>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({

  notch: {
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight
  }
})

export default connect(null, { logoutUser })(SettingScreen);