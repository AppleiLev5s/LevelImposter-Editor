import { Button, ControlGroup, Divider, FormGroup, H5, InputGroup, MenuItem, NumericInput, Switch } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useRooms } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

const RoomSelect = Select2.ofType<LIElement>();

export default function TaskPanel() {
    const roomElems = useRooms();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [taskName, setTaskName] = React.useState("");

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setTaskName(auElement ? auElement.name : "");
    }, [selectedElem]);

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem
        || !selectedElem.type.startsWith("task"))
        return null;

    return (
        <div className="task-panel">
            <H5 style={{ marginTop: 25 }}>Task</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={URL_PREFIX + selectedElem.type + URL_SUFFIX}
                    alt={selectedElem.name}
                />
                <H5 style={{ marginBottom: 3 }}>{taskName}</H5>
                <p className="bp4-text-muted">{selectedElem.type}</p>
            </div>
            <FormGroup>
                <ControlGroup fill>
                    <RoomSelect
                        fill
                        filterable={false}
                        items={roomElems}
                        itemRenderer={roomSelectRenderer}
                        onItemSelect={(room) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: room.id } });
                        }}>

                        <Button
                            rightIcon="caret-down"
                            text={parentRoom ? parentRoom.name : "(Default Room)"}
                            fill
                        />
                    </RoomSelect>
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: undefined } });
                        }}
                    />
                </ControlGroup>
                <ControlGroup fill style={{ marginTop: 5 }}>
                    <InputGroup
                        fill
                        leftIcon="info-sign"
                        placeholder={"(Default Description)"}
                        value={selectedElem.properties.description}
                        onChange={(e) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: e.currentTarget.value } });
                        }}
                    />
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: "" } });
                        }}
                    />
                </ControlGroup>
            </FormGroup>
        </div>
    );
}
