import BaseStorage from "./base-storage"

class ObjectStorage extends BaseStorage{
    async findAll(){
        var _object = await this._storage.getItem(this._entity)
        if(_object === null){
            return Promise.resolve({})
        }
        _object = JSON.parse(_object)
        if(typeof _object !== "object"){
            return Promise.reject(new Error("storage is invalid"))
        }
        return Promise.resolve(_object)
    }
    async set(value){
        if(typeof value !== "object"){
            return Promise.reject(new Error("value is invalid"))
        }
        var _object = await this.findAll()
        if(Array.isArray(value)){
            for(var i in value){
                _object = {..._object,...value[i]}
            }
        }else{
            _object = {..._object,...value}
        }
        try{
            await this._storage.setItem(this._entity,JSON.stringify(_object))
            return Promise.resolve("ok")
        }catch(err){
            return Promise.reject(err)
        }
    }
    async clear(){
        return await this._storage.setItem(this._entity,JSON.stringify({}))
    }
}

export default ObjectStorage