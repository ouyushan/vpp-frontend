import {Button, Col, DatePicker, Form, InputNumber, Modal, Row, Select, Table, Tooltip} from "antd/lib/index";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";
import {useSnackbar} from "notistack";
import moment from "moment";

/**
 * Diese Komponente bildet die Eingabemaske für eine Erzeugungsmanipulation ab
 * @type {function(): *}
 */
export const ProducerManipulationForm = observer((props) => {

    const vppStore = useContext(RootStoreContext).vppStore;
    const {enqueueSnackbar} = useSnackbar();

    const {Option} = Select;

    const combineProducers = () => {
        let output = [];
        vppStore.dpps.forEach((dpp) => {
            if (dpp.solars) {
                dpp.solars.forEach((solar) => {
                    output.push({
                        key: solar.solarEnergyId,
                        producerId: solar.solarEnergyId,
                        type: "SOLAR",
                        capacity: solar.capacity
                    });
                });
            }
            if (dpp.waters) {
                dpp.waters.forEach((water) => {
                    output.push({
                        key: water.waterEnergyId,
                        producerId: water.waterEnergyId,
                        type: "WATER",
                        capacity: water.capacity
                    });
                });
            }
            if (dpp.winds) {
                dpp.winds.forEach((wind) => {
                    output.push({
                        key: wind.windEnergyId,
                        producerId: wind.windEnergyId,
                        type: "WIND",
                        capacity: wind.capacity
                    });
                });
            }
            if (dpp.others) {
                dpp.others.forEach((other) => {
                    output.push({
                        key: other.otherEnergyId,
                        producerId: other.otherEnergyId,
                        type: "OTHER",
                        capacity: other.capacity
                    });
                });
            }
        }, this);
        vppStore.households.forEach((household) => {
            if (household.solars) {
                household.solars.forEach((solar) => {
                    output.push({
                        key: solar.solarEnergyId,
                        producerId: solar.solarEnergyId,
                        type: "SOLAR",
                        capacity: solar.capacity
                    });
                });
            }
            if (household.waters) {
                household.waters.forEach((water) => {
                    output.push({
                        key: water.waterEnergyId,
                        producerId: water.waterEnergyId,
                        type: "WATER",
                        capacity: water.capacity
                    });
                });
            }
            if (household.winds) {
                household.winds.forEach((wind) => {
                    output.push({
                        key: wind.windEnergyId,
                        producerId: wind.windEnergyId,
                        type: "WIND",
                        capacity: wind.capacity
                    });
                });
            }
            if (household.others) {
                household.others.forEach((other) => {
                    output.push({
                        key: other.otherEnergyId,
                        producerId: other.otherEnergyId,
                        type: "OTHER",
                        capacity: other.capacity
                    });
                });
            }
        }, this);
        return output;
    };

    function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
        if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
        if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
        if (b_start < a_start && a_end < b_end) return true; // a in b
        return false;
    }

    const checkAndAddProducerManipulation = (record) => {
        let exists = false;

        if (record.startTimestamp > record.endTimestamp) {
            enqueueSnackbar("开始时间戳不能大于结束时间戳.", {variant: "error"});
        } else {
            vppStore.dashboardState.addingActionRequest.producerManipulations.forEach((manipulation) => {
                if (dateRangeOverlaps(manipulation.startTimestamp, manipulation.endTimestamp, record.startTimestamp, record.endTimestamp) &&
                    manipulation.producerId === record.producerId) {
                    enqueueSnackbar("时间戳不得与现有操作重叠.", {variant: "error"});
                    exists = true;
                }
            });

            if (!exists) {
                vppStore.dashboardState.addingActionRequest.producerManipulations.push(
                    record
                );
                enqueueSnackbar("操作已成功插入.", {variant: "success"});
                onCancelProducerManipulation()
            }
        }

    };

    const checkAndRemoveDuplicateProducerManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.producerManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.producerManipulations[i].producerId === record.producerId &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.producerManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onFinishProducerManipulation = (record) => {
        if (vppStore.dashboardState.addingProducerManipulation.producerId) {
            if (vppStore.dashboardState.isAddingProducerManipulation) {
                vppStore.dashboardState.addingProducerManipulation.startTimestamp =
                    Math.round(Date.parse(record.startTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingProducerManipulation.endTimestamp =
                    Math.round(Date.parse(record.endTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingProducerManipulation.type = record.type;
                vppStore.dashboardState.addingProducerManipulation.capacity = record.capacity;
                checkAndAddProducerManipulation(vppStore.dashboardState.addingProducerManipulation);
            } else if (vppStore.dashboardState.isEditingProducerManipulation) {
                vppStore.dashboardState.addingProducerManipulation.type = record.type;
                vppStore.dashboardState.addingProducerManipulation.capacity = record.capacity;
                checkAndRemoveDuplicateProducerManipulation(vppStore.dashboardState.addingProducerManipulation);
                vppStore.dashboardState.addingActionRequest.producerManipulations.push(vppStore.dashboardState.addingProducerManipulation);
                enqueueSnackbar("操作已成功处理.", {variant: "success"});
                onCancelProducerManipulation()
            }

        } else {
            enqueueSnackbar("请从表中选择一个附件.", {variant: "error"})
        }
    };

    const onCancelProducerManipulation = () => {
        vppStore.dashboardState.isAddingProducerManipulation = false;
        vppStore.dashboardState.isEditingProducerManipulation = false;
        vppStore.resetAddingProducerManipulation();
    };

    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="添加生成操作"
        visible={vppStore.dashboardState.isAddingProducerManipulation ||
        vppStore.dashboardState.isEditingProducerManipulation}
        footer={[
            <Button key="back" onClick={onCancelProducerManipulation}>
                取消
            </Button>
        ]}
        width={1000}
    >
        <Form
            name="createProducerManipulation"
            initialValues={
                vppStore.dashboardState.isEditingProducerManipulation
                    ? Object.assign({}, {
                        startTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingProducerManipulation.startTimestamp);
                            return moment(date);
                        })(),
                        endTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingProducerManipulation.endTimestamp);
                            return moment(date);
                        })(),
                        producerId: vppStore.dashboardState.addingProducerManipulation.producerId,
                        type: vppStore.dashboardState.addingProducerManipulation.type,
                        capacity: vppStore.dashboardState.addingProducerManipulation.capacity
                    })
                    : {remember: false}
            }
            onFinish={onFinishProducerManipulation}
            layout="vertical"
        >
            <Row>
                <Col>
                    <Form.Item
                        label="Startzeitstempel"
                        name="startTimestamp"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                        style={{marginRight: 16}}
                    >

                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Start"
                            disabled={vppStore.dashboardState.isEditingProducerManipulation}
                        />


                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="结束时间"
                        name="endTimestamp"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                    >

                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="End"
                            disabled={vppStore.dashboardState.isEditingProducerManipulation}
                        />


                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Item
                        label="操作类型"
                        name="type"
                        rules={[{required: true, message: '此字段必须填写。'}]}
                        style={{marginRight: 16}}
                    >
                        <Select
                            style={{width: 250}}
                            showSearch
                            placeholder="操作类型"
                            optionFilterProp="children"
                        >
                            <Option value="PRODUCER_UP">Hochfahren</Option>
                            <Option value="PRODUCER_DOWN">Runterfahren</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Tooltip placement={"right"}
                             title={"指定系统应启动/关闭的百分比." +
                             " 如果当前容量为100%，并且您希望将其减少20%，则模拟容量为80%."}>
                        <Form.Item
                            label="容量变化"
                            name="capacity"
                            rules={[{required: true, message: '此字段必须填写。'}]}
                        >
                            <InputNumber
                                style={{width: 250}}
                                placeholder="容量操作"/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>

            <h2>可用的安装</h2>
            <Table
                disabled={vppStore.dashboardState.isEditingProducerManipulation}
                rowSelection={{
                    type: "radio",
                    selectedRowKeys: vppStore.dashboardState.selectedProducer,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        vppStore.dashboardState.selectedProducer = selectedRows.map(row => row.producerId);
                        if (selectedRows.length === 1) {
                            vppStore.dashboardState.addingProducerManipulation.producerId = selectedRows[0].producerId;
                        }
                    },
                    getCheckboxProps: (record) => ({
                        disabled: vppStore.dashboardState.isEditingProducerManipulation, // Column configuration not to be checked
                    }),
                }}
                columns={
                    [{
                        title: '发电厂',
                        dataIndex: 'producerId',
                        key: 'producerId',
                    },
                        {
                            title: '类型',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: '容量',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                    ]}
                dataSource={combineProducers()}
            />

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Manipulation hinzufügen
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});