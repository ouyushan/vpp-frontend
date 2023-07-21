import {observer} from "mobx-react";
import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Windkraftanlage ab
 * @type {function(*): *}
 */
export const WindEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, windEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>,
        ]}
        title={"风力设备 " + (editing ? "更新" : "添加")}
        visible={visible}
    >
        <p>请输入风力设备数据</p>
        <Form
            name="createWindEnergy"
            initialValues={(editing ? windEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="设备名称"
                name="windEnergyId"
                rules={[{required: true, message: '此字段必须填写。'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="效率 (%)"
                        name="efficiency"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <Input style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="高度（m）"
                        name="height"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"指定场地的纬度."}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Latitude"
                            name="latitude"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"指定站点的经度."}>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="风机半径（m）"
                        name="radius"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Tooltip placement={"right"}
                             title={"指定风力涡轮机的当前功率百分比."}>
                        <Form.Item
                            label="电流容量（%）"
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
    </Modal>)
});