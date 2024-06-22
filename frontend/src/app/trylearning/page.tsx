import React, { useState } from 'react';
import { LeftOutlined, RightOutlined, BookOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import './TryLearning.scss'; // Import CSS for custom styling
import TryLearningPages from './TryLearningPage';
const App: React.FC = () => {
    return <TryLearningPages />;
};

export default App;
