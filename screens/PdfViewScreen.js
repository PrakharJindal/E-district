import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';

export default class PdfViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.navigation.getParam('uri', '')
        };
    }

    render() {
        return (

            <WebView
                style={styles.container}
                source={{ uri: this.state.uri }}

            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    }
});