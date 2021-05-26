import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack=createStackNavigator();
const Tab=createMaterialBottomTabNavigator();

class Profile extends Component {
    state = { 
        name:'Profile'
     }
    render() { 
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
                <Stack.Screen name={this.state.name} component={this.TabBar}/>
            </Stack.Navigator>
         );
    }
    TabBar=()=>{
        return(
            <Tab.Navigator  style={{backgroundColor:"#4382e8"}} inactiveColor="#4382e8" activeColor="#0eed67" screenOptions={{
                tabBarColor:'#4382e8'
            }}>
                <Tab.Screen name="add photo" component={AddProfilePic} options={{
                    tabBarIcon:()=><MaterialIcons name="camera" size={25} color="#0eed67" onPress={()=>{this.setState({name:'add photo'})}}/>
                }}/>
                <Tab.Screen name="change profile" component={ChageProfile} options={{
                    tabBarIcon:()=><MaterialIcons name="face-profile" size={25} color="#0eed67" onPress={()=>{this.setState({name:'change profile'})}}/>
                }}/>
                <Tab.Screen name="timeline" component={TimeLine} options={{
                    tabBarIcon:()=><MaterialIcons name="timeline" size={25} color="#0eed67" onPress={()=>{this.setState({name:'timeline'})}}/>
                }}/>
            </Tab.Navigator>
        )
    }
}

function AddProfilePic(){
    return(
        <Text>change</Text>
    )
}
function ChageProfile(){
    return (
        <Text>change profile </Text>
    )
}
function TimeLine(){
    return (
        <Text>Time line</Text>
    )
}

export default Profile;