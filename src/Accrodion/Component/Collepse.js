import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import CollepseHeader from './CollepseHeader';
import CollepseBody from './CollepseBody';

const Collepse = React.forwardRef(
    (
        {
            isExpanded = false,
            disabled = false,
            onToggle = () => undefined,
            handleLongPress = () => undefined,
            children,
            ...restProps
        }, ref,) => {
        const [show, setShow] = useState(isExpanded);
        useEffect(() => {
            setShow(isExpanded);
        }, [isExpanded]);
        let header = null
        let body = null

        React.Children.forEach(children, child => {
            if (child.type === CollepseHeader) {
                header = child
            } else if (child.type === CollepseBody) {
                body = child
            }
        });
        if (header === null) {
            console.warn("header wasn't found to be rendered. Please make sure you have wrapped an CollapseHeader in the Collapse Component.",)
            return null
        } else {
            return (
                <View ref={ref} {...restProps}>
                    <TouchableOpacity
                     disabled={disabled}
                     onPress={() => {
                         onToggle(!show);
                         setShow(!show);
                     }}
                     onLongPress={handleLongPress}>
                        {header}
                    </TouchableOpacity>
                    {show && body}
                </View>
            )
        }
    })
export default Collepse