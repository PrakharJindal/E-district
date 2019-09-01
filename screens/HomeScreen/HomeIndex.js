import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Picker, Image, TouchableWithoutFeedback, ImagePicker, TextInput } from 'react-native';
import { Button, Icon, Header, Left, Body, Title } from 'native-base';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux';
import { Autocomplete } from 'react-native-dropdown-autocomplete';


class HomeIndex extends Component {

    state = {
        avatar: 'NULL',
        deptList: ['chirag', 'parth', 'prakhar']
    };

    renderNotch = () => {

        return (
            <View style={styles.notch} >
                <StatusBar />
            </View>
        )

    }

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
        if (this.props.type == 'citizen') {
            return (
                <View style={styles.container}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
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
        else {
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
}


const mapStateToProps = state => {
    return {
        type: state.auth.typee
    }
}

export default connect(mapStateToProps)(HomeIndex);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0dd92',
        flex: 1,
        alignItems: 'center'
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

