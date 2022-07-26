import { Button, ButtonGroup, ControlGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { useRemoveElement } from "../../hooks/jotai/useElement";
import useSelectedElem, { useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";
import PanelContainer from "./PanelContainer";

export default function TransformPanel() {
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem)
        return null;

    return (
        <PanelContainer title="Transform">
            <InputGroup
                key={selectedElem.id + "-name"}
                defaultValue={selectedElem.name}
                placeholder="Name"
                large
                onChange={(e) => { setSelectedElem({ ...selectedElem, name: e.target.value }); }}
            />
            <ControlGroup fill style={{ marginTop: 15 }}>
                <NumericInput
                    key={selectedElem.id + "-x"}
                    defaultValue={selectedElem.x}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, x: val }); }}
                    fill
                    placeholder="X"
                    minorStepSize={0.001}
                />
                <NumericInput
                    key={selectedElem.id + "-y"}
                    defaultValue={selectedElem.y}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, y: val }); }}
                    fill
                    placeholder="Y"
                    minorStepSize={0.001}
                />
                <NumericInput
                    key={selectedElem.id + "-z"}
                    defaultValue={selectedElem.z}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, z: val }); }}
                    fill
                    placeholder="Z"
                    minorStepSize={0.001}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    key={selectedElem.id + "-xScale"}
                    defaultValue={selectedElem.xScale}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, xScale: val }); }}
                    fill
                    leftIcon="arrows-horizontal"
                    placeholder="X Scale"
                    minorStepSize={0.001}
                />
                <NumericInput
                    key={selectedElem.id + "-yScale"}
                    defaultValue={selectedElem.yScale}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, yScale: val }); }}
                    fill
                    leftIcon="arrows-vertical"
                    placeholder="Y Scale"
                    minorStepSize={0.001}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    key={selectedElem.id + "-rotation"}
                    defaultValue={selectedElem.rotation}
                    onValueChange={(val) => { !isNaN(val) && setSelectedElem({ ...selectedElem, rotation: val }); }}
                    fill
                    leftIcon="refresh"
                    placeholder="Rotation"
                    minorStepSize={0.001}
                />
            </ControlGroup>
            <ButtonGroup minimal style={{ marginTop: 10 }} fill>
                <Button
                    fill
                    icon={selectedElem.properties.isLocked ? "lock" : "unlock"}
                    text={selectedElem.properties.isLocked ? "Unlock" : "Lock"}
                    onClick={() => { setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, isLocked: !selectedElem.properties.isLocked } }); }}
                />
                <Button
                    fill
                    icon="trash"
                    text="Remove"
                    onClick={() => { removeElement(selectedElem.id); setSelectedID("" as GUID) }}
                />
            </ButtonGroup>
        </PanelContainer>
    );
}
