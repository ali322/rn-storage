RN-Storage
===

### Class

### Storage(options)

Parameters:

| Name | Type | Description |
| :--- | :--- | :--- |
| options | Object | storage backend type and etc |

Return the storage instance

### storage methods

#### registerSchema(schemas)

register all of entities with schemas

Parameters:

| Name | Type | Description |
| :--- | :--- | :--- |
| schemas | Array<String|Object> | entity name and type |

#### entity(name)

get the named entity

Parameters:

| Name | Type | Description |
| :--- | :--- | :--- |
| name | String | entity name |

Return the entity instance

### entity methods

#### findById(id)

find the record by id

| Name | Type | Description |
| :--- | :--- | :--- |
| id | Number | record id |

#### findAll()

find all the records

#### update(id,value)

update the record by id

| Name | Type | Description |
| :--- | :--- | :--- |
| id | Number | record id |
| value | Object | the new record |

#### create(value)

create new record

| Name | Type | Description |
| :--- | :--- | :--- |
| value | Object | the new record |

#### delete(id)

delete record by id

| Name | Type | Description |
| :--- | :--- | :--- |
| id | Number | record id |


#### clear()

delete the entity

#### destory()

delete the storage 

#### set(value)

set the record of entity(object entity only)

| Name | Type | Description |
| :--- | :--- | :--- |
| value | Object | the new record |
