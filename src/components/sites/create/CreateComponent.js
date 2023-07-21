import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Form, Input, Row} from "antd";
import history from "../../../history";

/**
 * Diese Komponente startet den Prozess für die Erstellung eines VK
 * @type {React.FunctionComponent<object>}
 */
const CreateComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        if (store.vppStore.creatingState.isCreating) {
            //redirect to right step and state
            if (store.vppStore.creatingState.step !== 0) {
                if (store.vppStore.creatingState.step === 1) {
                    history.push("/erstellen/schritt-1")
                }
                if (store.vppStore.creatingState.step === 2) {
                    history.push("/erstellen/schritt-2")
                }
                if (store.vppStore.creatingState.step === 3) {
                    history.push("/erstellen/schritt-3")
                }
            }
        }
    }, []);

    let onFinish = (values) => {
        let virtualPowerPlantId = values.virtualPowerPlantId;
        if (virtualPowerPlantId !== "" && virtualPowerPlantId.length > 3) {
            let dto = {
                virtualPowerPlantId: virtualPowerPlantId
            };
            store.vppStore.saveVpp(dto).then((result) => {
                if (result.success) {
                    store.vppStore.creatingState.step = 1;
                    history.push('/erstellen/schritt-1');
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            })
        } else {
            enqueueSnackbar("虚拟电厂名称必须至少包含4个字符.", {variant: "error"})
        }
    };

    return (
        <div className={'create-vpp'}>
            <h2>创建虚拟电厂</h2>
            <p>请为新的虚拟电厂选择一个名称，并确认流程周围的开始按钮.</p>
            <Row>
                <Col span={12}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="虚拟电厂名称"
                            name="virtualPowerPlantId"
                            rules={[{
                                required: true,
                                message: '此字段必须填写。'
                            }]}
                        >
                            <Input style={{width: 250}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                启动流程
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );


});

export default CreateComponent;
