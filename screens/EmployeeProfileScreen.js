import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, FlatList, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, Icon, Header, Left, Body, Title, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';


class EmployeeProfileScreen extends Component {
    state = {
        data: this.props.navigation.getParam('item', '')
    }


    renderNotch = () => {

        return (
            <View style={styles.notch} >
                <StatusBar />
            </View>
        )

    }

    renderButton = () => {
        if (this.props.type == 'official') {
            return (
                <Button

                    onPress={() => {
                        this.props.navigation.navigate("Chat", { key: this.state.data.key, fname: this.state.data.Name, number: this.state.data.number })
                    }}                    >
                    <Text>
                        Send Message
                    </Text>
                </Button>
            )
        }
        else if (this.props.type == 'admin') {
            return (
                <View>
                    <Button
                        rounded
                        style={{ margin: 10, alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                    // onPress={() => {
                    //     this.props.navigation.navigate("Chat", { key: this.state.data.key, fname: this.state.data.Name, number: this.state.data.number })
                    // }}                   
                    >
                        <Text style={{ color: 'white', alignSelf: 'center' }}>
                            Delete User
                    </Text>
                    </Button>
                    <Button
                        rounded
                        style={{ margin: 10, alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                    // onPress={() => {
                    //     this.props.navigation.navigate("Chat", { key: this.state.data.key, fname: this.state.data.Name, number: this.state.data.number })
                    // }}               
                    >
                        <Text style={{ color: 'white', alignSelf: 'center' }}>
                            Update User
                    </Text>
                    </Button>
                </View>
            )
        }
    }


    render() {
        return (
            <View>
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
                            <Title style={{ fontFamily: 'serif' }} >Profile</Title>
                        </Body>
                    </Header>
                </View>
                <ScrollView>
                    <View >

                        <Image
                            source={{ uri: this.state.data.imageUrl }}
                            style={{ width: 150, height: 150, alignSelf: 'center' }}
                            resizeMode='contain'
                        />
                        <Card>
                            <CardItem  >
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name </Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={{ fontSize: 16 }}> {this.state.data.Name}</Text>
                            </CardItem>
                            <CardItem >
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email </Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={{ fontSize: 16 }}>{this.state.data.Email}</Text>
                            </CardItem>
                            <CardItem >
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Designation </Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={{ fontSize: 16 }}>{this.state.data.Designation}</Text>
                            </CardItem>
                            <CardItem >
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Number </Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={{ fontSize: 16 }}>{this.state.data.Number}</Text>
                            </CardItem>

                        </Card>


                    </View>
                    {this.renderButton()}
                </ScrollView>
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

const mapStateToProps = state => {
    return {
        type: state.auth.typee
    }
}

export default connect(mapStateToProps)(EmployeeProfileScreen);
