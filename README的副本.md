# 稻系统

## 代码规范

### 命名
* 文件夹命名-业务
  1. 组织结构：依据导航菜单主次结构组织文件夹结构，以业务名命名文件夹
  2. 名称选择：使用通用单词，避免生疏单词，特殊业务除外
  3. 名称结构：尽量使用单个单词，若单个词无法表明业务含义，可以使用单词组合，多个单词用中划线连接，全部小写
* 文件夹命名-组件
  1. 使用组件名命名文件夹名称
  2. 使用帕斯卡命名法
* 文件命名
  1. 业务类文件：使用帕斯卡命名法
  2. 业务样式文件：名称和业务文件名保持一致，格式采用小写
  3. 组件文件：使用帕斯卡命名法
  4. 配置文件：使用驼峰命名法 [*]
* 变量命名
  1. 单词选择：要能表明当前变量的使用意义，***避免使用缩写***，通用缩写除外
  2. 常量：统一大写，多个单词用下划线连接，如：`GET_USER_REQUEST`
  3. 变量：使用驼峰命名法，尽量保持简洁，如：`currentTab`
    * 普通变量，表明含义
    * 布尔值变量：使用`is`开头，如`isVisible, isNew, isDisabled`等
  4. 函数名：使用驼峰命名法，名称要能清楚表达该函数的行为
    * 接口函数：如列表：`list()`，详情`detail()`，新增`add()`，编辑`edit() || update()`，删除`delete(id)`等，类似函数，需要包装在业务名称下，如:
      ```javascript
      customer: {
      	list(){},
      	detail(id){},
      	add(){},
      	edit(){},
      	delete(){},
      }
      ```
    * 请求数据函数：统一使用`get`开头，如:`getCustomers(), getCustomer(id), getCustomerAutos(customerId)`
    * 事件处理函数：统一使用`handle`开头，如：`handleStatusChange(status), handleGenderChange(gender)`
    * 数据处理函数：使用`calculate`开头，一般返回一个计算后的数值，`calculateTotalCost()`，其余场景，根据实际情况确定
    * 数据组装函数：如处理一个map中的值，最后返回一个数据结构，可以使用`assemble`开头
    * dom渲染函数：统一使用`render`开头，如：`renderHeader()`
    * 布尔值判断函数：统一使用`is`开头，如：`isDisabled(value), isEmpty(value)`

### 类文件
1. 代码顺序

  ```javascript
  // redux,react redux
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';

  // react及antd,项目骨架
  import React from 'react';
  import { Button, Tabs } from 'antd';

  // 第三方库
  import { Link } from 'react-router-dom';

  // 自定义组件
  import GuideViewModal from '../../components/GuideViewModal';

  // 业务组件
  import Table from './Table';

  // redux actions
  import {
    getOrderDetail,
    getDealInfo,

    setApplicationDownloadInfo,
    setDealDownloadInfo,
    setInsuranceListMap,

    submitCarInfo,
    submitFinancingInfo,
    submitInsuranceInfo,
    submitProfitInfo,
  } from '../../../reducers/new-car/order/detailActions';

  // 引用样式
  require('./index.less');

  // 声明变量
  const TabPane = Tabs.TabPane;

  /**
  * 类说明注释
  * @desc 如：用户列表
  */
  class Index extends React.Component {
  	// 构造器函数
  	constructor(props){
  		super(props);
  		
  		this.state = {
  			isVisible: false,
  		};
  		
  		this.handleSubmit = this.handleSubmit.bind(this);
  		// 函数太多，可以使用数组绑定
  		[
  			'handleSubmit',
  			'handleNameChange',
  		].map(method => this[method] = this[method].bind(this));
  	}
  	
  	// react 生命周期函数
  	componentWillMount(){
  		// do something
  	}
  	
  	componentDidMount(){
  		// do something
  	}
  	
  	componentWillUnmount(){
  		// do something
  	}
  	
  	/**
  	* 事件处理函数
  	* 依据从dom结构中出现的顺序从上往下排列，bind this时同下面定义的顺序保持一致
  	*/
  	handleCompanyChange(company){
  		this.setState({company});
  	}
  	
  	handleSubmit(){
  		// submit form
  	}
  	
  	// 其余函数
  	calculateTotalCost(value){
  		let total = 0;
  		// do calculate
  		return total;
  	}
  	
  	// dom渲染函数
    
  	renderHeader(){
  		return (
  			<div>
  				<h3>Header</h3>
  			</div>
  		);
  	}
  	
    	// DOM结构块之间使用空行分割，以提高可读性
  	render(){
        	// 使用this.state，或this.props请在这里统一定义
          const { isVisible } = this.state;
        	const { isFetchingDetail, detail } = this.props;
        
        	/**
        	* 组件属性名顺序
        	* 1. 名称
        	* 2. 样式
        	* 3. 数据
        	* 4. 事件函数
        	*/
  		return (
  			<div>
  				{this.renderHeader(detail)}
  				
  				<Modal 
            		  	title="添加用户"
            			className="modal"
  	          		visilbe={isVisible}
            			user={detail}
            			footer={null}
            			onOk={this.handleSubmit}
            		>
  					<p>modal content</p>
  				</Modal>
  			</div>
  		);
  	}
  	
  	// redux react 映射函数
  	function mapStateToProps(state) {
  		return {user: state.user.detail};
  	}
  	
  	function mapDispatchToProps(dispatch){
  		return {
  			actions: bindActionCreators({
  				getUsers(),
  				getUser(),
  				editUser(),
  				deleteUser(),
  			}, dispatch);
  		};
  	}	
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Detail)；
  // 末尾保持一个空行
  ```
### 组件文件

1. 目录结构示例

   ```shell
   Loading 		// 组件名
   ├── Loading.js  // 组件主体
   ├── index.js    // 组件入口文件
   └── styles.js   // 组件样式文件
   ```

2. index.js

   ```javascript
   import Loading from './Loading';

   export default Loading;
   ```

3. Loading.js

   ```javascript
   import React, { PropTypes } from 'react';
   import { Platform, View } from 'react-native';
   import Spinner from 'react-native-spinkit';

   import colors from '../../styles/colors';
   import styles from './styles';

   function Loading(props) {
     const { type, isLoading } = props;

     if (isLoading) {
       return (
         <View style={styles.loadingOverlay}>
           <Spinner
             isVisible={isLoading}
             color={colors.yellow}
             type={type}
             style={styles.spinner}
           />
         </View>
       );
     }

     if (Platform.OS === 'ios') {
       return null;
     }

     return <View style={{ width: 0, height: 0 }} />;
   }

   Loading.propTypes = {
     type: PropTypes.string.isRequired,
     isLoading: PropTypes.bool.isRequired,
   };

   Loading.defaultProps = {
     type: 'FadingCircleAlt',
     isLoading: false,
   };

   export default Loading;
   ```

4. styles.js

   ```javascript
   import { StyleSheet } from 'react-native';

   export default StyleSheet.create({
     loadingOverlay: {
       position: 'absolute',
       top: 0,
       right: 0,
       bottom: 0,
       left: 0,
       zIndex: 999,
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },

     spinner: {
       flex: 0,
     },
   });
   ```



## 项目说明

* 路由设置，现在使用browserHistory，使用rote/:id的方式匹配路由


## 一、配置项目

---

#### 1、 配置nginx

前端路由方案使用browserHistory, 需要配置服务器，所有的请求都指向index.html, 且静态资源文件均使用绝对路径
 * 开发环境 index.dev.html
 * 生产环境 index.dist.html

```$xslt
// dev 环境
location / {
    try_files $uri /index.dev.html
}

// prod 环境
location / {
    try_files $uri /dist/index.html // 使用处理过的HTML文件
}
```

---

#### 2、URL设定

执行下面某一行命令进行 api URL 的设定。

```
# 开发、测试环境 api 基地址1：https://api.daotian.dev1.yunbed.com
bash> ./set_base_URL.sh dev1

# 开发、测试环境 api 基地址2：https://api.daotian.dev2.yunbed.com
bash> ./set_base_URL.sh dev2

```

---

#### 3、首页设定

执行下面某一行命令进行 首页 的设定。

```
bash> ./set_base_URL.sh dev1   # 开发环境，热打包时dev1环境使用
bash> ./set_base_URL.sh dev2  # 开发环境，热打包时dev1环境使用
```
首次运行需要执行
bash> ./set_brand.sh daotian

---

#### 4、推荐配置命令

1. 开发

```
bash> ./set_base_URL.sh dev1    # 开发、测试环境 api 基地址：https://api.daotian.dev1.yunbed.com
bash> ./set_base_URL.sh dev2    # 开发、测试环境 api 基地址：https://api.daotian.dev2.yunbed.com
```

2. 测试

```
bash> ./set_base_URL.sh dev1    # 开发、测试环境 api 基地址：https://api.daotian.dev1.yunbed.com
bash> ./set_base_URL.sh dev2    # 开发、测试环境 api 基地址：https://api.daotian.dev2.yunbed.com
```

---

## 二、打包

说明：打包做了三件事情：1)清空dist里的内容。2)将print.css、baseUrl.js、jquery.min.js、favicon.ico拷贝到dist中。3)打包

1. 开发

    - dev 分支
    - 开发热打包，（带热更新），```npm run dev```

2. 普通测试

    - test 分支，需要把 dev 分支的代码合并过来
    - 打包，```npm run dist```

3. 回归测试

    - test 分支，需要把 dev 分支的代码合并过来
    - 打包，```npm run dist```

4. 提交上线

    - master 分支，需要把 test 分支的代码合并过来
    - 打包，```npm run dist```
