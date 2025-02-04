import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useMapValue } from "../../hooks/jotai/useMap";

export default function SaveButton(props: { isButton?: boolean }) {
    const { t } = useTranslation();
    const map = useMapValue();

    const onSave = () => {
        const mapJSON = JSON.stringify(map);
        const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = map.name + ".lim";
        link.click();
    }

    return (
        <>
            <Tooltip2
                content={t("map.save") as string}
                position="bottom">

                <Button
                    minimal={props.isButton != true}
                    icon="floppy-disk"
                    intent={props.isButton ? "success" : undefined}
                    text={props.isButton ? t("map.save") : undefined}
                    style={{ margin: props.isButton ? 10 : 0 }}
                    onClick={onSave} />

            </Tooltip2>
        </>
    );
}