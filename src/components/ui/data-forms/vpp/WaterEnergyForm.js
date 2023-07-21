import {observer} from "mobx-react";
import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Wasserkraftanlage ab
 * @type {function(*): *}
 */
export const WaterEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, waterEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        title={"水电设备 " + (editing ? "更新" : "添加")}
        visible={visible}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>,
        ]}>
        <p>请输入水力设备的数据</p>
        <Form
            name="createWaterEnergy"
            initialValues={(editing ? waterEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="设备名称"
                name="waterEnergyId"
                rules={[{required: true, message: '此字段必须填写。'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="效率（%）"
                        name="efficiency"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="密度 (kg/m^3)"
                        name="density"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col><Form.Item
                    style={{marginRight: 16}}
                    label="下降速度 (m/s)"
                    name="gravity"
                    rules={[{required: true, message: '此字段必须填写。'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
                <Col><Form.Item
                    label="有效降落高度 (m)"
                    name="height"
                    rules={[{required: true, message: '此字段必须填写。'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
            </Row>
            <Row>
                <Col><Form.Item
                    style={{marginRight: 16}}
                    label="体积流量 (m^3/s)"
                    name="volumeFlow"
                    rules={[{required: true, message: '此字段必须填写。'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
                <Col>
                    <Tooltip placement={"right"} title={"表示电厂的当前功率百分比."}>
                        <Form.Item
                            label="电流容量 (%)"
                            name="capacity"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <Slider style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>

            <Form.Item style={{marginTop: 32}}>
                <Button type="primary" htmlType="submit">
                    {editing ? "更新" : "添加"}
                </Button>
            </Form.Item>
        </Form>

    </Modal>);
});