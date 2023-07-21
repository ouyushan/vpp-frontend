import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Popconfirm, Row} from "antd";
import history from "../../../../history";
import {CreateStepComponent} from "../../../ui/step/CreateStepComponent";
import {EditVppForm} from "../../../ui/data-forms/vpp/EditVppForm";


/**
 * Diese Komponente beinhaltet den Schritt, um Erzeugungs- und Speicheranlagen einem VK hinzuzufügen
 * @type {React.FunctionComponent<object>}
 */
const AddProducerAndStorageComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        if (store.vppStore.creatingState.step !== 3) {
            if (store.vppStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.vppStore.creatingState.step === 1) {
                history.push("/erstellen/schritt-1")
            }
            if (store.vppStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
        }
    }, []);

    const onBack = () => {
        store.vppStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.vppStore.resetCreatingState();
        enqueueSnackbar("流程已成功完成.", {variant: "success"});
        history.push('/bearbeiten');
    };

    return (
        <div className={'create-vpp'}>
            <CreateStepComponent currentStep={3}/>
            <h2 style={{marginTop: 32}}>第3步：新建发电和储能设备</h2>
            <p>在这一步中，在已创建好的分布式电厂和住户中创建发电和储能设备</p>

            <EditVppForm state={store.vppStore.creatingState}/>

            <Row style={{marginTop: 16}} justify="end">
                <Col>
                    <Button style={{marginRight: 8}} onClick={onBack} type="primary">
                        返回步骤3
                    </Button>
                </Col>
                <Col>
                    <Popconfirm
                        title="你真的想结束这个过程吗？?"
                        onConfirm={onEnd}
                        onCancel={() => {
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <Button type="primary">
                            完整流程
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
        </div>

    );
});
export default AddProducerAndStorageComponent;
