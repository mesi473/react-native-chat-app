import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TimeLine from './TimeLine';

const Stack=createStackNavigator();
const Tab=createMaterialBottomTabNavigator();

class Home extends Component {
    state = { 
        name:'Home'
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
                <Tab.Screen name="timeline" component={TimeLine} options={{
                    tabBarIcon:()=><MaterialIcons name="timeline" size={25} color="#0eed67" onPress={()=>{this.setState({name:'timeline'})}}/>
                }}/>
                <Tab.Screen name="setting" component={Setting} options={{
                    tabBarIcon:()=><MaterialIcons name="settings-outline" size={25}  color="#0eed67" onPress={()=>{this.setState({name:'add photo'})}}/>
                }}/>
            </Tab.Navigator>
        )
    }
}
function Setting(){
    return (
        <Text>Setting</Text>
    )
}

export default Home;