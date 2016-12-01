import uuid from "uuid"
import BaseStorage from "./base-storage"

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

class ListStorage extends BaseStorage{
    async findById(id){
        var _object = await this.findAll()
        return _object.find(v=>v.id === id)
    }
    async findAll(){
        var _object = await this._storage.getItem(this._entity)
        if(_object === null){
            return Promise.resolve([])
        }
        _object = JSON.parse(_object)
        if(Array.isArray(_object) === false){
            return Promise.reject(new Error("storage is invalid"))
        }
        return Promise.resolve(_object)
    }
    async update(id,value){
        if(typeof value !== "object"){
            return Promise.reject(new Error("value is invalid"))
        }
        var _object = await this.findAll()
        var _updatedObject = _object.map((v,index)=>{
            if(v.id === id || (Array.isArray(id) && id.indexOf(v.id) >= 0)){
                v = {...v,...value}
            }
            return v
        })
        await this._storage.setItem(this._entity,JSON.stringify(_updatedObject))
    }
    async create(value){
        if(typeof value !== "object"){
            return Promise.reject(new Error("value is invalid"))
        }
        var _object = await this.findAll()
        var _ids
        if(Array.isArray(value)){
            _ids = []
            for(var i in value){
                const _id = generateKey()
                _ids.push(_id)
                _object.push({...value[i],id:_id,created_at:Date.now()})
            }
        }else{
            _ids = generateKey()
            _object.push({...value,id:_ids,created_at:Date.now()})
        }
        try{
            await this._storage.setItem(this._entity,JSON.stringify(_object))
            return Promise.resolve(_ids)
        }catch(err){
            return Promise.reject(err)
        }
    }
    async delete(id){
        var _object = await this.findAll()
        _object = _object.filter((v,index)=>{
            return v.id !== id || (Array.isArray(id) && id.indexOf(v.id) === -1)
        })
        await this._storage.setItem(this._entity,JSON.stringify(_object))
    }
}

export default ListStorage