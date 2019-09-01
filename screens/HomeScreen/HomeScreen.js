import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Picker, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Header, Left, Body, Title } from 'native-base';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux';


class App extends Component {


  updateSearch = (search) => {
    //render the list
  }

  updateDepartment = (department) => {
    this.setState({ department: department })
  }

  updateDesignation = (designation) => {
    this.setState({ designation: designation })
  }

  renderNotch = () => {

    return (
      <View style={styles.notch} >
        <StatusBar />
      </View>
    )

  }

  renderButtons = () => {
    if (this.props.type == 'admin') {
      console.log('admin')
      return (

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/deptbtn.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableWithoutFeedback>
            <Text>Department</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Message')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/message.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Chats</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Profile', {})}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/profile.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>My Profile</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/report.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Report</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/edit.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Edit Profile</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/deptbtn.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Department</Text>
          </View>
        </View>
      )
    }
    else if (this.props.type == 'official') {
      console.log('official')

      return (

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/deptbtn.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableWithoutFeedback>
            <Text>Department</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Message')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/message.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Chats</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Profile', {})}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/profile.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>My Profile</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/report.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Report</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/deptbtn.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Department</Text>
          </View>
          <View
            style={{ height: 100, width: 100, marginTop: 10, flexDirection: 'column', marginLeft: 15, borderRadius: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}
          >
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Department')}
            >
              <Image
                resizeMode='contain'
                source={require(`../../assets/deptbtn.png`)}
                style={{ height: 60, width: 60 }}
              />
            </TouchableRipple>
            <Text>Department</Text>
          </View>
        </View>
      )
    }
  }

  onItemSelected = (item) => {
    return (

      <Picker selectedValue={this.state.designation} onValueChange={this.updateDesignation}>
        <Picker.Item label="Steve" value="steve" />
        <Picker.Item label="Ellen" value="ellen" />
        <Picker.Item label="Maria" value="maria" />
      </Picker>

    );
  }

  render() {
    return (
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
            <Title style={{ fontFamily: 'serif', fontSize: 20 }} >Welcome To E-District</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <Image
            source={require(`../../assets/patiala.jpg`)}
            resizeMode='contain'
            style={{ height: 300, margin: 10 }}
          />
          {this.renderButtons()}
        </View>

      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    type: state.auth.typee
  }
}

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  searchView: {
    marginTop: 30,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 25
  },
  notch: {
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight
  }
});

