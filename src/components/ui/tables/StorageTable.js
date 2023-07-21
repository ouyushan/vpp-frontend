import {observer} from "mobx-react";
import {EditDeleteButtonGroup} from "../button-groups/EditDeleteButtonGroup";
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";

/**
 * Diese Komponente bildet die aktuellen Speicheranlagen eines DK/Haushalts ab
 * @type {Function}
 */
export const StorageTable = observer((props) => {

    const {onOpenCreate, onOpenEdit, onDelete, combine, dppOrHouseholdId} = props;


    const storageColumns = [
        {
            title: '储能设备',
            dataIndex: 'storageId',
            key: 'storageId',
        },
        {
            title: '操作',
            key: 'actions',
            render: (record) => (
                <EditDeleteButtonGroup
                    onEdit={onOpenEdit}
                    onDelete={onDelete}
                    id={record.storageId}
                />
            ),
        },
    ];

    return <div>
        <Table
            style={{marginTop: 16}}
            dataSource=
                {combine}

            columns={storageColumns}/>
        <Button onClick={(e) => onOpenCreate(dppOrHouseholdId)}
                type="primary"
                icon={<PlusOutlined/>}>
            添加储能设备
        </Button>
    </div>
});
