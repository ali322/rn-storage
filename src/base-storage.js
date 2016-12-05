class BaseStorage{
    constructor(entity,storage){
        this._entity = entity
        this._storage = storage
    }
    async destory(){
        return await this._storage.clear()
    }
}

export default BaseStorage