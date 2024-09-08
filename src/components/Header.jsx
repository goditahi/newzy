/* eslint-disable react/prop-types */

import { Layout, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Header } = Layout;

function AppHeader({ setCat }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const menu = (
    <Menu>
      <Menu.Item key="home" onClick={() => setCat('')}>
        Home
      </Menu.Item>
      <Menu.Item key="sports" onClick={() => setCat('sports')}>
        Sports
      </Menu.Item>
      <Menu.Item key="business" onClick={() => setCat('business')}>
        Business
      </Menu.Item>
      <Menu.Item key="technology" onClick={() => setCat('technology')}>
        Technology
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#f0f2f5', padding: '0 16px' }}>
        <div className="logo" style={{ float: 'left', color: '#000', fontSize: '24px', fontWeight: 'bold' }}>
          Newzy
        </div>
        {isMobile ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MenuOutlined />} style={{ float: 'right' , marginTop:'1.2rem' }} />
          </Dropdown>
        ) : (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="home" onClick={() => setCat('')}>
              Home
            </Menu.Item>
            <Menu.Item key="sports" onClick={() => setCat('sports')}>
              Sports
            </Menu.Item>
            <Menu.Item key="business" onClick={() => setCat('business')}>
              Business
            </Menu.Item>
            <Menu.Item key="technology" onClick={() => setCat('technology')}>
              Technology
            </Menu.Item>
          </Menu>
        )}
      </Header>
    </Layout>
  );
}

export default AppHeader;
