## 读书笔记：企业 IT 架构之道：阿里巴巴中台战略思想与架构实战

最近换了份工作，就职于基础服务部门，会涉及到一些中台的开发，因此买了这本书，希望对中台服务思想有更深的理解。

### 概要

本书分三个部分，共 11 个章节，从中台话题入手，讲到共享服务体系，着重讲了阿里巴巴的共享服务体系是如何发展演化的，最后用两个案例，讲了阿里巴巴共享服务
体系对外输出的成果。


### 章节阅读

#### 第一部分 引子

##### 第 1 章 阿里巴巴集团中台战略引发的思考

2015 年底，阿里巴巴提出了“大中台，小前台”，起因是，2015 年中的时候，马云带领阿里巴巴集团的高管，拜访了 Supercell 公司。Supercell 公司在多年的游
戏研发中积累了非常科学的研发方法和体系，使得公司可以支持几个人的小团队在几周之内就能研发出一款新游戏，并进行公测。

而在中台战略之前，其实阿里已经有了“厚平台，薄应用”的架构，而其中“共享业务事业部”是最重要的一个部门。

共享业务事业部最初是为了将淘宝和天猫两个平台中公共的、通用的业务抽离出来，避免有些功能重复建设和维护。

##### 第 2 章 构建业务中台的基础————共享服务体系

共享服务体系带来的业务价值：
- 回归 SOA 的本质————服务重用（不使用 ESB）
- 通过业务，不断滋养共享服务
- 培育业务创新（共享服务体系能很好得培育出特定领域的专家）
- 赋予业务快速创新和试错的能力 （美军之所以能灵活作战，敢放这么小的团队到前面，是因为有非常强的导弹指挥系统，有非常强大的中后台能力，能支持这样的小团队快速做判断，并且引领整个进攻完成。美军这样的战斗阵型与阿里巴巴如今的“大中台、小前端”战略完全一致，）
- 为真正发挥大数据威力做好准备
- 改变组织阵型带来组织效能的提升（流水线 -> “运营”、沉淀）

#### 第二部分 共享服务体系搭建

##### 第 3 章 分布式服务框架的选择

2008 年以前，是一个几百兆字节大的 WAR 包部署模式，这种模式存在以下几个问题：
- 项目团队间协同成本高，业务响应慢
- 应用复杂度已经超出了人的认知负载
- 错误难于隔离
- 数据库连接能力很难扩展
- 应用扩展成本高

解决以上问题的方法就是应用 SOA 理念和“去中心化”的方法进行业务拆分，到了 2008 年，最终改造成了以上百个 WAR 包独立部署的服务化架构。

阿里分布式服务框架 HSF 的组成和原理（最早是 Dubbo）

##### 第 5 章 数据拆分实现数据库能力线性扩展

数据库是最容易产生性能瓶颈的服务组件。

淘宝数据库优化历程：
读写分离（写入能力的限制）-> 将同一表中不同数据拆分到不同数据库（连表查询、事务等不好操作）-> 自研分布式数据库（cobar、TDDL、DRDS）

##### 第 6 章 异步化与缓存原则
业务流程异步化：服务化后，前端的一个业务操作可能涉及到上百个服务，如果以同步的方式，会造成资源的长期占用和影响系统的吞吐量。对于能够同步执行的服务应采用异步化方式处理。阿里巴巴内部使用消息中间件的方式实现了业务异步化。

数据库事务异步化：大的数据库事务会对长时间占用数据库资源和表记录，解决方法是将大事务拆分成小事务。

事务与柔性事务：异步化，需要面临如何保证业务事务一致性的问题。传统数据库的事务确实非常好地保证了业务的一致性，但面对海量数据，就暴露出了数据库性能和处理能力的瓶颈。所以在分布式领域，基于 CAP（一致性、可用性、分区容错性）理论和在其基础上延伸出的 BASE 理论，提出了“柔性事务”的概念。柔性事务是由于互联网应用的核心需求，高可用性，产生的。

##### 第 7 章 打造数字化运营能力

整个服务化后的淘宝平台，各个服务间的调用关系变得纷繁复杂，加上海量的服务调用和“点对点”的交互方式，使得出现问题后很难定位。而如果采用传统的日志查看方式定位问题，就需要在海量的日志信息中花费很长时间进行日志对比，效率低下，甚至没法定位问题。为了解决这个问题，阿里巴巴中间件团队打造了针对分布式服务调用链跟踪平台————“鹰眼”。

“鹰眼”的核心实现思路，就是通过一套分布式日志平台实现对服务调用链路的跟踪。

##### 第 8 章 打造平台稳定性能力
- 限流和降级（当过载时掐掉一些流量，TMD、Sentinel）
- 流量调度
- 业务开关
- 容量压测及评估规划（通过对生产环境上的流量模型引流到压测服务器上，获取到服务实例单机最大处理能力，结合不同型号服务器处理能力以及生产环境的水位监控信息，对服务集群所需部署的服务器数量进行容量评估及预测）
- 全链路压测平台
- 业务一致性平台


### 总结
花了两个星期把这本书看了两遍，之前一直有听说过“中台”这个概念，但都没有深入去了解，一直误会为“后台”，或者像“监控平台”这些工具型平台。读完这本书后，对“中台”的理解就是共享服务，包括“用户中心”、“商品中心”等，这种偏业务的组件，同时共享服务并不是仅仅是共享或者抽离组件，而是以运营一个“产品”的思维，去开发维护一个中台。另外，也加深了对分布式所使用的技术的认知。