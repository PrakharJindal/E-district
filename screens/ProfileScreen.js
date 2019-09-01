import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { Button, Icon, Header, Title, Left, Body, Right, Card, CardItem } from 'native-base';
import * as firebase from "firebase";
import { connect } from 'react-redux';

class ProfileScreen extends Component {



    renderNotch = () => {
        return (
            <View style={styles.notch} />
        )
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
                            <Title style={{ fontFamily: 'serif' }} >My Profile</Title>
                        </Body>
                    </Header>
                </View>
                <View>
                    <Image
                        source={{ uri: this.props.imageUrl }}
                        style={{ width: 300, height: 300, alignSelf: 'center' }}
                        resizeMode='contain'
                    />
                    <Card>
                        <CardItem  >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name </Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={{ fontSize: 20 }}> {this.props.fname} {this.props.lname}</Text>
                        </CardItem>
                        <CardItem >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email </Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={{ fontSize: 20 }}>{this.props.email}</Text>
                        </CardItem>

                    </Card>

                </View>
            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        fname: state.auth.fname,
        lname: state.auth.lname,
        imageUrl: state.auth.imageUrl,
        email: state.auth.email
    }
}

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({

    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    }
})