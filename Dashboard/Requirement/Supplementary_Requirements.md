# 补充需求
## 简介
本文档记录了闲钱宝所有未再用例中描述的需求
## 功能性
1.可插拔规则  

在几个用例的不同场景点执行任意一组规则，以支持对系统功能对定制  

2.安全性  

所有使用都必须经过用户认证，都必须在登录状态下进行

## 可用性

人性因素  

交互界面应该有良好的提示性。因此  

1.不可用的输入框和按钮应该做暗处理  

2.是非性的状态应用不同颜色标记，“非”状态应用红色等有警示性质的颜色   

## 可靠性

1.性能

所有涉及数据库的操作应该1s内给出相应结果  

## 可支持性

1.可适应性  

闲钱宝的不同用户在处理业务时有不一样的业务规则和处理需求，因此在场景中，需要启用能够插拔的业务规则 

## 实现约束

闲钱宝的项目经理坚持后端使用python开发，他认为python开发周期短，容易调试，并且后端人员的python熟练度较高  

## 免费开源构建

一般而言我们建议在该项目中尽可能使用开源构件。尽管现在对最终的设计选择构件为时过早，但是我们建议采用

- Flask
- Docker
- MySQL
- …

## 法律问题

我们是用的开源构建需要解决许可证的问题，以便包含开源构建的闲钱宝能够用于商业经营  
