import {Button, Modal} from "antd/lib/index";
import React, {useContext} from "react";
import {useSnackbar} from "notistack";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";

/**
 * In dieser Komponente wird abgefragt, ob eine neue oder bestehende Maßnahmenabfrage angefragt werden soll
 * @type {function(*): *}
 */
export const ActionRequestMenuModal = observer(() => {
    const {enqueueSnackbar} = useSnackbar();

    const vppStore = useContext(RootStoreContext).vppStore;

    const cancelRequest = () => {
        vppStore.dashboardState.isLoadingOrAddingRequest = false;
    };

    const onRequest = () => {
        vppStore.dashboardState.isAddingRequest = true;
    };

    const onOpenLoadRequestModal = () => {
        //load exist requests here
        if (vppStore.dashboardState.selectedVppId) {
            vppStore.getAllActionRequestsByVppId(vppStore.dashboardState.selectedVppId).then(
                (result) => {
                    if (result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        vppStore.dashboardState.isLoadingRequest = true;
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        vppStore.dashboardState.isLoadingOrAddingRequest = false;
                        vppStore.dashboardState.isLoadingRequest = false;
                    }
                }
            );
        }

    };

    return (
        <Modal
            closable={false}
            title="措施调查"
            visible={vppStore.dashboardState.isLoadingOrAddingRequest}
            footer={[
                <Button key="submit" type="primary" onClick={onRequest}>
                    Neue Abfrage
                </Button>,
                <Button type="primary" onClick={onOpenLoadRequestModal}>
                    Abfrage laden
                </Button>,
                <Button key="back" onClick={cancelRequest}>
                    取消
                </Button>
            ]}
        >
            <p>当制定新的测量调查时，将生成24小时负荷和发电量预测。
                为所选择的虚拟电厂生成。为此，负荷和发电之间的差异认可和目录形式的行动建议.</p>
            <p>您想创建新请求还是加载以前的请求？</p>
        </Modal>
    )
});
