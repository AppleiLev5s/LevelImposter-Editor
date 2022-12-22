import React from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";
import generateGUID from "../generateGUID";
import { elementFamilyAtom, useAddElement } from "./useElements";
import { saveHistoryAtom } from "./useHistory";
import { elementsAtom } from "./useMap";
import useSelectedElem, { selectedElementAtom, useSelectedElemValue } from "./useSelectedElem";
import { atomFamily } from "jotai/utils";

export const DATA_TYPES = {
    "sab-reactorleft": "data-sabreactor",
    "sab-reactorright": "data-sabreactor",
    "sab-btnreactor": "data-sabreactor",
    "sab-comms": "data-sabcomms",
    "sab-btncomms": "data-sabcomms",
    "sab-electric": "data-sablights",
    "sab-btnlights": "data-sablights",
    "sab-btnoxygen": "data-saboxygen",
    "sab-oxygen1": "data-saboxygen",
    "sab-oxygen2": "data-saboxygen",
};

export const selectedDataAtom = atom((get) => {
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return undefined;

    const dataType = DATA_TYPES[selectedElem.type as keyof typeof DATA_TYPES];
    if (!dataType)
        return undefined;

    const elements = get(elementsAtom);
    const dataObj = elements.find(elem => elem.type === dataType);

    if (dataObj)
        return dataObj;
}, (get, set, dataObj: LIElement) => {
    const elements = get(elementsAtom);
    const index = elements.findIndex(d => d.id === dataObj.id);
    if (index !== -1) {
        elements[index] = { ...dataObj };
        set(elementsAtom, [...elements]);
        set(saveHistoryAtom);
    }
});

selectedDataAtom.debugLabel = "selectedDataAtom";

export default function useSelectedData() {
    return useAtom(selectedDataAtom);
}

export function _useDataObjCreator() {
    const consumer = useSelectedElemValue();
    const dataObj = useAtomValue(selectedDataAtom);
    const addElement = useAddElement();

    React.useEffect(() => {
        if (!consumer)
            return;
        if (dataObj)
            return;

        const dataType = DATA_TYPES[consumer.type as keyof typeof DATA_TYPES];
        if (!dataType)
            return;

        addElement({
            id: generateGUID(),
            name: dataType,
            type: dataType,
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {},
        });
    }, [consumer, dataObj, addElement]);

    return null;
}
