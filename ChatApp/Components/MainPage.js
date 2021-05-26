import React from 'react';
import {View,StyleSheet,TouchableOpacity,BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,useIsDrawerOpen } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'
import Profile from './Profile'
import Chat from './Chat'
import AddFriend from './AddFriend'
import Search from './Search'
import {
  Caption,
  Paragraph,
  Drawer,
  Text
} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontawsomIcons from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import {URL} from 'react-native-dotenv';

const Drawer1 = createDrawerNavigator();


class MainPage extends React.Component {
  constructor({user}){
    super();
    this.state={
      user:user,
      friendsNO:0,
      friendRequestNO:0,
      friend:[],
      request:[],
      friends:[]
    }
    this.chat=this.chat.bind(this);
    this.FR=this.FR.bind(this);
    this.friends=this.friends.bind(this);
  }
  componentDidMount(){
    setInterval(this.chat,2000);
    setInterval(this.FR,2000);
    setInterval(this.friends,2000);
  }
  chat(){
    Axios.post(`${URL}/`,{
        userName:this.state.user.userName
    }).then(
        res=>{
            this.setState({friends:[...res.data]});
        }
    ).catch(err=>console.log(err));
  }
  FR(){
    let x=this.state.friends.filter((item1)=>{return (item1.reciever===this.state.user.userName)}).map(function(x){
        return x;
    });
    this.setState({friendRequestNO:x.length});
  }
  friends(){
    Axios.post(`${URL}/checkAcceptance`,{
        userName:this.state.user.userName
    }).then(
        res=>{
            let x=[...res.data.users];

            this.setState({friendsNO:x.length});
        }
    ).catch(err=>console.log(err));
  }
  
  render(){
    return (
      <NavigationContainer >
        <Drawer1.Navigator initialRouteName="profile" drawerContent={props=><DrawerContent {...props} users={this.props.user} no1={this.state.friendRequestNO} no2={this.state.friendsNO}/>}>
          <Drawer1.Screen name="Home" component={Home} />
          <Drawer1.Screen name="Profile" component={Profile} />
          <Drawer1.Screen name="AddFriend" component={AddFriend} />
          <Drawer1.Screen name="Chat" component={Chat} />
          <Drawer1.Screen name="Search" component={Search} />
        </Drawer1.Navigator>
      </NavigationContainer>
    );
  }
}
function DrawerContent({navigation,users,no1,no2}){
  return(
    <View style={style.drawerContener}>
      <FontawsomIcons name="window-close" size={20} style={{marginLeft:0}} color="#0eed67" onPress={()=>props.navigation.closeDrawer()}/>
      <View style={style.profileView}>
      {/* my profile pic her */}
      </View>
      <View>
        <View style={style.rowInfo}>
          <View style={style.section}>
            <Paragraph style={style.paragraph}>{no2}</Paragraph>
            <Caption style={style.caption}>friends</Caption>
          </View>
          <View style={style.section}>
            <Paragraph style={style.paragraph}>{no1}</Paragraph>
            <Caption style={style.caption}>Friend Requests</Caption>
          </View>
        </View>
      </View>
      <DrawerContentScrollView>
        <View style={style.titleText}>
          <Drawer.Section style={style.profileComponent}>
            <Drawer.Item
              onPress={()=>navigation.navigate('Home',{users})}
              icon={()=>{return (
                <View style={{flexDirection:'row'}} >
                  <Icons name="home" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Home</Text>
                </View>
              )}}
            />
          </Drawer.Section>
          <Drawer.Section style={style.profileComponent} >
            <Drawer.Item 
              onPress={()=>navigation.navigate('Profile',{users})}
              icon={()=>{return (
                <View style={{flexDirection:'row'}} >
                  <Icons name="face-profile" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Profile</Text>
                </View>
              )}}
            />
          </Drawer.Section>
          <Drawer.Section style={style.profileComponent}>
            <Drawer.Item
              onPress={()=>navigation.navigate('Chat',{users})}
              icon={()=>{return (
                <View style={{flexDirection:'row'}} >
                  <Icons name="chat" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Chat</Text>
                </View>
              )}}
            />
          </Drawer.Section>
          <Drawer.Section style={style.profileComponent}>
            <Drawer.Item
              onPress={()=>navigation.navigate('AddFriend',{users})}
              icon={()=>{return (
                <View style={{flexDirection:'row'}} >
                  <FontawsomIcons name="user-friends" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Add friends</Text>
                </View>
              )}}
            />
          </Drawer.Section>
          <Drawer.Section style={style.profileComponent}>
            <Drawer.Item
              onPress={()=>navigation.navigate('Search',{users})}
              icon={()=>{return (
                <View style={{flexDirection:'row'}} >
                  <FontawsomIcons name="search" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Search</Text>
                </View>
              )}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={style.bottomDrawerSection}>
            <Drawer.Item 
                icon={()=>{return (
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => BackHandler.exitApp()}>
                  <FontawsomIcons name="sign-out-alt" size={25} color="#0eed67"/>
                  <Text style={style.labelStyle}>Exit</Text>
                </TouchableOpacity>
              )}}
                
            />
        </Drawer.Section>
    </View>
  )
}
const style=StyleSheet.create({
  drawerContener:{
    flex:1,
    backgroundColor:'#4382e8'
  },
  profileView:{
    backgroundColor:'#2253a3',
    marginTop:0,
    margin:'30%',
    height:100,
    borderColor:'white',
    borderWidth:1,
    borderRadius:500,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 200 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  rowInfo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    marginTop:-100,
    color:'#fff',
  },
  section:{
    margin:20,
  },
  paragraph:{
    color:'#0eed67',
    fontFamily:'Italianno-Regular',
    fontSize:20,
    alignContent:'center',
    alignItems:'center',
    justifyContent:"center",
    padding: 4,
    margin:20
  },
  caption:{
    color:'#0eed67',
    fontFamily:'Italianno-Regular',
    fontSize:20,
  },
  drawerSection:{
    backgroundColor:'#fff',
  },
  titleText:{
    borderWidth:1,
    borderBottomColor:'#ddd',
    padding:10,
    borderRadius:6,
    fontSize:18,
    borderColor:'#0eed67'
  },
  profileComponent:{
    justifyContent:"center",
    marginLeft:20,
    fontFamily:'Italianno-Regular',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderTopEndRadius:5,
    borderTopLeftRadius:5
  },
  labelStyle:{
    marginLeft:30,
    fontFamily:'Italianno-Regular',
    color:"#0eed67",
    fontSize:25
  }
});

export default MainPage;