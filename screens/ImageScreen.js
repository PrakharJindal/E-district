import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native';
import { Button, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import uuid from "uuid";


class ImageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.navigation.getParam('avatar', ''),
            imageDownloadUrl: "empty",
            isUploading: false,
            chatID: this.props.navigation.getParam('chatID', '')
        };
    }

    saveImage = async () => {
        const { avatar } = this.state;


        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                this.setState({ isUploading: true });
                const dbRef = firebase
                    .database()
                    .ref(`chats/${this.state.chatID}`)

                const storageRef = firebase
                    .storage()
                    .ref()

                if (avatar !== "empty") {
                    const imageUrl = await this.uploadImageAsync(avatar, storageRef);
                    this.setState({ imageDownloadUrl: imageUrl })
                }

                let details = {
                    type: 'img',
                    _id: user.uid,
                    name: this.props.fname + ' ' + this.props.lname,
                    imageUrl: this.props.imageUrl,
                    imgMsg: this.state.imageDownloadUrl
                }

                dbRef.push(details)

                this.setState({ isUploading: false })
                this.props.navigation.goBack();

            }
        })
    }


    uploadImageAsync = async (uri, storageRef) => {
        const parts = uri.split(".");
        const fileExtension = parts[parts.length - 1];

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response)
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network Request Failed"))
            }
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        })

        const ref = storageRef
            .child("MessagePictures")
            .child(uuid.v4() + "." + fileExtension)
        const snapshot = await ref.put(blob);

        blob.close()

        const imgUrl = await snapshot.ref.getDownloadURL()
            .then(url => {
                const downloadUrl = url;

                return downloadUrl
            })
        return imgUrl
    };

    render() {
        if (this.state.isUploading) {
            return (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}
                />
            )
        }
        return (
            <View>
                <Image
                    source={{ uri: this.state.avatar }}
                    resizeMode='contain'
                    style={{ width: '100%', height: '85%', marginTop: StatusBar.currentHeight }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button block success iconLeft
                        style={{ margin: 20, marginRight: 'auto', width: '40%', alignContent: 'space-around' }}
                        onPress={() => { this.saveImage() }} >
                        <MaterialIcons name='done-all' />
                        <Text>  SEND </Text>
                    </Button>
                    <Button block danger iconLeft
                        style={{ margin: 20, marginLeft: 'auto', width: '40%', alignContent: 'space-around' }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <MaterialIcons name='delete' />
                        <Text>  DELETE  </Text>
                    </Button>
                </View>
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


export default connect(mapStateToProps)(ImageScreen);