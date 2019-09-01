import React from "react";
import HomeScreen from './HomeIndex';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation'
import DepartmentInfoScreen from '../DepartmentInfoScreen';
import MessageScreen from '../MessageScreen';
import DepartmentScreen from '../DepartmentScreen';
import DownloadScreen from '../DownloadScreen';
import PdfScreen from '../PdfViewScreen';
import ChatScreen from '../ChatScreen';
import SettingScreen from '../SettingScreen';
import ProfileScreen from '../ProfileScreen';
import OfficialProfileScreen from '../OfficialProfileScreen';
import EmployeeProfileScreen from '../EmployeeProfileScreen';
import OfficialLoginScreen from '../OfficialLoginScreen';
import CitizenLoginScreen from '../CitizenLoginScreen';
import ImageScreen from '../ImageScreen';
import SideBar from '../SideBar';


const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Department: { screen: DepartmentScreen },
        Download: { screen: DownloadScreen },
        Profile: { screen: ProfileScreen },
        Pdf: { screen: PdfScreen },
        OfficialProfileScreen: OfficialProfileScreen,
        DepartmentInfo: { screen: DepartmentInfoScreen },
        EmployeeProfile: { screen: EmployeeProfileScreen },
        Chat: { screen: ChatScreen },
        Message: { screen: MessageScreen },
        Image: { screen: ImageScreen }
    },
    {
        headerMode: 'none',

    }
)

const LoginStack = createMaterialTopTabNavigator(
    {
        Officials: { screen: OfficialLoginScreen },
        Citizens: { screen: CitizenLoginScreen }

    },
    {
        initialRouteName: 'Officials',
        swipeEnabled: true,
        tabBarPosition: 'bottom'
    })

const DrawerStack = createDrawerNavigator(
    {
        Login: LoginStack,
        Home: HomeStack,
        Settings: SettingScreen
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: 180

    }
)

const App = createAppContainer(DrawerStack)

export default App;
