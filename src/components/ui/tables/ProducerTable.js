import {observer} from "mobx-react";
import {EditDeleteButtonGroup} from "../button-groups/EditDeleteButtonGroup";
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";

/**
 * Diese Komponente bildet die aktuellen Erzeugungsanlagen eines DK/Haushalts ab
 * @type {Function}
 */
export const ProducerTable = observer((props) => {

    const {onOpenCreate, onOpenEdit, onDelete, combine, dppOrHouseholdId} = props;

    const producerColumns = [
            {
                title: '发电设备',
                dataIndex: 'producerId',
                key: 'producerId',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作',
                key: 'actions',
                render: (record) => (
                    <EditDeleteButtonGroup
                        onEdit={onOpenEdit}
                        onDelete={onDelete}
                        id={record.producerId}
                        type={record.type}
                    />

                ),
            },
        ]
    ;

    return <div>
        <Table
            style={{marginTop: 16}}
            dataSource=
                {combine}
            columns={producerColumns}/>
        <Button onClick={() => onOpenCreate(dppOrHouseholdId)}
                type="primary"
                icon={<PlusOutlined/>}>
            添加发电设备
        </Button>
    </div>
});
