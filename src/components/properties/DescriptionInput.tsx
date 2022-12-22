import React from "react";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useElement from "../../hooks/jotai/useElements";
import { MaybeGUID } from "../../types/generic/GUID";

export default function DescriptionInput(props: { elementID: MaybeGUID }) {
    const { t } = useTranslation();
    const [element, setElement] = useElement(props.elementID);

    if (!element)
        return null;

    return (
        <ControlGroup fill style={{ marginTop: 5 }}>
            <InputGroup
                key={element.id + "-description"}
                fill
                leftIcon="info-sign"
                placeholder={t("task.defaultDescription") as string}
                defaultValue={element.properties.description}
                onBlur={(e) => {
                    setElement({ ...element, properties: { ...element.properties, description: e.currentTarget.value } });
                }}
            />
            <Button
                minimal
                rightIcon="cross"
                onClick={() => {
                    setElement({ ...element, properties: { ...element.properties, description: "" } });
                }}
            />
        </ControlGroup>
    )
}