import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Header, Title, Left, Icon, Button, Body } from "native-base";
import { List, Checkbox } from 'react-native-paper';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Autocomplete } from "react-native-dropdown-autocomplete";


class DepartmentScreen extends Component {

    state = {
        search: '',
        department: '',
        departmentVisible: false,
        departmentVisible: false,
        designation: '',
        deptList: ['Department of Agriculture', 'Department of Excise and Taxation', 'Department of Elections', 'Department of School Education', 'Department of Defence Services Welfare', 'Department of Employment Generation and Traning', 'Health Department', '	Department of Cooperation'],
        data: ['Department of Agriculture', 'Department of Excise and Taxation', 'Department of Elections', 'Department of School Education', 'Department of Defence Services Welfare', 'Department of Employment Generation and Traning', 'Health Department', '	Department of Cooperation'],
    }

    renderNotch = () => {

        return (
            <View style={styles.notch} >
                <StatusBar />
            </View>
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
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
                            <Title style={{ fontFamily: 'serif' }} >Departments</Title>
                        </Body>
                    </Header>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ width: '90%', alignSelf: 'center', zIndex: 99}}>
                        <Autocomplete
                            data={this.state.deptList}
                            placeholder='Search Departments'
                            containerStyle={{ height: 40, zIndex: 99, width: '100%' }}
                            pickerStyle={{ alignSelf: 'center', zIndex: 99 }}
                            overlayStyle={{ alignSelf: 'center', zIndex: 99 }}
                            scrollStyle={{ alignSelf: 'center', zIndex: 99 }}
                            handleSelectItem={(item) => {
                                this.setState({ search: item })
                                this.setState({ data: [item] })
                            }}
                            valueExtractor={item => item}
                        />
                    </View>
                    <ScrollView>
                        <List.Section >
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => {
                                    return (
                                        <List.Accordion
                                            title={item}
                                            left={props => <List.Icon {...props} icon="folder" />}
                                        >
                                            <List.Item
                                                onPress={() => this.props.navigation.navigate('DepartmentInfo', { dName: item })}
                                                title="About Department"
                                            />
                                            <List.Item
                                                onPress={() => this.props.navigation.navigate('Download', { dName: item })}
                                                title="Downloads" />
                                        </List.Accordion>
                                    )
                                }}
                            />
                        </List.Section>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default DepartmentScreen;

const styles = StyleSheet.create({

    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    }
})