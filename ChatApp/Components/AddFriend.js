import React, { Component } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FriendRequest from './FriendRequest';
const Stack=createStackNavigator();

class AddFriend extends Component {
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
                <Stack.Screen name="Add Friends">
                    {props => <FriendRequest {...props} users={users} />}
                </Stack.Screen>
            </Stack.Navigator>
         );
    }
}


export default AddFriend;