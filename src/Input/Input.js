import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes, { bool } from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { useState } from 'react/cjs/react.development';
import Feather from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const getContainerStyle = ({ theme, round, color, outline, error, colorFocus }) => {
  const inputContainerStyle = [styles.container];
  inputContainerStyle.push({
    backgroundColor: '#eff0f6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorFocus
  });
  if (outline) {
    inputContainerStyle.push({
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.brandColor[color],
      backgroundColor: theme.brandColor.background,
      borderRadius: 5,
    });
  }
  if (round) {
    inputContainerStyle.push({
      borderBottomWidth: 0,
      borderRadius: 50,
      backgroundColor: theme.brandColor.background,
    });
  }
  if (outline && round) {
    inputContainerStyle.push({
      borderWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: theme.brandColor.background,
    });
  }
  if (error) {
    inputContainerStyle.push({
      borderColor: '#ff000080',
      borderBottomColor: '#ff000080',
      backgroundColor: '#ff000005',
    });
  }
  return inputContainerStyle;
};

const getInputStyle = ({ theme, size, textColor }) => {
  const inputStyle = [styles.input];
  inputStyle.push({
    fontSize: theme.fontSize[size],
    marginVertical: 0,
    color: "#a0a3bd",
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

const getCaptionStyle = ({ theme, size }) => {
  const caption = [{
    fontSize: theme.fontSize[size] * 0.8,
    fontWeight: '600',
    paddingLeft: 5,
    paddingTop: 5,
    color: '#ff000080',
  }];
  return caption;
};

const Input = React.forwardRef((props, ref) => {
  const theme = useThemeContext();
  const [colorFocus, setColorFocus] = useState('')
  const [active, setActive] = useState(false)
  const showLabel = props.floatingLabel ? props.value.length > 0 : props.label;
  return (
    <View style={props.containerStyle}>
      <View style={StyleSheet.flatten([getContainerStyle({ ...props, theme, colorFocus }), props.style])}>
      {showLabel ?
        <Text style={StyleSheet.flatten([getLabelStyle({ ...props, theme }), props.labelStyle])}>
          {props.label}
        </Text> : null}
        {props.leftIcon &&
          <View style={styles.leftIcon}>
            {props.leftIcon}
          </View>
        }
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
        />
        {(props.rightIcon && props.value.length !== 0) && !props.disabled &&
          <TouchableOpacity style={styles.rightIcon} onPress={props.rightIcon}>
            {<Feather
              name="close-outline"
              size={20}
              color={'black'} /> }
          </TouchableOpacity>
        }
      </View>
      {(props.error && props.errorCaption) ?
        <Text style={StyleSheet.flatten([getCaptionStyle({ ...props, theme }), props.labelStyle])}>
          {props.errorCaption}
        </Text> : null}
    </View>
  );
});

Input.propTypes = {
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
  round: PropTypes.bool,
  outline: PropTypes.bool,
  error: PropTypes.bool,
  errorCaption: PropTypes.string,
  size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.func,
  background: PropTypes.string,
};

Input.defaultProps = {
  placeholder: 'Type here',
  textColor: 'default',
  color: 'outline',
  size: 'medium',
  labelColor: '#eff0f6',
  background: '#eff0f6',
  floatingLabel: false,

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  input: {
    flex: 1,
    padding: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  leftIcon: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
