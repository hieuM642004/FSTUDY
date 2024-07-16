import { Tabs } from 'antd';
import './Tabs.scss'
const onChange = (key: string) => {
    console.log(key);
};
function Tab({items } : [] | any) {
    return (
        <>
            <Tabs className='' defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    );
}

export default Tab;
