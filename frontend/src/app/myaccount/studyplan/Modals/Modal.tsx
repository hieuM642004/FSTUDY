import { Modal } from 'antd';

function Modals({ children, handleCancel, open }: any) {
    return (
        <>
            <Modal
                open={open}
                title=""
                onCancel={handleCancel}
                footer={[]}
                width={500}
            >
                {children}
            </Modal>
        </>
    );
}

export default Modals;
