import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from "react-native"
import Storage from "./storage"

const storage = new Storage()
storage.switch("example")

class Example extends Component{
    constructor(){
        super()
        this.state = {
            animal:{}
        }
        this._handleSave = this._handleSave.bind(this)
    }
    componentDidMount(){
        storage.get("animal").then(animal=>{
            if(animal){
                this.setState({animal})
            }
        })
    }
    _handleSave(){
        storage.create(this.state.animal).then(ret=>{
            console.log("ret",ret)
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.labelRow}>
                    <Text style={styles.labelText}>Animal:{this.state.animal["name"]}</Text>
                </View>
                <View style={styles.textinputRow}>
                    <TextInput style={styles.textinput} onChange={e=>this.setState({animal:{
                        name:e.target.value
                    }})}/>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={this._handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor:"orangered"}]}>
                        <Text style={styles.buttonText}>Del</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    labelRow:{
        paddingTop:120,
        paddingHorizontal:12
    },
    labelText:{
        textAlign:"center",
        fontSize:20
    },
    textinputRow:{
        paddingVertical:20,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    textinput:{
        borderWidth:1,
        borderColor:"#DDD",
        height:35,
        paddingVertical:8,
        paddingHorizontal:12,
        width:200
    },
    buttonRow:{
        paddingVertical:20,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        backgroundColor:"dodgerblue",
        paddingHorizontal:12,
        paddingVertical:8,
        borderRadius:5,
        marginHorizontal:5
    },
    buttonText:{
        textAlign:"center",
        fontSize:14,
        color:"white"
    }
})

export default Example