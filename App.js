import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Home from './screens/HomeScreen/index';
import Expo, { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import Reducers from './src/Reducers';
import * as firebase from "firebase";
import thunk from "redux-thunk";
import { Provider as PaperProvider } from 'react-native-paper';

console.disableYellowBox = true;

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    componentWillMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyAR9ThkizSSag9b5FylnNMPxTJGDs-t000",
            authDomain: "e-district-4ee7b.firebaseapp.com",
            databaseURL: "https://e-district-4ee7b.firebaseio.com",
            projectId: "e-district-4ee7b",
            storageBucket: "",
            messagingSenderId: "960696578999",
            appId: "1:960696578999:web:5765f1b3bbb8f536"
        };


        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;

        }
        return (
            <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
                <PaperProvider>
                    <Home />
                </PaperProvider>
            </Provider >
        );
    }
}
