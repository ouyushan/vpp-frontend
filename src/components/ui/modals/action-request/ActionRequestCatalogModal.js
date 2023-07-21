import {Button, Modal, Table} from "antd";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet einen Handlungsmaßnahmenkatalog ab
 * @type {function(*): *}
 */
export const ActionRequestCatalogModal = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    const onCloseActionCatalog = () => {
        vppStore.dashboardState.isViewingActionCatalog = false;
        vppStore.dashboardState.selectedActionCatalog = {
            startTimestamp: undefined,
            endTimestamp: undefined,
            problemType: undefined,
            actions: []
        };

    };

    const timestampToLocalString = (timestamp) => {
        let date = new Date(0);
        date.setUTCSeconds(timestamp);
        return date.toLocaleString();
    };

    const ActionAlternatives = () => {
        if (vppStore.dashboardState.selectedActionCatalog) {
            if (vppStore.dashboardState.selectedActionCatalog.problemType === "OVERFLOW") {
                return <div>
                    <ul>
                        <li>将平均盈余投入公共网络</li>
                        <li>添加新的储能设备</li>
                    </ul>
                    <p style={{fontSize: 10}}>*不考虑当前操纵</p>
                </div>

            } else if (vppStore.dashboardState.selectedActionCatalog.problemType === "SHORTAGE") {
                return <div>
                    <ul>
                        <li>公共电网所需平均能量的转移</li>
                        <li>增加新一代工厂</li>
                    </ul>

                    <p style={{fontSize: 10}}>*不考虑当前操纵</p>
                </div>
            }
        }
    };

    const getProblemType = (type) => {
        if (type === "SHORTAGE") {
            return "Energieengpass";
        } else if (type === "OVERFLOW") {
            return "Energieüberschuss";
        } else {
            return null;
        }
    };

    return (<Modal
        closable={false}
        width={1000}
        title={
            <div
                style={{
                    width: '100%',
                    cursor: 'move',
                }}
                onFocus={() => {
                }}
                onBlur={() => {
                }}
            >
                行动建议目录
            </div>
        }
        visible={vppStore.dashboardState.isViewingActionCatalog}
        footer={[
            <Button key="back" onClick={onCloseActionCatalog}>
                取消
            </Button>
        ]}
    >
        <p>时期: {timestampToLocalString(vppStore.dashboardState.selectedActionCatalog.startTimestamp)} bis {timestampToLocalString(vppStore.dashboardState.selectedActionCatalog.endTimestamp)}</p>
        <p>问题类型: {getProblemType(vppStore.dashboardState.selectedActionCatalog.problemType)}</p>
        <p>平均的
            能源缺口: {vppStore.dashboardState.selectedActionCatalog.averageGap} kW</p>
        <h2>发电厂解决方案建议</h2>
        <Table pagination={{pageSize: 4}} size="small"
               dataSource={vppStore.dashboardState.selectedActionCatalog.actions.filter((action) => !action.isStorage).slice()}
               columns={[
                   {
                       title: '发电厂名称',
                       dataIndex: 'producerOrStorageId',
                       key: 'producerOrStorageId',
                   },
                   {
                       title: '建议的解决方案',
                       dataIndex: 'actionType',
                       key: 'actionType',
                       render: (value) => {
                           if (value === "PRODUCER_UP") {
                               return "Erzeugungsanlage hochfahren"
                           } else if (value === "PRODUCER_DOWN") {
                               return "Erzeugungsanlage runterfahren"
                           }
                       }
                   },
                   {
                       title: 'regelbare Energie',
                       dataIndex: 'actionValue',
                       key: 'actionValue',
                       render: (value) => {
                           return value + " kW"
                       }
                   }
               ]}/>

        <h2>通过储能设备提供解决方案的建议</h2>
        <Table pagination={{pageSize: 4}} size="small"
               dataSource={vppStore.dashboardState.selectedActionCatalog.actions.filter((action) => action.isStorage).slice()}
               columns={[
                   {
                       title: '发电厂名称',
                       dataIndex: 'producerOrStorageId',
                       key: 'producerOrStorageId',
                   },
                   {
                       title: '建议的解决方案',
                       dataIndex: 'actionType',
                       key: 'actionType',
                       render: (value) => {
                           if (value === "STORAGE_LOAD") {
                               return "Speicher aufladen"
                           } else if (value === "STORAGE_UNLOAD") {
                               return "Speicher entladen"
                           }
                       }
                   },
                   {
                       title: '可调节能量',
                       dataIndex: 'actionValue',
                       key: 'actionValue',
                       render: (value) => {
                           return value + " kW"
                       }
                   },
                   {
                       title: '可用装载时间',
                       dataIndex: 'hours',
                       key: 'hours',
                       render: (value) => {
                           return value + " Stunden*"
                       }
                   }
               ]}/>

        <h2>替代解决方案</h2>
        <p>如果上述解决方案不够，您可以实施:</p>
        {ActionAlternatives()}
    </Modal>);
});