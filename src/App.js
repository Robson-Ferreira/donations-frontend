import React from 'react';
import Routes from './routes';

import { ConfigProvider as AntdProvider } from 'antd';
import enUs from 'antd/lib/locale/en_US';

import 'antd/dist/antd.css';

const App = () => (
    <AntdProvider locale={enUs}>
        <Routes />
    </AntdProvider>
);

export default App;
