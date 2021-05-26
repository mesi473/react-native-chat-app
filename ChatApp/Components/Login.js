import React, { Component } from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView} from 'react-native';
import Register from './Register';
import Axios from 'axios';
import {URL} from 'react-native-dotenv';
import MainPage from './MainPage';

class Login extends Component {
    constructor(){
        super();
        this.state={
            click:0,
            uname:'',
            password:'',
            haveError:false,
            errorMessage:'',
            conError:'',
            user:{}
        }
        this.loginButtonHandler=this.loginButtonHandler.bind(this);
    }
    loginButtonHandler(){
        Axios.post(`${URL}/login`,{
            userName:this.state.uname,
            password:this.state.password
        }).then(res=>{
            if(res.data.error){
                this.setState({haveError:true,errorMessage:[...res.data.error]});
            }
            if(res.data.success){
                this.setState({click:2,user:res.data.user});
            }
        }).catch((err)=>{console.log(err);this.setState({conError:err})});
    }
    render() { 
        if(this.state.click===0){
            return ( 
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={style.container}>
                        <View style={style.subContainer}>
                            <Text style={style.loginText}>Login</Text>
                            {
                                this.state.haveError?<Text style={{color:"red"}}>{this.state.errorMessage}   {this.state.conError}</Text>:null
                            }
                            <ScrollView style={{height:"50%",width:"80%"}}>
                                <View>
                                    <Text style={style.inputText}>Username</Text>
                                    <TextInput  style={style.inputField} onChange={(e)=>this.setState({uname:e.nativeEvent.text})}/>
                                </View>
                                <View>
                                    <Text style={style.inputText}>Password</Text>
                                    <TextInput  style={style.inputField} onChange={(e)=>this.setState({password:e.nativeEvent.text})}/>
                                </View>
                                <TouchableOpacity style={style.login} onPress={this.loginButtonHandler}>
                                    <Text style={{color:"#0eed67",fontFamily:'Italianno-Regular',fontSize:40}}>Login</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={style.register} 
                        onPress={()=>{
                            this.setState({click:1});
                        }}>
                            <Text style={{color:"#0eed67",fontFamily:'Italianno-Regular',fontSize:40}}>create an account</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
             );
        }else if(this.state.click===1){
            return <Register/>
        }else if(this.state.click===2){
            return <MainPage user={this.state.user}/>
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
        marginTop:'2%',
        height:"80%"
    },
    loginText:{
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:120,
        color:"#0eed67",
        justifyContent:'center',
        textAlign:'center',
        borderWidth:1,
        borderColor:'#4382e8',
        borderBottomColor:'#0eed67',
        marginBottom:30
    },
    inputText:{
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:40,
        color:"#0eed67",
    },
    inputField:{
        borderWidth:1,
        borderColor:'#4382e8',
        borderBottomColor:'#0eed67',
        marginBottom:10,
        marginTop:-30
    },
    register:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:"center",
        marginVertical:"15%",
        borderWidth:1,
        borderColor:"#0eed67",
    },
    login:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:"center",
        marginVertical:"10%",
        borderWidth:1,
        borderColor:"#0eed67",
        borderRadius:100
    }
}) 

export default Login;