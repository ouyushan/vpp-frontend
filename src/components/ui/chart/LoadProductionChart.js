import {Col, Row} from "antd";
import {Line} from "react-chartjs-2";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../store/RootStore";

/**
 * Diese Komponente bildet die Last- und Erzeugungsübersicht für eine Maßnahmenabfrage ab
 * @returns {*}
 * @constructor
 */
export const LoadProductionChart = () => {
    const store = useContext(RootStoreContext);
    const dashboardState = store.vppStore.dashboardState;

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <Row style={{marginTop: 32}}>
            <Col span={16}>
                <h3>Last-生产概述</h3>
                <Line data={{
                    labels: dashboardState.loadsLabels.slice(),
                    datasets: [{
                        label: dashboardState.selectedVppId + " Last [kW]",
                        data: dashboardState.loadsDataset.slice(),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        order: 1
                    }, {
                        label: dashboardState.selectedVppId + " 生产 [kW]",
                        data: dashboardState.productionsDataset.slice(),
                        fill: false,
                        borderColor: 'rgb(201, 161, 218)',
                        tension: 0.1,
                        order: 2
                    }, {
                        label: "能量过剩阈值 [kW]",
                        data: dashboardState.loadsDataset
                            .map((x) => x + dashboardState.selectedActionRequest.overflowThreshold)
                            .slice(),
                        fill: false,
                        borderColor: 'rgb(255, 0, 0)',
                        tension: 0.1,
                        order: 3
                    }, {
                        label: "能源瓶颈阈值 [kW]",
                        data: dashboardState.productionsDataset
                            .map((x) => x + dashboardState.selectedActionRequest.shortageThreshold)
                            .slice(),
                        fill: false,
                        borderColor: 'rgb(200, 0, 0)',
                        tension: 0.1,
                        order: 4
                    }
                    ]
                }} options={options}/>
            </Col>
        </Row>
    );
};