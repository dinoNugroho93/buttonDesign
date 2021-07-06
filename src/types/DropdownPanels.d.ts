import { IconNode } from './icon-type';
import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';


interface DropdownPanelsProps{
    style?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    placeholderStyle?: StyleProp<TextStyle>,
    maxHeight?: number,
    fontFamily?:string,
    activeColor?: string,
    data: any[],
    value?: any | null,
    placeholder?: string,
    labelField: string,
    valueField: string,
    disable?: boolean,
    renderItem?: () => void,
    renderRightIcon: IconNode
}

export const DropdownPanels : React.FC<DropdownPanelsProps>