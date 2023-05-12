import { Input, Layout, Menu, theme ,message} from 'antd';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const { Header, Content, Sider } = Layout;

const App = () => {
  const [messageApi,contextHolder] = message.useMessage();
  const [inputVal,setInputVal] = useState("")//存放输入值
  const [params,setParams] = useState("")//存储当前选中菜单标记
  // 分别定义默认选中菜单项和菜单组
  const [defaultSelectedKeys] = useState("2-2")
  const [defaultOpenKeys] = useState("1")
  // 定义初始菜单组
  const [menuName,setMenuName] = useState([
    {
      key: 0,
      label: "菜单一",
      children: [
        {
          key: "1-1",
          label: "子菜单1-1",
        },
        {
          key: "1-2",
          label: "子菜单1-2",
        }
      ]
    },
    {
      key: 1,
      label: "菜单二",
      children: [
        {
          key: "2-1",
          label: "子菜单2-1",
        },
        {
          key:"2-2",
          label: "子菜单2-2",
        }
      ]
    }
  ])

 
  useEffect(()=>{
    if(defaultSelectedKeys==="2-2"){
      setParams({keyPath:[defaultSelectedKeys,defaultOpenKeys]})
      let result = (menuName[1].children).find((item)=>
      item.key==="2-2").label;
      setInputVal(result)
    }
  },[])
  /**
   * @description: 保存更改菜单名
   */
  const onSave = () => {
    if(inputVal){
      let result = menuName.map((item)=>{
       (item.key===Number((params.keyPath)[1])) && item.children.map((val)=>{
        if(val.key===(params.keyPath)[0])  val.label = inputVal
        return val
       })
      return item
    })
    setMenuName(result)
    }else{
      messageApi.open({
        type: 'warning',
        content: '菜单标签不能为空',
      });
    }  
  };
  /**
   * @description: input框value值
   */
  const onChange = (e) =>{
    setInputVal(e.target.value)
  }
  /**
   * @description: 菜单的选中事件
   */
  const onSelect = (params) => {
    setParams(params)
    let result = (menuName[(params.keyPath)[1]].children).find((item)=>
    item.key===(params.keyPath)[0]).label;
    setInputVal(result)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      {contextHolder}
      <Header className="header" style={{color:"#fff"}}>
        <h1>我只是一个测试用例</h1>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[defaultSelectedKeys]}
              defaultOpenKeys={[defaultOpenKeys]}
              style={{
                height: '100%',
              }}
              items={menuName}
              onSelect={onSelect}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Search
              value = {inputVal}
              placeholder="请输入你要修改的菜单名"
              allowClear
              enterButton="保存"
              size="large"
              onChange={onChange}
              onSearch={onSave}
            />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default App;
