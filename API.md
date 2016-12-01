RN-Storage
===

### Class

### Storage(options)

参数:

| 名字 | 类型 | 描述 |
| :--- | :--- | :--- |
| options | Object | 存储容器类型 |

返回存储实例

### storage methods

#### registerSchema(schemas)

使用schema注册所有的实体

参数:

| 名字 | 类型 | 描述 |
| :--- | :--- | :--- |
| schemas | Array<String|Object> | 实体名字和类型 |

#### entity(name)

获取指定实体

参数:

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| name | String | 实体名字 |

返回实体实例

### entity methods

#### findById(id)

根据ID获取记录

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | Number | record id |

#### findAll()

获取所有的记录

#### update(id,value)

根据ID更新记录

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | Number | record id |
| value | Object | the new record |

#### create(value)

创建新记录

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| value | Object | the new record |

#### delete(id)

根据ID删除记录

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | Number | record id |


#### clear()

删除实体

#### destory()

删除存储实例

#### set(value)

设置新记录(对象实体方法)

| 名称 | 类型 | 描述 |
| :--- | :--- | :--- |
| value | Object | the new record |
