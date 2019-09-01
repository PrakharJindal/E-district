import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import HomeScreenUser from './HomeScreenUser';
import { connect } from 'react-redux';

class HomeIndex extends Component {

    renderType = () => {
        if (this.props.type == 'citizen') {
            return (
                <HomeScreenUser />
            )
        }
        else {
            return (
                <HomeScreen />
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderType()}
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        type: state.auth.typee
    }
}

export default connect(mapStateToProps)(HomeIndex);
