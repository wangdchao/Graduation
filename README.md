# Graduation
本科毕业设计
## 题目
**基于Web的学生社团活动管理网页应用**
## 背景介绍
目前学生的社团活动主要是各个社团在线下进行的，或则借助与qq或微信建群的方式进行各个的社团活动的组织。对于社团活动的发布也是借助与微信公众号或线下海报进行通知。因此详设计一个网络应用将这些线下、分散的活动统一到网上应用中来。实现学生如参加社团、活动签到、社团活动发布、活动公益时或体育章结算、社团管理结合为一体。这样对学校、社团、学生都有一个统一的平台，方便于三方的互动，管理更高效。
## 对象与内容
+ 管理员：应用中的学生账号和信息由管理员统一录入，社团的创建、注销，社团负责人的认证审核，社团活动的公益时、体育章审核
+ 社团负责人：活动创建、申请、发布，社团公告的发布，活动报名学生的记录、签到
+  学生:加入社团、社团活动的报名、签到、退出，年度公益时与体育章总结
+  社团：信息介绍、成员介绍
+  学生活动：起止日期、内容、报名限制条件、奖励
+  公告：社团公告、活动公告、系统公告

## 思路和方法
系统人员分为三类：管理员、学生、社团负责人。依据他们各自的所能使用的功能进行模块划分。管理员（教务人员）：（1）审核页面：活动审核（人数、活动公益时、活动体育章、活动内容）、社团创建与审核、社团撤销、学生信息录入。（2）社团负责人：活动创建于发布、公告发布、社团成员管理、学生活动报名表整理….（3）学生：活动报名、社团申请加入、活动签到。依照各个模块循序进行应用开发。开发是遵循相应的交互逻辑，在各个模块之间留出相应的通信接口。在此基础上搭好总的模块基础后再进行细节添加。

以上开发所涉及技术与平台：nodejs、vue前端框架、JS、express后端框架（待定）、postgresql数据库
## 进度安排
+ 2019/10/10-2019/11/10   确定选题，构建大体框架
+ 2019/11/10-2020/01/10   确定框架，实现可运行成品
    + 2019/12/23-2020/12/28：完成管理员学生信息录入、社团创建与撤销模块和相应的后端服务，各个类型用户登录模块（包括个人信息页面）
    + 2019/12/29-2020/01/2：完成社团介绍模块、社团成员管理（成员申请、退出）
    + 2020/01/3-2020/01/8：活动创建模块、发布、审核、报名、咨询、签到等功能
    + 2020/01/9-2020/01/14：管理员活动审核（人数、活动公益时、活动体育章、活动内容）
    + 2020/01/15-2020/01/20：公告模块、学生活动总结页面
    + 2020/01/20-2020/01/22：交互逻辑优化
+ 2020/01/22-2020/02/10   完善应用 
+ 2020/02/18-2020/03/18   完善文档
+ 2018/03/18-2018/04/18   初稿修改并定稿
