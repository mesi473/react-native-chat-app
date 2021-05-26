import React, { Component } from 'react';
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native';
import Login from './Components/Login';
import Register from './Components/Register';


class App extends Component {
  constructor(){
    super();
    this.state={
      click:0
    }
  }
  render() { 
    if(this.state.click===0)
      return ( 
        <View style={style.container}>
          <View style={style.subContainer}>
            <Text style={style.chatName}>M chat</Text>
            <View style={style.buttonField}>
              <TouchableOpacity style={style.loginButton} onPress={()=>this.setState({click:1})}>
                <Text style={{fontFamily:'Italianno-Regular',fontSize:40,color:"#4382e8"}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.registerButton} onPress={()=>this.setState({click:2})}>
                <Text style={{fontFamily:'Italianno-Regular',fontSize:40,color:"#4382e8"}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    else{
      if(this.state.click===1)
        return <Text>Hello</Text>
      else 
        return <Text>hello</Text>
    }
  }
}
const style=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#4382e8',
  },
  subContainer:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    marginTop:'20%',
  },
  chatName:{
    fontWeight:"normal",
    fontFamily:'Italianno-Regular',
    fontSize:100,
    color:"#0eed67"
  },
  buttonField:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  loginButton:{
    backgroundColor:'#0eed67',
    width:200,
    height:50,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:100,
    marginBottom:20
  },
  registerButton:{
    backgroundColor:'#0eed67',
    width:200,
    height:50,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:100,
  }
})

export default App;
