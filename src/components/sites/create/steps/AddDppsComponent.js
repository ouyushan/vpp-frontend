import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Popconfirm, Row, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';
import {CreateStepComponent} from "../../../ui/step/CreateStepComponent";
import {DppForm} from "../../../ui/data-forms/vpp/DppForm";

/**
 * Diese Komponente beinhaltet den Schritt, um DKs einem VK hinzuzufügen
 * @type {React.FunctionComponent<object>}
 */
const AddDppsComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const columns = [
        {
            title: '分布式电厂',
            dataIndex: 'decentralizedPowerPlantId',
            key: 'decentralizedPowerPlantId',
        },
    ];

    useEffect(() => {
        if (store.vppStore.creatingState.step !== 1) {
            if (store.vppStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.vppStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
            if (store.vppStore.creatingState.step === 3) {
                history.push("/erstellen/schritt-3")
            }
        } else {
            fetchDpps();
        }

    }, []);

    const onFinishCreateDpp = (record) => {
        store.vppStore.saveDpp(record, store.vppStore.creatingState.vppId).then((result) => {
            if (result.success) {
                store.vppStore.stepOneState.isAddingDpp = false;
                fetchDpps();
                enqueueSnackbar(result.message, {variant: result.variant})
            } else {
                enqueueSnackbar(result.message, {variant: result.variant})
            }
        });

    };

    const onCancelCreateDpp = () => {
        store.vppStore.stepOneState.isAddingDpp = false;
    };

    const onOpenAddDppModal = () => {
        store.vppStore.stepOneState.isAddingDpp = true;
    };

    const onForward = () => {
        store.vppStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.vppStore.resetCreatingState();
        enqueueSnackbar("流程已成功完成.", {variant: "success"});
        history.push('/bearbeiten');
    };

    const fetchDpps = () => {
        store.vppStore.getDppsByVpp(store.vppStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    return (
        <div className={'create-vpp'}>
            <CreateStepComponent currentStep={1}/>
            <h2 style={{marginTop: 32}}>步骤1：创建分布式电厂</h2>
            <p>虚拟电厂包含任意数量的分布式电厂。在该步骤中创建分布式电厂.</p>
            <Table dataSource={store.vppStore.dpps} columns={columns}/>

            <Row style={{marginTop: 16}}>
                <Col>
                    <Button onClick={onOpenAddDppModal} type="primary" icon={<PlusOutlined/>}>
                        创建分布式电厂
                    </Button>
                </Col>
            </Row>

            <Row style={{marginTop: 16}} justify="end">
                <Col>
                    <Popconfirm
                        title="你真的想结束这个过程吗？?"
                        onConfirm={onEnd}
                        onCancel={() => {
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <Button style={{marginRight: 8}}>
                            结束进程
                        </Button>
                    </Popconfirm>
                </Col>
                <Col>
                    <Button onClick={onForward} type="primary">
                        继续执行步骤2
                    </Button>
                </Col>
            </Row>


            <DppForm
                visible={store.vppStore.stepOneState.isAddingDpp}
                onFinish={onFinishCreateDpp}
                onCancel={onCancelCreateDpp}
                editing={false}
            />
        </div>

    );


});

export default AddDppsComponent;
