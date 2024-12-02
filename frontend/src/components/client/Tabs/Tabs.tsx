import { Tabs } from 'antd';
import './Tabs.scss'
const onChange = (key: string) => {
    console.log(key);
};
function Tab({items , activeKey  ,onChange } : [] | any) {
    
    return (
        <>
            <Tabs className='' activeKey={activeKey}  defaultActiveKey="1" items={items} onChange={onChange } />
        </>
    );
}

export default Tab;
