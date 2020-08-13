import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user) 
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <NavLink to="/">Home</NavLink>
    </Menu.Item>
    {
      user.userData && user.userData.isAuth  && (
      <Menu.Item key="chat">
        <NavLink to="/chat">Chat</NavLink>
      </Menu.Item>

      )
    }
  </Menu>
  )
}

export default LeftMenu