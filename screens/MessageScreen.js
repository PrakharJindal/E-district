import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header, Title, Left, Icon, Button, Body, Card, List, ListItem, Thumbnail } from "native-base";
import * as firebase from "firebase";
import { connect } from 'react-redux';


class HomeScreen extends Component {

    state = {
        data: [],
        arrayHolder: [],
        contacts: [],
        isLoading: true,
        isListEmpty: false,
        exist: false
    }

    constructor(props) {
        super(props);
        console.log("MessageScreen constructor start");
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                console.log("MessageScreen didFocus start")
                this.showChats();
            }
        );
    }

   
    showChats = () => {
        let self = this

        firebase.auth().onAuthStateChanged(async user => {
            if (user) {

                console.log('1')

                let chats = firebase
                    .database()
                    .ref(`/chats`)

                chats
                    .on('value', async snapshot => {
                        if (snapshot.val()) {
                            console.log('2')
                            chatKeys = Object.keys(snapshot.val())
                            await chatKeys.forEach(async item => {
                                if (item.includes(user.uid)) {
                                    this.state.arrayHolder.push(item.replace(user.uid, ''))
                                }

                            })
                        }
                    }
                    )


                let users = firebase
                    .database()
                    .ref(`/users/official/`)


                users
                    .on('value', async snapshot => {
                        if (snapshot.val()) {
                            userKeys = Object.keys(snapshot.val())
                            ind = userKeys.indexOf(user.uid)
                            userKeys.splice(ind, 1)
                            console.log(userKeys, 'keys')
                            console.log(this.state.arrayHolder, 'hello')
                            userList = Object.values(snapshot.val())
                            userList.map((item, ind) => {
                                if (item.email == user.email)
                                    userList.splice(ind, 1)
                            })


                            userKeys.forEach((value, key) => {
                                userList[key]["key"] = value;
                            })

                            const newData = userList.filter(item => {
                                if (this.state.arrayHolder.length == 0) {
                                    return false
                                }
                                else if (this.state.arrayHolder.includes(item.key)) {
                                    return true
                                }
                                else {
                                    return false
                                }


                            })
                            console.log(newData, 'newData')
                            await this.setState({ data: newData })
                        }
                    })

            }
        }
        )
    }

    renderNotch = () => {
        if (Platform.OS === "android") {
            return (
                <View style={styles.notch} >
                    <StatusBar />
                </View>
            )
        }
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
                            <Title style={{ fontFamily: 'serif' }} >WELCOME {this.props.fname}</Title>
                        </Body>
                    </Header>
                </View>
                <View style={{ flex: 9, marginTop: 10 }}>
                    <ScrollView>
                        <FlatList
                            data={this.state.data}
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
                                                        this.props.navigation.navigate("Chat", { key: item.key, fname: item.fname, number: item.number })
                                                    }}
                                                    style={{ width: '100%' }}
                                                >
                                                    <Body>
                                                        <Text style={styles.infoText}>
                                                            {item.fname}
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

const mapStateToProps = state => {
    return {
        fname: state.auth.fname,
        lname: state.auth.lname,
        imageUrl: state.auth.imageUrl
    }
}


export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({

    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    },
    listItem: {
        padding: 4,
        backgroundColor: '#e0e0e0',
        margin: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    userIcon: {
        width: 55,
        height: 55,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    infoContainer: {
        flexDirection: "column"
    },
    infoText: {
        fontSize: 20,
        fontFamily: 'serif',
        height: 55,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 15,
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "#B83227",
        borderRadius: 100,
    },
    entypoContainer: {
        position: "absolute",
        right: 0,
        marginLeft: "auto",
    }
})

