import {Button, Modal} from "antd";
import React from "react";
import {observer} from "mobx-react";

/**
 * In dieser Komponente wird abgefragt, welche Art von Erzeugungsanlage erstellt werden soll
 * @type {function(*): *}
 */
export const CreateProducerMenuModal = observer((props) => {
    const {visible, onOpenWater, onOpenWind, onOpenSolar, onOpenOther, onCancel} = props;

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            title="添加发电设备"
            visible={visible}
            footer={[
                <Button key="submit" type="primary" onClick={onOpenWater}>
                    水能
                </Button>,
                <Button type="primary" onClick={onOpenWind}>
                    风能
                </Button>,
                <Button type="primary" onClick={onOpenSolar}>
                    光伏
                </Button>,
                <Button type="primary" onClick={onOpenOther}>
                    其它
                </Button>,
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>
            ]}
        >
            <p>请选择设备类型.</p>
        </Modal>
    );
});