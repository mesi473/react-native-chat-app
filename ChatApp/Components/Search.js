import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack=createStackNavigator();
const Tab=createMaterialBottomTabNavigator();

class Search extends Component {
    state = { 
        name:'Search'
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
                <Tab.Screen name="comments" component={AddSearchPic} options={{
                    tabBarIcon:()=><MaterialIcons name="comment-search" size={25} color="#0eed67" onPress={()=>{this.setState({name:'commentsearch'})}}/>
                }}/>
                <Tab.Screen name="accounts" component={ChageSearch} options={{
                    tabBarIcon:()=><MaterialIcons name="account-search" size={25} color="#0eed67" onPress={()=>{this.setState({name:'account search'})}}/>
                }}/>
                <Tab.Screen name="timelins" component={TimeLine} options={{
                    tabBarIcon:()=><MaterialIcons name="image-search-outline" size={25} color="#0eed67" onPress={()=>{this.setState({name:'timeline'})}}/>
                }}/>
            </Tab.Navigator>
        )
    }
}

function AddSearchPic(){
    return(
        <Text>change</Text>
    )
}
function ChageSearch(){
    return (
        <Text>change Search </Text>
    )
}
function TimeLine(){
    return (
        <Text>Time line</Text>
    )
}

export default Search;