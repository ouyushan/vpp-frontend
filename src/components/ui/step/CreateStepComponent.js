import {Steps} from "antd";
import React from "react";

/**
 * Diese Komponente bildet den aktuellen Schritt während des Hinzufügens eines VK
 * @param props
 * @returns {*}
 * @constructor
 */
export const CreateStepComponent = (props) => {
    const {Step} = Steps;
    return (
        <Steps style={{width: 1000, marginLeft: "auto", marginRight: "auto"}} size="small" current={props.currentStep}>
            <Step title="启动流程"/>
            <Step title="发电厂"/>
            <Step title="住户"/>
            <Step title="设备和机械加工"/>
        </Steps>
    );
};