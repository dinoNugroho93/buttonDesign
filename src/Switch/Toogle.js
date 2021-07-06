import React from 'react'
import { View, StyleSheet, Switch } from 'react-native'
import PropTypes from 'prop-types';

const Toogle = ({ ...props }) => {
    const objectColor = () => {
        let objectTrackColor
        objectTrackColor = {}
        if (props.disabled) {
            return objectTrackColor = {
                false: "#D9DBE9" + 50, true: props.color + 50
            }
        }
        if (props.hover) {
            return objectTrackColor = {
                false: "#A0A3BD",
                true: "#7B090D"
            }
        } else {
            return objectTrackColor = {
                false: "#D9DBE9", true: props.color
            }
        }
    }
    return (
        <View style={styles.container}>
            <Switch
                trackColor={objectColor()}
                thumbColor={'#FCFCFC'}
                ios_backgroundColor={'#D9DBE9'}
                onValueChange={props.onPress}
                value={props.isEnabled}
                disabled={props.disabled}
            />
        </View>
    )
}

Toogle.propTypes = {
    hover: PropTypes.bool,
    children: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool,
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

Toogle.defaultProps = {
    color: '#b52025',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
    }
});

export default Toogle;