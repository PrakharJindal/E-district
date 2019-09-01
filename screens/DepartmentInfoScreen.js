import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { Header, Title, Left, Icon, Button, Body, Card, CardItem, Textarea } from "native-base";
import * as firebase from "firebase";
import { updateSidebar } from '../src/Actions'
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { Ionicons, Entypo } from '@expo/vector-icons';



class DepartmentInfoScreen extends Component {
  constructor(props) {
    super(props);
    console.log("DepartmentInfoScreen constructor start");
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      async (obj) => {
        console.log("DepartmentInfoScreen didFocus start")
        this.getData()
      }
    );
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur',
      (obj) => { console.log('HomeScreen didBlur start') }
    );


    this.state = {
      dName: this.props.navigation.getParam('dName', ''),
      descp: '',
      imageUrl: 'empty',
      qualification: '',
      Email: '',
      Name: '',
      number: ''
    };
  }


  getData = () => {

    firebase
      .database()
      .ref(`Departments/${this.state.dName}`)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.setState({
            descp: snapshot.val().Description,
            imageUrl: snapshot.val().Designation.Head.imageUrl,
            number: snapshot.val().Designation.Head.number,
            qualification: snapshot.val().Designation.Head.Qualification,
            Email: snapshot.val().Designation.Head.Email,
            Name: snapshot.val().Designation.Head.Name,
          })
        }
      })
  }

  renderNotch = () => {

    return (
      <View style={styles.notch} >
        <StatusBar />
      </View>
    )

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          {this.renderNotch()}
          <Header style={{ backgroundColor: '#000000' }}
          >
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Title style={{ fontFamily: 'serif' }} >{this.state.dName}</Title>
            </Body>
          </Header>
        </View>
        <View style={{ flex: 9, backgroundColor: 'orange' }}>


          <Card style={{ width: '90%', margin: 10, alignSelf: 'center', borderRadius: 20 }}>
            <CardItem bordered>
              <Image source={{ uri: this.state.imageUrl }}
                style={{ width: '100%', height: 200, borderRadius: 10 }}
                resizeMode='cover'
              />
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontSize: 15, alignSelf: 'center' }} >HEAD OF DEPARTMENT</Text>
            </CardItem>

            <CardItem bordered>
              <Text style={{ fontSize: 15 }}>Name : {this.state.Name}</Text>
            </CardItem>

            <CardItem bordered>
              <Text style={{ fontSize: 15 }} >Email : {this.state.Email}</Text>
            </CardItem>
            <CardItem>
              <Text style={{ fontSize: 15 }}>Phone Number : {this.state.number}</Text>
            </CardItem>
          </Card>
          <Card style={{ width: '90%', margin: 10, alignSelf: 'center', borderRadius: 20 }}>
            <CardItem bordered>
              <Text style={{ fontSize: 25 }}>About the {this.state.dName}</Text>
            </CardItem>
            <CardItem bordered>
              <Textarea disabled style={{ fontSize: 20 }}>{this.state.descp}</Textarea>
            </CardItem>
          </Card>
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" style={{ marginTop: 'auto' }}>
          <ActionButton.Item buttonColor='#ff2819' title="Search" textStyle={{ fontSize: 17, fontWeight: 'bold' }} textContainerStyle={{ height: 'auto' }} onPress={() => this.props.navigation.navigate('OfficialProfileScreen', { dName: this.state.dName })}>
            <Ionicons name="md-search" size={30} style={{ color: 'white' }} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#370080' title="Chats" textStyle={{ fontSize: 17, fontWeight: 'bold' }} textContainerStyle={{ height: 'auto' }} onPress={() => this.props.navigation.navigate('Message')}>
            <Entypo name="chat" size={30} style={{ color: 'white' }} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Downloads" textStyle={{ fontSize: 17, fontWeight: 'bold' }} textContainerStyle={{ height: 'auto' }} onPress={() => this.props.navigation.navigate('Download', { dName: this.state.dName })}>
            <Ionicons name="md-download" size={30} style={{ color: 'white' }} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.auth.routes
  }
}

export default connect(mapStateToProps, { updateSidebar })(DepartmentInfoScreen);

const styles = StyleSheet.create({

  notch: {
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight
  }
})