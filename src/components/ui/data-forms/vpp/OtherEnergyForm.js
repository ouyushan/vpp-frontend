import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für eine alternative Erzeugungsanlage ab
 * @type {function(*): *}
 */
export const OtherEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, otherEnergy} = props;

    return (<Modal
            width={600}
            closable={false}
            destroyOnClose={true}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
            ]}
            title={"其它发电厂" + (editing ? "更新" : "添加")}
            visible={visible}
        >
            <p>请输入其它设备的数据</p>
            <Form
                name="createOtherEnergy"
                initialValues={(editing ? otherEnergy : {remember: false})}
                onFinish={onFinish}
                layout="vertical"
            >
                <Row>
                    <Col>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="设备名称"
                            name="otherEnergyId"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <Input style={{width: 250}}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="额定功率 (kWp)"
                            name="ratedCapacity"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Tooltip placement={"left"} title={"指定设备的当前功率百分比."}>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="容量 (%)"
                        name="capacity"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <Slider style={{width: 250}}/>
                    </Form.Item>
                </Tooltip>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editing ? "更新" : "新增"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
});