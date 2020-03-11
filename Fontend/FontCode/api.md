### 获取具体的活动介绍
http://127.0.0.1:3000/activity?id=1

```json
{
    msg:'successed'
    data:{
        id：活动的id
        name:活动名称；
        chairman:负责人;
        des：活动描述；
        date：截至日期；2020-03-10-15:15
        img：图片连接（http://localhost:3000/source/img/1.png$http://localhost:3000/source/img/2.png）;
        file:链接(http://localhost:3000/source/file/1.png);
    	allnum:活动总人数
    	havenum:已报名人数
	}
}
```

#### 活动报名

http://127.0.0.1:3000/joinA

```json
req:
{
	user:'16340210'//报名用户
	aid:1//活动id
}
res:
{
   msg:'successed',
   code:200
    --------
   msg:'failed',
    code:400
}
```

#### 活动列表

http://127.0.0.1:3000/list/aclist'

```
req:
{
	user:'16340210'
}
res:{
	msg:'successed',
	data:[{id:1,name:"跳绳比赛",club:"体育协会",enddate:"2020.03.20:15:30"}]
}
```

