import {AsyncStorage} from "react-native"
import ListStorage from "./list-storage"
import ObjectStorage from "./object-storage"

class Storge{
    constructor(options={}){
        const defaultOptions = {
            type:"AsyncStorage"
        }
        options = {...defaultOptions,...options}
        switch(options.type){
            case "localStorage":
                this._storage = window.localStorage
            default:
                this._storage = AsyncStorage
        }
        this._entities = {}
    }
    registerSchema(schemas=[]){
        for(var i in schemas){
            var _schema = schemas[i]
            if(typeof _schema === "string"){
                this._entities[_schema] = new ListStorage(_schema,this._storage)
            }else if(typeof _schema === "object" && _schema.type === "object"){
                this._entities[_schema.name] = new ObjectStorage(_schema.name,this._storage)
            }
        }
    }
    entity(key){
        return this._entities[key]
    }
}

export default Storge