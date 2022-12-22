import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";

export default function DescriptionInput() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem)
        return null;

    return (
        <ControlGroup fill style={{ marginTop: 5 }}>
            <InputGroup
                key={selectedElem.id + "-description"}
                fill
                leftIcon="info-sign"
                placeholder={t("task.defaultDescription") as string}
                defaultValue={selectedElem.properties.description ? selectedElem.properties.description : ""}
                onBlur={(e) => {
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
    )
}