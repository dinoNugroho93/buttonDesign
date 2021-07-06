import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

import { SizeType } from './size-type';
import { WidthType } from './width-type';
import { LengthType } from './length-type';
import { IconNode } from './icon-type';
import { thumbTouchSize } from './ThumbTouchSize';

interface SliderProps {
    value: number,
    disable: boolean,
    minimumValue: number,
    maximunValue: number,
    step: number,
    minimumTrackTintColor: string,
    customMinimumTrack: string,
    maximumTrackTintColor: string,
    customMaximumTrack: string,
    thumbTintColor: string,
    thumbTouchSize: thumbTouchSize,
    onValueChange: () => void,
    onSlidingStart: () => void,
    onSlidingComplete:  () => void,
    style: StyleProp<ViewStyle>,
    trackStyle: StyleProp<ViewStyle>,
    thumbStyle: StyleProp<ViewStyle>,
    customThumb: any,
    debugTouchArea: boolean,
    animateTransitions: boolean,
    animationType: 'spring' | 'timing',
    animationConfig: object,
}

export const Slider: React.FC<SliderProps>;


