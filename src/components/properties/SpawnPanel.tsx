import { AnchorButton, Button, ControlGroup, FormGroup, IconName, Menu, MenuDivider, MenuItem, NumericInput } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import { SPAWN_TYPES } from "../../types/au/AUElementDB";
import { DEFAULT_SPAWN_TYPE } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

const SpawnSelecter = Select2.ofType<string>();
const SpawnIcons: Record<typeof SPAWN_TYPES[number], IconName> = {
    "circle": "circle",
    "random": "random",
    "choice": "properties",
};

export default function SpawnPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const spawnPoints = useElementType(selectedElem?.type);

    const spawnTypeSelectRenderer: ItemRenderer<string> = (spawnType, props) => (
        <MenuItem2
            key={spawnType + "-type"}
            text={t(`spawn.${spawnType}`) as string}
            icon={SpawnIcons[spawnType]}
            label={spawnType}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem || !selectedElem.type.startsWith("util-spawn"))
        return null;

    const isSingular = (selectedElem.properties.spawnType || DEFAULT_SPAWN_TYPE) === "circle";

    return (
        <PanelContainer title={t("spawn.title") as string}>
            <ControlGroup>
                <SpawnSelecter
                    fill
                    filterable={false}
                    items={SPAWN_TYPES}
                    itemRenderer={spawnTypeSelectRenderer}
                    onItemSelect={(spawnType) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, spawnType: spawnType } });
                    }}
                    popoverProps={{ minimal: true }}>

                    <Button
                        rightIcon="caret-down"
                        text={t(`spawn.${selectedElem.properties.spawnType || DEFAULT_SPAWN_TYPE}`) as string}
                        icon={SpawnIcons[selectedElem.properties.spawnType || DEFAULT_SPAWN_TYPE]}
                        fill
                    />
                </SpawnSelecter>

                <Tooltip2
                    intent="primary"
                    content={t("spawn.globalInfo") as string}>
                    <AnchorButton
                        minimal
                        rightIcon="globe-network"
                        intent="primary"
                    />
                </Tooltip2>
            </ControlGroup>
            <Menu>
                {!isSingular && spawnPoints.map((spawnPoint) => (
                    <MenuItem2
                        key={spawnPoint.id}
                        text={spawnPoint.name}
                        icon="selection"
                        disabled
                    />
                ))}
            </Menu>
        </PanelContainer>
    );
}
