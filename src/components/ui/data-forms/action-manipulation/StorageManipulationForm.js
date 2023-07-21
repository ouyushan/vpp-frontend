import {Button, Col, DatePicker, Form, Modal, Row, Select, Table} from "antd/lib/index";
import React, {useContext} from "react";
import {useSnackbar} from "notistack";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";
import moment from "moment";

/**
 * Diese Komponente bildet die Eingabemaske für eine Speichermanipulation ab
 * @type {function(): *}
 */
export const StorageManipulationForm = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;
    const {enqueueSnackbar} = useSnackbar();

    const {Option} = Select;

    const combineStorages = () => {
        let output = [];
        vppStore.dpps.forEach((dpp) => {
            if (dpp.storages) {
                dpp.storages.forEach((storage) => {
                    output.push({
                        key: storage.storageId,
                        storageId: storage.storageId,
                        ratedPower: storage.ratedPower,
                        capacity: storage.capacity
                    });
                });
            }
        }, this);
        vppStore.households.forEach((household) => {
            if (household.storages) {
                household.storages.forEach((storage) => {
                    output.push({
                        key: storage.storageId,
                        storageId: storage.storageId,
                        ratedPower: storage.ratedPower,
                        capacity: storage.capacity
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

    const checkAndAddStorageManipulation = (record) => {
        let exists = false;

        if (record.startTimestamp > record.endTimestamp) {
            enqueueSnackbar("开始时间戳不能大于结束时间戳.", {variant: "error"});
        } else {
            vppStore.dashboardState.addingActionRequest.storageManipulations.forEach((manipulation) => {
                if (dateRangeOverlaps(manipulation.startTimestamp, manipulation.endTimestamp, record.startTimestamp, record.endTimestamp) &&
                    manipulation.storageId === record.storageId) {
                    enqueueSnackbar("时间戳不得与现有操作重叠.", {variant: "error"});
                    exists = true;
                }
            });

            if (!exists) {
                vppStore.dashboardState.addingActionRequest.storageManipulations.push(
                    record
                );
                enqueueSnackbar("操作已成功插入.", {variant: "success"});
                onCancelStorageManipulation()
            }
        }
    };

    const checkAndRemoveDuplicateStorageManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.storageManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.storageManipulations[i].storageId === record.storageId &&
                vppStore.dashboardState.addingActionRequest.storageManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.storageManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.storageManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onFinishStorageManipulation = (record) => {
        if (vppStore.dashboardState.addingStorageManipulation.storageId) {
            if (vppStore.dashboardState.isAddingStorageManipulation) {

                vppStore.dashboardState.addingStorageManipulation.startTimestamp =
                    Math.round(Date.parse(record.startTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingStorageManipulation.endTimestamp =
                    Math.round(Date.parse(record.endTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingStorageManipulation.type = record.type;
                checkAndAddStorageManipulation(vppStore.dashboardState.addingStorageManipulation)

            } else if (vppStore.dashboardState.isEditingStorageManipulation) {
                vppStore.dashboardState.addingStorageManipulation.type = record.type;
                checkAndRemoveDuplicateStorageManipulation(vppStore.dashboardState.addingActionRequest);
                vppStore.dashboardState.addingActionRequest.storageManipulations.push(vppStore.dashboardState.addingStorageManipulation);
                enqueueSnackbar("操作已成功处理.", {variant: "success"});
                onCancelStorageManipulation()
            }
        } else {
            enqueueSnackbar("请从表中选择一个附件.", {variant: "error"})
        }
    };

    const onCancelStorageManipulation = () => {
        vppStore.dashboardState.isAddingStorageManipulation = false;
        vppStore.dashboardState.isEditingStorageManipulation = false;
        vppStore.resetAddingStorageManipulation();
    };

    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="添加储能操作"
        visible={vppStore.dashboardState.isAddingStorageManipulation || vppStore.dashboardState.isEditingStorageManipulation}
        footer={[
            <Button key="back" onClick={onCancelStorageManipulation}>
                取消
            </Button>
        ]}
        width={1000}
    >
        <Form
            name="createStorageManipulation"
            initialValues={
                vppStore.dashboardState.isEditingStorageManipulation
                    ? Object.assign({}, {
                        startTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingStorageManipulation.startTimestamp);
                            return moment(date);
                        })(),
                        endTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingStorageManipulation.endTimestamp);
                            return moment(date);
                        })(),
                        storageId: vppStore.dashboardState.addingStorageManipulation.storageId,
                        type: vppStore.dashboardState.addingStorageManipulation.type
                    })
                    : {remember: false}
            }
            onFinish={onFinishStorageManipulation}
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
                            disabled={vppStore.dashboardState.isEditingStorageManipulation}
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
                            disabled={vppStore.dashboardState.isEditingStorageManipulation}
                        />
                    </Form.Item>
                </Col>
            </Row>
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
                    <Option value="STORAGE_LOAD">Laden</Option>
                    <Option value="STORAGE_UNLOAD">Entladen</Option>
                </Select>
            </Form.Item>

            <Table
                rowSelection={{
                    type: "radio",
                    selectedRowKeys: vppStore.dashboardState.selectedStorages,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        vppStore.dashboardState.selectedStorages = selectedRows.map(row => row.storageId);
                        if (selectedRows.length === 1) {
                            vppStore.dashboardState.addingStorageManipulation.storageId = selectedRows[0].storageId;
                        }
                    },
                    getCheckboxProps: (record) => ({
                        disabled: vppStore.dashboardState.isEditingStorageManipulation, // Column configuration not to be checked
                    }),
                }}
                columns={
                    [{
                        title: '储能设备',
                        dataIndex: 'storageId',
                        key: 'storageId',
                    },
                        {
                            title: '额定功率',
                            dataIndex: 'ratedPower',
                            key: 'ratedPower',
                        },
                        {
                            title: '容量',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                    ]}
                dataSource={combineStorages()}
            />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Manipulation hinzufügen
                </Button>
            </Form.Item>
        </Form>

    </Modal>)
});