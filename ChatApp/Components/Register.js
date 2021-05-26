import React, { Component } from 'react';
import {Text,StyleSheet,View,TextInput,ScrollView,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Login from './Login';
import Axios from 'axios';
import MainPage from './MainPage';
import {URL} from 'react-native-dotenv';

class Register extends Component {
    constructor(){
        super();
        this.state={
            click:0,
            uname:'',
            fname:'',
            lname:'',
            phoneNumber:'',
            password:'',
            email:'',
            conpassword:'',
            haveError:false,
            errorMessage:'',
            conError:'',
            user:{}
        }
        this.registerButtonHandler=this.registerButtonHandler.bind(this);
    }
    registerButtonHandler(){
        Axios.post(`${URL}/register`,{
            firstName:this.state.fname,
            lastName:this.state.lname,
            email:this.state.email,
            phoneNumber:this.state.phoneNumber,
            password:this.state.password,
            conpassword:this.state.conpassword,
            userName:this.state.uname,
        }).then(res=>{
            console.log(res.data)
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
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                    <View style={style.container}>
                        <View style={style.subContainer}>
                            <Text style={style.registerText}>Register</Text>
                            {
                                this.state.haveError?<Text style={{color:"red"}}>{this.state.errorMessage}   {this.state.conError}</Text>:null
                            }
                            <ScrollView style={{height:"50%",width:"80%"}}>
                                <Text style={style.inputText}>First name</Text>
                                <TextInput style={style.inputField} onChange={(e)=>{this.setState({fname:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>Last name</Text>
                                <TextInput style={style.inputField} onChange={(e)=>{this.setState({lname:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>Username</Text>
                                <TextInput style={style.inputField} onChange={(e)=>{this.setState({uname:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>Password</Text>
                                <TextInput  style={style.inputField} onChange={(e)=>{this.setState({password:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>Password(again)</Text>
                                <TextInput style={style.inputField} onChange={(e)=>{this.setState({conpassword:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>Phone number</Text>
                                <TextInput keyboardType="number-pad" style={style.inputField} onChange={(e)=>{this.setState({phoneNumber:e.nativeEvent.text})}}/>
                                <Text style={style.inputText}>e-mail</Text>
                                <TextInput style={style.inputField} onChange={(e)=>{this.setState({email:e.nativeEvent.text})}}/>
                                <TouchableOpacity style={style.register} onPress={this.registerButtonHandler}>
                                    <Text style={{color:"#0eed67",fontFamily:'Italianno-Regular',fontSize:40}}>Register</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={style.login} onPress={()=>this.setState({click:1})}>
                            <Text style={{color:"#0eed67",fontFamily:'Italianno-Regular',fontSize:40}}>i already have an account</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
             );
        }else if(this.state.click===1){
            return <Login/>
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
        marginTop:'1%',
    },
    registerText:{
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:80,
        color:"#0eed67",
        justifyContent:'center',
        textAlign:'center',
        borderWidth:1,
        borderColor:'#4382e8',
        borderBottomColor:'#0eed67',
        marginBottom:50
    },
    login:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:"center",
        marginVertical:"10%",
        borderWidth:1,
        borderColor:"#0eed67"
    },
    inputText:{
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:30,
        color:"#0eed67",
        
    },
    inputField:{
        borderWidth:1,
        borderColor:'#4382e8',
        borderBottomColor:'#0eed67',
        marginBottom:10,
        marginTop:-25
    },
    register:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:"center",
        marginVertical:"10%",
        borderWidth:1,
        borderColor:"#0eed67",
        borderRadius:100
    }
})

export default Register;