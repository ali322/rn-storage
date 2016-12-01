class BaseStorage{
    constructor(entity,storage){
        this._entity = entity
        this._storage = storage
    }
    async clear(){
        return await this._storage.setItem(this._entity,JSON.stringify([]))
    }
    async destory(){
        return await this._storage.clear()
    }
}

export default BaseStorage