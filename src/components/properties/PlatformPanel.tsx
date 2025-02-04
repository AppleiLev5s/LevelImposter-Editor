import { ControlGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_PLATFORM_ENTER, DEFAULT_PLATFORM_EXIT, DEFAULT_PLATFORM_OFFSET } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function PlatformPanel() {
    const { t } = useTranslation();
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-platform")
        return null;

    return (
        <PanelContainer title={t("platform.title") as string}>
            <FormGroup label={t("platform.movement") as string}>
                <ControlGroup fill>
                    <NumericInput
                        key={element.id + "-platformXOffset"}
                        fill
                        defaultValue={element.properties.platformXOffset === undefined ? DEFAULT_PLATFORM_OFFSET : element.properties.platformXOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformXOffset: val } });
                        }} />
                    <NumericInput
                        key={element.id + "-platformYOffset"}
                        fill
                        defaultValue={element.properties.platformYOffset === undefined ? 0 : element.properties.platformYOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformYOffset: val } });
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label={t("platform.enterOffset") as string}>
                <ControlGroup fill>
                    <NumericInput
                        key={element.id + "-platformXEnterOffset"}
                        fill
                        defaultValue={element.properties.platformXEntranceOffset === undefined ? DEFAULT_PLATFORM_ENTER : element.properties.platformXEntranceOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformXEntranceOffset: val } });
                        }} />
                    <NumericInput
                        key={element.id + "-platformYEnterOffset"}
                        fill
                        defaultValue={element.properties.platformYEntranceOffset === undefined ? 0 : element.properties.platformYEntranceOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformYEntranceOffset: val } });
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label={t("platform.exitOffset") as string}>
                <ControlGroup fill>
                    <NumericInput
                        key={element.id + "-platformXExitOffset"}
                        fill
                        defaultValue={element.properties.platformXExitOffset === undefined ? DEFAULT_PLATFORM_EXIT : element.properties.platformXExitOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformXExitOffset: val } });
                        }} />
                    <NumericInput
                        key={element.id + "-platformYExitOffset"}
                        fill
                        defaultValue={element.properties.platformYExitOffset === undefined ? 0 : element.properties.platformYExitOffset}
                        minorStepSize={0.1}
                        stepSize={0.5}
                        majorStepSize={1}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, platformYExitOffset: val } });
                        }} />
                </ControlGroup>
            </FormGroup>
        </PanelContainer>
    );
}
