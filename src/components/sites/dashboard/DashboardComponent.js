import React, {useContext, useEffect} from "react";

import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Alert, Button, Col, Row} from "antd";
import {ActionRequestMenuModal} from "../../ui/modals/action-request/ActionRequestMenuModal";
import {ActionRequestForm} from "../../ui/data-forms/action-request/ActionRequestForm";
import {ProducerManipulationForm} from "../../ui/data-forms/action-manipulation/ProducerManipulationForm";
import {StorageManipulationForm} from "../../ui/data-forms/action-manipulation/StorageManipulationForm";
import {GridManipulationForm} from "../../ui/data-forms/action-manipulation/GridManipulationForm";
import {ActionRequestCallModal} from "../../ui/modals/action-request/ActionRequestCallModal";
import {ActionRequestCatalogModal} from "../../ui/modals/action-request/ActionRequestCatalogModal";
import {ActionRequestComponent} from "./ActionRequestComponent";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Dashboard Webseite ab
 * @type {Function}
 */
const DashboardComponent = observer(() => {

    const {enqueueSnackbar} = useSnackbar();
    const vppStore = useContext(RootStoreContext).vppStore;

    const onSelectVpp = (vppId) => {
        vppStore.dashboardState.selectedVppId = vppId;
        vppStore.dashboardState.isLoadingOrAddingRequest = true;
    };

    useEffect(() => {
        vppStore.getAllActiveVppsAction().then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        );
    }, []);


    if (vppStore.isLoading) {
        return null;
    } else if (vppStore.activeVpps.length > 0) {
        return (

            <div className="app">
                <h2>Dashboard</h2>
                <Row style={{marginTop: 16, marginBottom: 16}}>
                    <Col>
                        <Alert
                            description={"如果您想要的虚拟电厂没有列出，您应该检查“已发布”状态。您可以在“编辑虚拟电厂”网站上编辑此状态."}/>
                    </Col>
                </Row>
                {vppStore.activeVpps.map((vpp) => {
                    return <Button
                        onClick={() => onSelectVpp(vpp.virtualPowerPlantId)}>{vpp.virtualPowerPlantId}</Button>
                })}

                <ActionRequestMenuModal/>
                <ActionRequestForm/>

                <ProducerManipulationForm/>
                <StorageManipulationForm/>
                <GridManipulationForm/>

                <ActionRequestCallModal/>


                <ActionRequestComponent/>
                <ActionRequestCatalogModal/>
            </div>
        );
    } else {
        return (
            <div className="app">
                <h1>仪表盘</h1>
                <Row>
                    <Col>
                        <Alert
                            description={"找不到任何已发布的虚拟电厂。请创建虚拟电厂或发布现有电厂."}/>
                    </Col>
                </Row>
            </div>
        );
    }


});

export default DashboardComponent;
