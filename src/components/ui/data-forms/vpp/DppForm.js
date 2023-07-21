import {Button, Form, Input, Modal} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für ein DK ab
 * @type {function(*): *}
 */
export const DppForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, dpp} = props;

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            title={"分布式电厂 " + (editing ? "更新" : "新增")}
            visible={visible}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>
            ]}
        >
            <p>分布式电厂名称是唯一的。该电厂将添加发电和储能设备.</p>
            <Form
                name="createHousehold"
                initialValues={(editing ? dpp : {remember: false})}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="分布式电厂"
                    name="decentralizedPowerPlantId"
                    rules={[{required: true, message: '此字段必须填写。'}]}
                >
                    <Input style={{width: 250}}/>
                </Form.Item>
                <Form.Item style={{marginTop: 32}}>
                    <Button type="primary" htmlType="submit">
                        {editing ? "更新" : "新增"}
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
});