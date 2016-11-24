import {AsyncStorage} from "react-native"
import uuid from "uuid"

function generateKey(strategy='random'){
    switch(strategy){
        case "randowm":
            return uuid.v4()
        case "timestamp":
            return uuid.v1()
        default:
            return Math.floor(Math.random() * 100000)
    }
    return uuid.v4()
}

class Storge{
    constructor(options={}){
        this._storage = AsyncStorage
    }
    switch(catalog){
        this._catalog = catalog
        return this
    }
    async get(key){
        const ret = await this._storage.getItem(this._catalog)
        return ret?ret[key]:null
    }
    async update(key,value){
        var _object = await this._storage.getItem(this._catalog)
        _object[key] = {...value,updated_at:Date.now()}
        return await this._storage.setItem(this._catalog,JSON.stringify(_object))
    }
    async create(value){
        var _object = await this._storage.getItem(this._catalog)
        _object = _object || {}
        const _key = generateKey()
        _object[_key] = {...value,created_at:Date.now()}
         return await this._storage.setItem(this._catalog,JSON.stringify(_object))
    }
    async clear(){
        return await this._storage.setItem(this._catalog,null)
    }
    async getAllKeys(){
        const ret = await this._storage.getItem(this._catalog)
        return Object.keys(ret)
    }
    async destory(){
        return await this._storage.clear()
    }
}

export default Storge