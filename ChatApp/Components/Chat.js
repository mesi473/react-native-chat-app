import React, { Component } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import FriendRequest from './FriendRequest';
import Friends from './Friends';

const Stack=createStackNavigator();
const Tab=createMaterialBottomTabNavigator();

class Chat extends Component {
    render() { 
        const { users } = this.props.route.params;
        return ( 
            <Stack.Navigator  screenOptions={{
                headerStyle:{backgroundColor:'#4382e8'},
                headerTintColor:'#0eed67',
                headerTitleStyle:{
                    fontWeight:'normal',
                    fontSize:45,
                    textAlign:'center',
                    fontFamily:'Italianno-Regular',
                },
                headerRight:()=>(
                    <MaterialIcons name="menu" size={40} color="#0eed67" style={{marginRight:20}} onPress={()=>this.props.navigation.openDrawer()}/>
                )
            }}>
                <Stack.Screen name="Chat" >
                {props => <this.TabBar {...props} users={users} />}
                </Stack.Screen>
            </Stack.Navigator>
         );
    }
    TabBar=({navigation,users})=>{
        return(
            <Tab.Navigator  style={{backgroundColor:"#4382e8"}} inactiveColor="#4382e8" activeColor="#0eed67" screenOptions={{
                tabBarColor:'#4382e8'
            }}>
                <Tab.Screen name="freinds" options={{
                    tabBarIcon:()=><FontAwesome5Icon name="user-friends" size={18} color="#0eed67"/>
                }} >
                    {props => <Friends {...props} users={users} />}
                </Tab.Screen>
                <Tab.Screen name="add friends" options={{
                    tabBarIcon:()=><Entypo name="add-user" size={25} color="#0eed67" />
                }}>
                    {props => <FriendRequest {...props} users={users} />}
                </Tab.Screen>
            </Tab.Navigator>
        )
    }
}

export default Chat;