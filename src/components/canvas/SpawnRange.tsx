import { Image } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSpriteType } from "../../hooks/useSprite";
import { DEFAULT_SPAWN_RANGE, DEFAULT_SPAWN_TYPE, UNITY_SCALE } from "../../types/generic/Constants";

export default function SpawnRange() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSpriteType("util-dummy");

    const isSingular = (selectedElem?.properties.spawnType || DEFAULT_SPAWN_TYPE) !== "circle";
    const radius = isSingular ? 0 : (selectedElem?.properties.range ? selectedElem.properties.range : DEFAULT_SPAWN_RANGE);
    const playerCount = isSingular ? 1 : 15;
    const arr = new Array(playerCount).fill(0);

    if (!selectedElem || !selectedElem.type.startsWith("util-spawn"))
        return null;
    return (
        <>
            {arr.map((_, i) => {
                if (!sprite)
                    return null;

                const x = (Math.cos(2 * Math.PI * (i / playerCount) + (Math.PI / 2)) * radius + selectedElem.x) * UNITY_SCALE;
                const y = (Math.sin(2 * Math.PI * (i / playerCount) + (Math.PI / 2)) * radius - selectedElem.y) * UNITY_SCALE;
                const w = sprite.width;
                const h = sprite.height;

                return (
                    <Image
                        key={i}
                        opacity={0.3}
                        x={x - w / 2}
                        y={y - h / 2}
                        image={sprite}
                        width={w}
                        height={h}
                        listening={false}
                    />
                );
            })}
        </>
    );
}