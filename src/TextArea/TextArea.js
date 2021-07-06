import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes, { bool } from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { useState } from 'react/cjs/react.development';
import Feather from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const getContainerStyle = ({ theme, color, error, colorFocus, succes }) => {
    const textAreaContainerStyle = [styles.container];
    textAreaContainerStyle.push({
        backgroundColor: '#eff0f6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colorFocus
    });
    if (succes) {
        textAreaContainerStyle.push({
            backgroundColor: theme.brandColor.succes,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#00966D'
        })
    }
    if (error) {
        textAreaContainerStyle.push({
            backgroundColor: theme.brandColor.error,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#c30052'
        })
    }
    return textAreaContainerStyle;
};

const getInputStyle = ({ theme, size, textColor }) => {
    const inputStyle = [styles.input];
    inputStyle.push({
        fontSize: theme.fontSize[size],
        marginVertical: 0,
        color: "black",
    });
    return inputStyle;
};

const getLabelStyle = ({ theme, size, labelColor }) => {
    const labelStyle = [{
        fontSize: theme.fontSize[size] * 0.8,
        fontWeight: 'bold',
        paddingLeft: 2.5,
        paddingBottom: 5,
        color: theme.textColor[labelColor],
    }];
    return labelStyle;
};

const getCaptionStyle = ({ theme, size, error, succes, caption }) => {
    if (caption) {
        const caption = [{
            fontSize: theme.fontSize[size] * 0.8,
            fontWeight: '600',
            paddingLeft: 5,
            paddingTop: 5,
            color: '#6E7191',
        }];
        return caption;
    }
    if (error) {
        const caption = [{
            fontSize: theme.fontSize[size] * 0.8,
            fontWeight: '600',
            paddingLeft: 5,
            paddingTop: 5,
            color: '#c30052',
        }];
        return caption;
    }
    if (succes) {
        const caption = [{
            fontSize: theme.fontSize[size] * 0.8,
            fontWeight: '600',
            paddingLeft: 5,
            paddingTop: 5,
            color: '#00966D',
        }];
        return caption;
    }
};

const TextArea = React.forwardRef((props, ref) => {
    const theme = useThemeContext();
    const [colorFocus, setColorFocus] = useState('')
    const [active, setActive] = useState(false)
    const showLabel = props.floatingLabel ? props.value.length > 0 : props.label;
    return (
        <View style={props.containerStyle}>
            <View style={StyleSheet.flatten([getContainerStyle({ ...props, theme, colorFocus }), props.style])}>
                <TextInput
                    editable={!props.disabled}
                    {...props}
                    ref={ref}
                    style={getInputStyle({ ...props, theme })}
                    placeholder={props.floatingLabel ? props.label : props.placeholder}
                    onFocus={() => {
                        setColorFocus('black')
                        setActive(true)
                    }}
                    onBlur={() => {
                        setColorFocus('#eff0f6')
                        setActive(false)
                    }}
                    numberOfLines={10}
                    multiline={true}
                    underlineColorAndroid="transparent"
                />{
                    props.value.length > 0 ? <TouchableOpacity style={styles.rightIcon} onPress={props.rightIcon}>
                        {<Feather
                            name="close-outline"
                            size={20}
                            color={'black'} />}
                    </TouchableOpacity> : null
                }

            </View>
            {((props.caption && !props.error) || (props.caption && !props.succes)) ?
                <Text style={StyleSheet.flatten([getCaptionStyle({ ...props, theme }), props.labelStyle])}>
                    {props.caption}
                </Text> : null}
            {(props.error && props.errorCaption) ?
                <Text style={StyleSheet.flatten([getCaptionStyle({ ...props, theme }), props.labelStyle])}>
                    {props.errorCaption}
                </Text> : null}
            {(props.succes && props.succesCaption) ?
                <Text style={StyleSheet.flatten([getCaptionStyle({ ...props, theme }), props.labelStyle])}>
                    {props.succesCaption}
                </Text> : null}
        </View>
    );
});

TextArea.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    textColor: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.bool,
    labelStyle: PropTypes.object,
    labelColor: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    error: PropTypes.bool,
    errorCaption: PropTypes.string,
    size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
    disabled: PropTypes.bool,
    rightIcon: PropTypes.func,
    background: PropTypes.string,
    succes: PropTypes.bool,
    succesCaption: PropTypes.string,
    caption: PropTypes.string,
};

TextArea.defaultProps = {
    placeholder: 'Type here',
    textColor: 'default',
    color: 'outline',
    size: 'medium',
    labelColor: '#eff0f6',
    background: '#eff0f6',
    floatingLabel: false,
    succes: false,

};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row'
    },
    input: {
        height: 150,
        width: '93%',
        paddingHorizontal: 15,
        fontSize: 1,
        justifyContent: "flex-start"
    },
    rightIcon: {
        paddingRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default TextArea;
