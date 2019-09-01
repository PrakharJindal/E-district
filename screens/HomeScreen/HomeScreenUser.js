import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    ImagePicker,
    TextInput,
} from 'react-native';

import { Autocomplete } from 'react-native-dropdown-autocomplete';

export default class App extends Component {
    state = {
        avatar: 'NULL',
        deptList: ['chirag', 'parth', 'prakhar']
    };

    removeimage = () => {
        this.setState({
            avatar: 'NULL',
        });
    };

    addavatar = async type => {
        if (type === 'gallery') {
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!response.cancelled) {
                this.setState({ avatar: response.uri });
            }
        } else if (type === 'camera') {
            const response = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            if (!response.cancelled) {
                this.setState({ avatar: response.uri });
            }
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: '90%', alignSelf: 'center', flex: 1 }}>
                    <Autocomplete
                        data={this.state.deptList}
                        initialValue={this.state.search}
                        placeholder="Search Departments"
                        containerStyle={{ height: 40, zIndex: 99, width: '100%', marginTop: '20%' }}
                        handleSelectItem={item => this.setState({ search: item })}
                        valueExtractor={item => item}
                    />
                </View>
                <Image
                    source={{ uri: this.state.avatar }}
                    resizeMode="contain"
                    style={styles.img}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="Use Gallery"
                        onPress={() => this.addavatar('gallery')}
                        color='#e6a400'
                    />
                    <Text> </Text>
                    <Button
                        title="Use Camera "
                        onPress={() => this.addavatar('camera')}
                        style={{ marginLeft: 10 }}
                        color='#e6a400'
                    />
                    <Text> </Text>
                    <Button
                        title="Remove Image"
                        onPress={() => this.removeimage()}
                        style={{ marginLeft: 10 }}
                        color='#e6a400'
                    />
                </View>
                <TextInput placeholder="TITLE" style={styles.description} />
                <TextInput placeholder="ADD DESCRIPTION" style={styles.description} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0dd92',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: 200,
    },
    description: {
        width: '90%',
        borderWidth: 1,
        marginTop: 15,
        height: 30,
        backgroundColor: 'white'
    },
});