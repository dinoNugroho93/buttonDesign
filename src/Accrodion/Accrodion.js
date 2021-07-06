import React, { useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import Collepse from './Component/Collepse'
import CollepseHeader from './Component/CollepseHeader'
import CollepseBody from './Component/CollepseBody'
import { element } from 'prop-types'
import get from 'lodash.get';

const isNill = element => element == null

const Accordion = React.forwardRef(
    (
        {
            data,
            list = [],
            header = () => undefined,
            body = () => undefined,
            onToggle = () => undefined,
            isDisabled = () => undefined,
            keyExtractor,
            expandedKey,
            expandedIndex,
            extraData,
            ...restProps
        }, ref
    ) => {
        const _keyExtractor = useMemo(
            () => keyExtractor || ((item, index) => index),
            [keyExtractor],
        );
        const mergeList = useMemo(() => data || list, [data, list]);

        const expandKey = useMemo(() => {
            const selectedItem = get(mergeList, expandedIndex);
            const expandedKeyViaIndex = selectedItem
                ? _keyExtractor(selectedItem, expandedIndex)
                : undefined;
            return isNil(expandedKey)
                ? isNil(expandedKeyViaIndex)
                    ? undefined
                    : expandedKeyViaIndex
                : expandedKey;
        }, [mergeList, expandedKey, expandedIndex, _keyExtractor])

        const [selected, setSelected] = useState(expandKey);

        useEffect(()=>{
            setSelected(expandKey);
        }, [expandKey])

    })