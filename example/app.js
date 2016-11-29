import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Modal,Dimensions,ListView,LayoutAnimation} from "react-native"
import Storage from "rn-storage"
import {Toast,NavBar,Alert} from "yarn-ui"
import Icon from 'react-native-vector-icons/Ionicons'

let storage = new Storage()
storage.registerSchema(["example","other"])

var exampleEntity = storage.entity("example")
var otherEntity = storage.entity("other")

class Example extends Component{
    constructor(){
        super()
        this.state = {
            animals:[],
            modalActive:false,
            updateModalActive:false,
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        }
        this._handleSave = this._handleSave.bind(this)
        this._handleCreate = this._handleCreate.bind(this)
        this._renderRow = this._renderRow.bind(this)
        this._removeAll = this._removeAll.bind(this)
        this._handleDel = this._handleDel.bind(this)
    }
    async componentDidMount(){
        try{
            const animals = await exampleEntity.findAll()
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(animals)
            })
            LayoutAnimation.spring()
        }catch(err){
            this._toast.show("读取失败")
            console.error(err)
        }
    }
    async _refreshListView(){
        const animals = await exampleEntity.findAll()
        LayoutAnimation.spring()
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(animals)
        })
    }
    _removeAll(){
        this._alert.alert("提示","确认清空吗?",[
            {text:"Yes",onPress:async ()=>{
                await exampleEntity.clear()
                this._refreshListView()
            }},
            {text:"No",style:"cancel"}
        ])
    }
    async _handleCreate(){
        this.setState({modalActive:false})
        try{
            let _key = await exampleEntity.create(this.state.animal)
            this._toast.show("添加成功!")
            this._refreshListView()
        }catch(err){
            console.log("err",err)
            this._toast.show("添加失败!")
        }
    }
    async _handleSave(){
        this.setState({updateModalActive:false})
        try{
            await exampleEntity.update(this.state.updatedAnimal.id,{name:this.state.updatedAnimal.name})
            this._toast.show("保存成功!")
            this._refreshListView()
        }catch(err){
            this._toast.show("保存失败!")
        }
    }
    async _handleDel(id){
        this._alert.alert("提示","确定删除?",[
            {text:"Yes",onPress:async ()=>{
                try{
                    await exampleEntity.delete(id)
                    this._toast.show("删除成功!")
                    this._refreshListView()
                }catch(err){
                    this._toast.show("删除失败!")
                }
            }},
            {text:"No",style:"cancel"}
        ])
    }
    _renderRow(animal){
        return (
            <View key={animal.id} style={styles.labelRow}>
                <Text style={styles.labelText}>{animal.name}</Text>
                <TouchableOpacity style={styles.labelButton} onPress={()=>{
                    this.setState({
                        updatedAnimal:animal,
                        updateModalActive:true
                    })
                }}><Icon name="ios-create" size={20} color="#AAA"/></TouchableOpacity>
                <TouchableOpacity style={styles.labelButton} onPress={()=>this._handleDel(animal.id)}><Icon name="ios-close" size={25} color="orangered"/></TouchableOpacity>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <NavBar title="Storage" leftButton={<Icon name="ios-trash" size={25} color="#CCC"/>} onLeftButtonClick={this._removeAll}
                rightButton={<Icon name="ios-add" size={30} color="#333"/>} onRightButtonClick={()=>{
                    this.setState({modalActive:true})
                }}/>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} enableEmptySections={true}/>
                <Modal animationType="fade" visible={this.state.modalActive} transparent={true} 
                    onRequestClose={()=>this.setState({modalActive:false})}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.textinputRow}>
                            <TextInput style={styles.textinput} onChange={e=>this.setState({animal:{
                                name:e.nativeEvent.text
                            }})}/>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={[styles.button,{backgroundColor:"orangered"}]} onPress={this._handleCreate}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{backgroundColor:"#CCC"}]} onPress={()=>this.setState({modalActive:false})}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
                <Modal animationType="fade" visible={this.state.updateModalActive} transparent={true} 
                    onRequestClose={()=>this.setState({updateModalActive:false})}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.textinputRow}>
                            <TextInput style={styles.textinput} onChange={e=>this.setState({updatedAnimal:{
                                ...this.state.updatedAnimal,
                                name:e.nativeEvent.text
                            }})} value={this.state.updatedAnimal?this.state.updatedAnimal.name:""}/>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={this._handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{backgroundColor:"#CCC"}]} onPress={()=>this.setState({updateModalActive:false})}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
                <Toast ref={view=>this._toast=view}/>
                <Alert ref={view=>this._alert=view}/>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    labelRows:{
        paddingTop:30
    },
    labelRow:{
        paddingVertical:8,
        paddingHorizontal:12,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    labelText:{
        textAlign:"left",
        fontSize:14,
        flex:1
    },
    labelButton:{
        width:40,
    },
    textinputRow:{
        paddingVertical:10,
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
    },
    modalContainer:{
        backgroundColor:"rgba(0,0,0,0.5)",
        flex:1,
        justifyContent:"center",
        padding:Dimensions.get("window").width * 0.2
    },
    modalWrapper:{
        backgroundColor:"#FFF",
        borderRadius:5,
        paddingTop:8
    },
})

export default Example