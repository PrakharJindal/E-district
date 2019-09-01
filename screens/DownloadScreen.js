import React, { Component } from 'react';
import * as firebase from "firebase";
import { ListItem, Text, View, Card, Icon } from 'native-base';
import { FlatList, Image } from 'react-native';

export default class App extends Component {

    state = {
        dName: this.props.navigation.getParam('dName', ''),
        forms: ['a', 'b', 'c'],
        downloadLinks: [],
    };

    componentDidMount() {
        this.getList();
    }

    getList = () => {

        firebase
            .database()
            .ref(`Departments/${this.state.dName}/downloads`)
            .once('value', snapshot => {
                if (snapshot.val()) {
                    console.log(Object.values(snapshot.val()))
                    this.setState({ downloadLinks: Object.values(snapshot.val()) })
                }
            })


    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'orange' }}>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Card style={{ marginBottom: '10%' }}>
                        <Text style={{ fontSize: 25, alignSelf: 'center' }}>{this.state.dName}</Text>
                    </Card>
                    <Card style={{}}>
                        <FlatList
                            data={this.state.downloadLinks}
                            renderItem={({ item }) => {
                                return (
                                    <ListItem
                                        style={{ flexDirection: 'row' , width:'95%' , height:40 , alignSelf:'center' }}
                                        onPress={(item) => { this.props.navigation.navigate('Pdf', { uri: item.url }) }}
                                    >
                                        <Text>{item.name}</Text>
                                        <Icon name='download' />
                                    </ListItem>
                                );
                            }}
                        />
                    </Card>
                </View>
            </View>
        );
    }
}