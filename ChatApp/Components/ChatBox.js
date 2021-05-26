import {StyleSheet} from 'react-native'


export default Style=StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        backgroundColor:"#4382e8",
        height:60,
        flexDirection:'row'
    },
    messageField:{
        width:"90%",
        height:"40%",
        margin:"5%",
        padding:"5%",
        borderWidth:1,
        borderColor:"#4382e8",
        borderRadius:40
    },
    sendArea:{
        width:"90%",
        height:"10%",
        flexDirection:'row',
        margin:"5%",
        marginTop:0,
        marginBottom:"15%"
    },
    textField:{
        borderWidth:1,
        borderColor:'#4382e8',
        width:"70%",
        height:60,
        margin:"5%",
        marginRight:0,
        borderRadius:50,
        fontSize:18,
        padding: "2%",
    },
    text:{
        color:"#0eed67",
        textAlign:'center',
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:40,
    },
    text1:{
        color:"#0eed67",
        textAlign:'center',
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:40,
        margin: 1,
    },
    buttons:{
        width:"20%",
        backgroundColor:"#4382e8",
        height:60,
        margin:'5%',
        marginRight:0,
        borderRadius:20,
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
    },
    profileView:{
        backgroundColor:'#0eed67',
        height:"90%",
        width:"30%",
        margin:'1%',
        borderColor:'white',
        borderWidth:1,
        borderRadius:500,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 200 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
});