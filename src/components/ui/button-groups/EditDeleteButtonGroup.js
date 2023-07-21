import {observer} from "mobx-react";
import {Button, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React from "react";

/**
 * Diese Komponente bildet eine Schaltflächen-Gruppe ab (Bearbeiten und Löschen Button)
 * @type {function(*): *}
 */
export const EditDeleteButtonGroup = observer((props) => {
    const {onEdit, onDelete, id, type} = props;

    return (
        <div>
            <Space size="middle">
                <Button onClick={() => onEdit(id, type)} type="primary"
                        icon={<EditOutlined/>}/>
                <Popconfirm
                    title="是否确实要删除附件？?"
                    onConfirm={() => (type !== null) ? onDelete(id, type) : onDelete(id)}
                    okText="是"
                    cancelText="否"
                >
                    <Button type="danger" icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </Space>
        </div>
    );
});