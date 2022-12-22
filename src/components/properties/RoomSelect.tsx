import { Button, ControlGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useElement from "../../hooks/jotai/useElements";
import { useElementType } from "../../hooks/jotai/useTypes";
import { MaybeGUID } from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";

const RoomSelecter = Select2.ofType<LIElement>();

export default function RoomSelect(props: { elementID: MaybeGUID, useDefault: boolean, useDataObj?: boolean }) {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [element, setElement] = useElement(props.elementID);

    const parentRoom = roomElems.find((e) => e.id === element?.properties.parent);
    const hasRooms = roomElems.length > 0;

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index + "-room"}
            text={elem.name.replace("\\n", " ")}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!element)
        return null;

    return (
        <ControlGroup fill>
            <RoomSelecter
                fill
                filterable={false}
                disabled={!hasRooms}
                items={roomElems}
                itemRenderer={roomSelectRenderer}
                onItemSelect={(room) => {
                    setElement({ ...element, properties: { ...element.properties, parent: room.id } });
                }}
                popoverProps={{ minimal: true }}>

                <Button
                    rightIcon="caret-down"
                    text={parentRoom ?
                        parentRoom.name.replace("\\n", " ") :
                        (props.useDefault ? t("room.default") : t("room.none"))}
                    style={{ fontStyle: parentRoom !== undefined ? "normal" : "italic" }}
                    fill
                />
            </RoomSelecter>
            {props.useDefault && (
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        setElement({ ...element, properties: { ...element.properties, parent: undefined } });
                    }}
                />
            )}
        </ControlGroup>
    )
}