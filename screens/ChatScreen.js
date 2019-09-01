import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, FlatList, Image, TextInput, KeyboardAvoidingView, Linking, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import { connect } from 'react-redux';
import AutoScroll from 'react-native-auto-scroll';
import * as ImagePicker from 'expo-image-picker';
import { Feather, Entypo } from "@expo/vector-icons";
import { Button, Icon, Header, Title, Left, Body, Right } from 'native-base';
import { Dialog, Portal } from 'react-native-paper';
import Modal from 'react-native-modalbox';


class ChatScreen extends Component {


    renderNotch = () => {
        return (
            <View style={styles.notch} />
        )
    }
    state = {
        message: [],
        input: '',
        chatIndex: null,
        chatID: '',
        visible: false,
        modalVisible: false,
        openImage: ""
    };



    constructor(props) {
        super(props);
        console.log("ChatScreen constructor start");
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                console.log("ChatScreen didFocus start")
            }
        );
    }


    componentWillMount() {
        let key = this.props.navigation.getParam("key", "");
        this.getMessages(key)
    }

    setModalVisible(url) {
        this.setState({ openImage: url });
    }



    addavatar = async (type) => {
        this._hideDialog();
        if (type === 'gallery') {
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 0.4
            })
            if (!response.cancelled) {
                this.props.navigation.navigate('Image', { avatar: response.uri, chatID: this.state.chatID })
            }
            else {
                this._hideDialog();
            }
        }
        else if (type === 'camera') {
            const response = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 0.4
            })
            if (!response.cancelled) {
                this.props.navigation.navigate('Image', { avatar: response.uri, chatID: this.state.chatID })
            }
            else {
                this._hideDialog();
            }
        }
    }

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    messageType = (item, currUid) => {
        if (item._id == currUid) {

            if (item.type == "msg")
                return (
                    <View style={{ flexDirection: 'row-reverse', padding: 5 }}>
                        <Image
                            style={styles.userIcon}
                            source={{ uri: item.imageUrl }}
                        />
                        <TextInput
                            multiline={true}
                            value={item.text}
                            editable={false}
                            style={styles.infoText}
                        />
                    </View>
                )
            else if (item.type == "img")
                return (
                    <View style={{ flexDirection: 'row-reverse', padding: 5, alignContent: 'center' }}>
                        <Image
                            style={styles.userIcon}
                            source={item.imageUrl === "empty" ? require("../assets/person.png") : { uri: item.imageUrl }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(item.imgMsg);
                                this.refs.modal1.open();
                            }}>
                            <Image
                                style={styles.imgMessage}
                                source={{ uri: item.imgMsg }}
                            />
                        </TouchableOpacity>
                    </View>
                )
        }
        else {
            if (item.type == "msg")
                return (
                    <View style={{ flexDirection: 'row', padding: 5 }}>
                        <Image
                            style={styles.userIcon2}
                            source={item.imageUrl === "empty" ? require("../assets/person.png") : { uri: item.imageUrl }}
                        />
                        <TextInput
                            multiline={true}
                            value={item.text}
                            editable={false}
                            style={styles.infoText2}
                        />
                    </View>
                )
            else if (item.type == "img")
                return (
                    <View style={{ flexDirection: 'row', padding: 5, alignContent: 'center' }}>
                        <Image
                            style={styles.userIcon2}
                            source={{ uri: item.imageUrl }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(true, item.imgMsg);
                            }}>
                            <Image
                                style={styles.imgMessage2}
                                source={{ uri: item.imgMsg }}
                            />
                        </TouchableOpacity>
                    </View>
                )
        }
    }


    addMessage = () => {
        const { currentUser } = firebase.auth();
        if (this.state.input.trim() !== '') {

            details = {
                type: 'msg',
                _id: currentUser.uid,
                text: this.state.input.trim(),
                name: this.props.fname + ' ' + this.props.lname,
                imageUrl: this.props.imageUrl
            }
            firebase
                .database()
                .ref(`chats/${this.state.chatID}`)
                .push(details)

            firebase
                .firestore()
                .collection(`chats`).doc(`single`)
                .collection(`${this.state.chatID}`)
                .add(details)

            this.setState({ input: '' })
            this.state.message.concat([details])


        }
    }



    getMessages = (key) => {
        const { currentUser } = firebase.auth();
        userkey1 = currentUser.uid + key
        userkey2 = key + currentUser.uid

        firebase
            .database()
            .ref(`chats/`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                    chatKeys = Object.keys(snapshot.val())


                    if (chatKeys.indexOf(userkey1) !== -1) {
                        this.setState({
                            chatIndex: chatKeys.indexOf(userkey1),
                            chatID: userkey1
                        })
                        firebase
                            .database()
                            .ref(`chats/${userkey1}`)
                            .on('value', chatSnapshot => {
                                if (chatSnapshot.val()) {
                                    chatList = Object.values(chatSnapshot.val())
                                    this.setState({ message: chatList })
                                }
                            })

                        firebase
                            .database()
                            .ref(`chats/${userkey1}`)
                            .off()

                    }
                    else
                        if (chatKeys.indexOf(userkey2) !== -1) {
                            this.setState({
                                chatIndex: chatKeys.indexOf(userkey2),
                                chatID: userkey2
                            })
                            firebase
                                .database()
                                .ref(`chats/${userkey2}`)
                                .on('value', chatSnapshot => {
                                    if (chatSnapshot.val()) {
                                        chatList = Object.values(chatSnapshot.val())
                                        this.setState({ message: chatList })
                                    }
                                })
                            firebase
                                .database()
                                .ref(`chats/${userkey2}`)
                                .off()
                        }
                        else {
                            this.setState({ chatID: userkey1 })
                            firebase
                                .database()
                                .ref(`chats/${userkey1}`)
                                .set({})

                        }
                }
                else {
                    this.setState({ chatID: userkey1 })
                    firebase
                        .database()
                        .ref(`chats/${userkey1}`)
                        .set({})
                }

            })
    }


    render() {

        const fname = this.props.navigation.getParam('fname', '')
        const number = this.props.navigation.getParam('number', '')
        const { currentUser } = firebase.auth();

        return (
            <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
                {this.renderNotch()}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 16 }}>
                        <ImageBackground
                            source={require('../assets/background.jpg')}
                            style={{ width: '100%', flex: 1 }}
                        >
                            <Header style={{ backgroundColor: '#000000' }}>
                                <Left>
                                    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                        <Icon name='menu' />
                                    </Button>
                                </Left>
                                <Body  >
                                    <Title >{fname}</Title>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => Linking.openURL(`tel:${number}`)}>
                                        <Feather name='phone-call' style={{ color: 'white' }} size={25} />
                                    </Button>
                                </Right>
                            </Header>

                            <AutoScroll style={{ flex: 15, margin: 10 }} >
                                <FlatList
                                    data={this.state.message}
                                    renderItem={({ item }) => this.messageType(item, currentUser.uid)}
                                />
                            </AutoScroll>
                        </ImageBackground>
                    </View>
                    
                    <Modal
                        backdrop={true}
                        ref={"modal1"}
                        swipeToClose={true}
                        backButtonClose={true}
                        style={{ backgroundColor: 'rgba(217, 218, 219, 0.0)' }}
                    >
                        <Image
                            source={{ uri: this.state.openImage }}
                            resizeMode='contain'
                            style={{ width: '100%', height: '100%', alignContent: 'center' }}
                        />
                    </Modal>
                    <Portal>
                        <Dialog
                            visible={this.state.visible}
                            onDismiss={this._hideDialog}
                            style={{ width: 'auto', alignSelf: 'center' }}
                        >
                            <Dialog.Title style={{ alignSelf: 'center' }}>ATTACHMENTS</Dialog.Title>
                            <Dialog.Actions style={{ flexDirection: 'column', alignContent: 'center' }}>
                                <Button transparent style={{ width: 'auto' }} onPress={() => { this.addavatar('gallery') }}><Text style={{ fontSize: 20 }} >Gallery</Text></Button>
                                <Button transparent style={{ width: 'auto' }} onPress={() => { this.addavatar('camera') }}><Text style={{ fontSize: 20 }} >Camera</Text></Button>
                                <Button transparent style={{ width: 'auto' }} onPress={this._hideDialog}><Text style={{ fontSize: 20 }} >Location</Text></Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={40}
                        behavior='padding'
                        style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignContent: 'center' }}
                    >
                        <TouchableHighlight
                            onPress={this._showDialog}
                            style={styles.attachBtn}
                        >
                            <Entypo name='attachment' size={25} />
                        </TouchableHighlight>
                        <TextInput
                            value={this.state.input}
                            onChangeText={(input) => { this.setState({ input }) }}
                            multiline={true}
                            textAlignVertical='auto'
                            style={styles.msgInput}

                        />
                        <TouchableHighlight
                            onPress={() => this.addMessage()}
                            style={styles.sendBtn}
                        >
                            <Feather name='send' size={25} />
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                </View >
            </View >
        )


    }
}

const mapStateToProps = state => {
    return {
        fname: state.auth.fname,
        lname: state.auth.lname,
        imageUrl: state.auth.imageUrl
    }
}

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({

    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 25,
        padding: 5
    },
    infoText: {
        height: 'auto',
        backgroundColor: '#19b5fe',
        width: 'auto',
        maxWidth: '85%',
        fontSize: 15,
        borderRadius: 10,
        color: 'black',
        padding: 5,
        marginRight: 5
    },
    userIcon2: {
        width: 40,
        height: 40,
        borderRadius: 25,
        padding: 5
    },
    infoText2: {
        height: 'auto',
        backgroundColor: '#bdc3c7',
        width: 'auto',
        maxWidth: '85%',
        fontSize: 15,
        borderRadius: 10,
        color: 'black',
        padding: 5,
        marginLeft: 5
    },
    msgInput: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: '#bdc3c7',
        width: '80%',
        fontSize: 18
    },
    sendBtn: {
        alignItems: 'center',
        height: 50,
        width: '10%',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#bdc3c7'
    },
    attachBtn: {
        alignItems: 'center',
        height: 50,
        width: '10%',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#bdc3c7'
    },
    imgMessage: {
        width: 200,
        height: 200,
        borderRadius: 2,
        padding: 5,
        marginRight: 10,
        borderWidth: 3,
        borderColor: 'black'
    },
    imgMessage2: {
        width: 200,
        height: 200,
        borderRadius: 25,
        padding: 5,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: 'black'
    }
})
