# mongodb数据库操作

## 权限配置

### 创建超管账户

``` 
use admin
db.createUser({
user:'admin',
pwd:'123456',
roles:[{role:'root',db:'admin'}]
})
```

## 修改配置文件

``` 
路径：C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg(你自己的路径)
配置：
security:
authorization: enabled
```

### 重启 mongodb 服务

### 用超级管理员账户连接数据库

``` 
mongo admin -u 用户名 -p 密码
mongo 192.168.1.200:27017/test -u user -p password
```

### 给 eggcms(示例)  数据库创建一个用户 问 只能访问 eggcms 。

``` 
use eggcms
db.createUser(
{
user: "eggadmin",
pwd: "123456",
roles: [ { role: "dbOwner", db: "eggcms" } ]
}
)
```

### Mongodb 

``` 
show users; #查看当前库下的用户
db.dropUser("eggadmin") #删除用户
db.updateUser( "admin",{pwd:"password"}); #修改用户密码
db.auth("admin","password"); #密码认证
```

### 数据库角色

``` 
1.数据库用户角色：read、readWrite;
2.数据库管理角色：dbAdmin、dbOwner、userAdmin；
3.集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4.备份恢复角色：backup、restore；
5.所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、
dbAdminAnyDatabase
6.超级用户角色：root
```

### 链接数据库

``` 
const url = 'mongodb://admin:123456@localhost:27017/';
```

# mongoose

## 介绍

Mongoose 是在 node.js 异步环境下对 mongodb 进行便捷操作的对象模型工具。Mongoose
是 NodeJS 的驱动，不能作为其他语言的驱动。

## 特点

1、通过关系型数据库的思想来设计非关系型数据库
2、基于 mongodb 驱动，简化操作

## 使用

### 安装

``` 
npm i mongoose --save
```

### 引入和链接数据库

``` 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
如果有账户密码需要采用下面的连接方式：
mongoose.connect('mongodb://eggadmin:123456@localhost:27017/eggcms');
```

### 定义 Schema

数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema 会映射到 mongodb 中的一个 collection，它不具备操作数据库的能力。

``` 
var UserSchema=mongoose.Schema({
name: String,
age:Number,
status:'number'
})
```

### 创建数据模型

定义好了 Schema，接下就是生成 Model。model 是由 schema 生成的模型，可以对数据库的操作。
注意：mongoose.model 里面可以传入两个参数也可以传入三个参数。

``` 
mongoose.model（参数 1:模型名称（首字母大写），参数 2:Schema）
or
mongoose.model（参数 1:模型名称（首字母大写），参数 2:Schema，参数 3:数据库集合名称）
```

如果传入 2  个参数的话: 这个模型会和模型名称相同的复数的数据库建立连接：如通过下面
方法创建模型，那么这个模型将会操作 users 这个集合。

``` 
var User=mongoose.model('User', UserSchema);
```

如果传入 3  个参数的话: 模型默认操作第三个参数定义的集合名称.

### 查找数据

``` 
User.find({},function(err,docs){
if(err){
console.log(err);
return;
}
console.log(docs);
})
```

### 增加数据

``` 
var u=new User({ //实例化模型 传入增加的数据
name:'lisi2222333',
age:20,
status:true
})
u.save();
```

### 修改数据

``` 
User.updateOne({ name: 'lisi2222' }, { name: '哈哈哈' }, function(err, res) {
if(err){
console.log(err);
return;
}
console.log('成功')
});
```

### 删除数据

``` 
User.deleteOne({ _id: '5b72ada84e284f0acc8d318a' }, function (err) {
if (err) {
console.log(err);
return;
}
// deleted at most one tank document
console.log('成功');
});
```

## mongoose预定义模式修饰符

### lowercase、uppercase 、trim
mongoose 提供的预定义模式修饰符，可以对我们增加的数据进行一些格式化。

``` 
var UserSchema=mongoose.Schema({
name:{
type:String,
trim:true
},
age:Number,
status:{
type:Number,
default:1
}
})
```

### Getters 与 Setters  自定义修饰符

除了 mongoose 内置的修饰符以外，我们还可以通过 set（建议使用） 修饰符在增加数据的
时候对数据进行格式化。也可以通过 get（不建议使用）在 实例获取数据的时候对数据进行
格式化。

``` 
var NewsSchema=mongoose.Schema({
title:"string",
author:String,
pic:String,
redirect:{
type:String,
set(url){
if(!url) return url;
if(url.indexOf('http://')!=0 && url.indexOf('https://')!=0){
url = 'http://' + url;
}
return url;
},
get: function(url){
if(!url) return url;
if(url.indexOf('http://')!=0 && url.indexOf('https://')!=0){
url = 'http://' + url;
}
return url;
}
},
content:String,
status:{
type:Number,
default:1
}
})
```

