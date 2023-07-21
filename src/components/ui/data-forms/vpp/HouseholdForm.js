import {Button, Form, Input, InputNumber, Modal} from "antd";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für ein Haushalt ab
 * @type {function(*): *}
 */
export const HouseholdForm = observer((props) => {
    const {visible, onFinish, onCancel, editing, household} = props;

    return (<Modal
        closable={false}
        destroyOnClose={true}
        title={"住户 " + (editing ? "更新" : "添加")}
        visible={visible}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>
        ]}
    >
        <p>一个住户由一个唯一的名字和住户成员的数量组成.</p>
        <Form
            name="createHousehold"
            initialValues={(editing ? household : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="住户名称"
                name="householdId"
                rules={[{required: true, message: '此字段必须填写。'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Form.Item
                label="住户成员人数"
                name="householdMemberAmount"
                rules={[{required: true, message: '此字段必须填写。'}]}
            >
                <InputNumber style={{width: 250}}/>
            </Form.Item>
            <Form.Item style={{marginTop: 32}}>
                <Button type="primary" htmlType="submit">
                    {editing ? "更新" : "新增"}
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});