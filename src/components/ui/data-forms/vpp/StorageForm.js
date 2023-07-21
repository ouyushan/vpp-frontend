import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Speicheranlage ab
 * @type {function(*): *}
 */
export const StorageForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, storage} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>,
        ]}
        title={"储能设备 " + (editing ? "更新" : "添加")}
        visible={visible}
    >
        <p>请输入储能设备的数据</p>
        <Form
            name="createStorage"
            initialValues={(editing ? storage : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="设备名称"
                        name="storageId"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <Input style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="额定功率 (kWp)"
                        name="ratedPower"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col>
                        <Tooltip placement="left"
                                 title={"C速率是一个描述储能设备充电时间的值. " +
                                 "一小时等于1.0，两小时等于0.5."}>
                            <Form.Item
                                style={{marginRight: 16}}
                                label="C-Rate"
                                name="loadTimeHour"
                                rules={[{required: true, message: '此字段必须填写。'}]}
                            >
                                <InputNumber style={{width: 250}}/>
                            </Form.Item>
                        </Tooltip>
                    </Col>
                </Col>
                <Col>
                    <Tooltip placement="right"
                             title={"指示内存的当前状态。在0%时，内存系统为空，在100%时，内存体系为满."}>
                        <Form.Item
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