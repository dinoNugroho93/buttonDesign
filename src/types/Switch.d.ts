import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

import { SizeType } from './size-type';
import { WidthType } from './width-type';
import { LengthType } from './length-type';
import { IconNode } from './icon-type';

interface SwitchProps {
    children: string,
    onPress: () => void,
    isEnabled: boolean,
    color: string,
    disabled: boolean,
    hover: boolean
}

export const Switch: React.FC<SwitchProps>;


