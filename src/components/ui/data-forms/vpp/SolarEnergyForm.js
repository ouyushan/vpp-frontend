import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Solaranlage ab
 * @type {function(*): *}
 */
export const SolarEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, solarEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>,
        ]}
        title={"光伏 " + (editing ? "更新" : "添加")}
        visible={visible}
    >
        <p>请输入光伏数据</p>
        <Form
            name="createSolarEnergy"
            initialValues={(editing ? solarEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="设备名称"
                name="solarEnergyId"
                rules={[{required: true, message: '此字段必须填写。'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"表示屋顶的坡度（以度为单位）."}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="倾斜（度）"
                            name="slope"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <Input style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"}
                             title={"指定在标准条件下测试的额定功率."}>
                        <Form.Item
                            label="额定功率 (kWp)"
                            name="ratedCapacity"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
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
                    <Tooltip placement={"left"}
                             title={"指示系统相对于基本方向的方向（以度为单位）."}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="方向（度）"
                            name="alignment"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"指定设备的当前功率百分比."}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="容量 (%)"
                            name="capacity"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <Slider style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {editing ? "更新" : "添加"}
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});