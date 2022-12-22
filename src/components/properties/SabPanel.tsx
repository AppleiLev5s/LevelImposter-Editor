import { H5 } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedData from "../../hooks/jotai/useDataObj";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import { useSpriteType } from "../../hooks/useSprite";
import DescriptionInput from "./DescriptionInput";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

export default function SabPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const sprite = useSpriteType(selectedElem?.type);
    const roomElems = useElementType("util-room");
    const [sabData, setSabData] = useSelectedData();

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    if (!selectedElem
        || !selectedElem.type.startsWith("sab-")
        || sabData === undefined)
        return null;

    return (
        <>
            <PanelContainer title={t("sab.title") as string}>
                <div style={{ textAlign: "center", margin: 15 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={sprite?.src}
                        alt={selectedElem.name}
                    />
                    <H5 style={{ marginBottom: 3 }}>
                        {t(`au.${sabData?.type}`)}
                    </H5>
                    <p className="bp4-text-muted">
                        {selectedElem.type}
                    </p>
                </div>
                <RoomSelect
                    elementID={sabData.id}
                    useDefault={true}
                />
                <DescriptionInput
                    elementID={sabData.id}
                />
            </PanelContainer>

            <MapError isVisible={parentRoom === undefined}>
                {t("sab.errorNoRoom") as string}
            </MapError>
        </>
    );
}
