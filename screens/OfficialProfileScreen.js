import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, FlatList, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, Icon, Header, Left, Body, Title, List, ListItem, Thumbnail } from 'native-base';
import * as firebase from "firebase";



class OfficialProfileScreen extends Component {

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
    }

    state = {
        dName: this.props.navigation.getParam('dName', ''),
        profiles: []
    }

    getData = () => {

        firebase
            .database()
            .ref(`Departments/${this.state.dName}/Designation`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                    userDesignations = Object.keys(snapshot.val())
                    userData = Object.values(snapshot.val())
                    userDesignations.forEach((value, key) => {
                        userData[key]["Designation"] = value;
                    })

                    this.setState({ profiles: userData })
                    console.log(this.state.profiles)
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
                <View style={{ flex: 1 }}>
                    {this.renderNotch()}
                    <Header style={{ backgroundColor: '#000000' }}
                    >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Title style={{ fontFamily: 'serif' }} >Employees</Title>
                        </Body>
                    </Header>
                </View>
                <View style={{ flex: 9, marginTop: 10 }}>
                    <ScrollView>
                        <FlatList
                            data={this.state.profiles}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <List>
                                            <ListItem avatar >
                                                <Left>
                                                    <Thumbnail source={item.imageUrl === "empty" ? require("../assets/person.png") : { uri: item.imageUrl }} />
                                                </Left>
                                                <TouchableWithoutFeedback
                                                    onPress={() => {
                                                        this.props.navigation.navigate("EmployeeProfile", { item: item })
                                                    }}
                                                    style={{ width: '100%' }}
                                                >
                                                    <Body>
                                                        <Text style={styles.infoText}>
                                                            {item.Name}
                                                        </Text>
                                                        <Text style={styles.infoText}>
                                                            {item.Designation}
                                                        </Text>
                                                    </Body>
                                                </TouchableWithoutFeedback>
                                            </ListItem>
                                        </List>
                                    </View>
                                    //</TouchableOpacity>
                                );
                            }}
                        />
                    </ScrollView>
                </View >
            </View >

        );
    }
}

const styles = StyleSheet.create({
    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    }
});

export default OfficialProfileScreen;
