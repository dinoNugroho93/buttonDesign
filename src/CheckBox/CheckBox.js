import React from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, Platform, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../util/ThemeProvider';

const getTextStyle = ({ theme, size, textColor, iconRight }) => {
  const textStyle = [{
    fontSize: theme.fontSize[size],
    color: theme.textColor[textColor],
    marginLeft: 5,
  }];
  if (iconRight) {
    textStyle.push({
      marginLeft: 0,
      marginRight: 5,
    });
  }
  return textStyle;
};

const renderIcon = ({ style, theme, size, ...props }) => {
  if (props.checked) {
    if (props.disabled){
      return (
        props.checkedIcon ||
        <MaterialIcons
          name="checkmark-circle"
          size={26}
          color= {props.color + 50}
        />
      );
    }else{
      return (
        props.checkedIcon ||
        <MaterialIcons
          name="checkmark-circle"
          size={26}
          color= {props.color}
        />
      );
    }
  } else {
    if(props.disabled){
      return (
        props.uncheckedIcon ||
        <MaterialIcons
          name="ellipse"
          size={26}
          color={'#D9DBE9' + 50}
        />
      );
    }else{
      return (
        props.uncheckedIcon ||
        <MaterialIcons
          name="ellipse"
          size={26}
          color={'#D9DBE9'}
        />
      );
    }
  }
};

const CheckBox = ({ style, textStyle, ...props }) => {
  const theme = useThemeContext();
  const propsWithTheme = { ...props, theme };
  const TouchableElement =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement {...props} disabled={props.disabled} onPress={props.onPress}>
      <View style={StyleSheet.flatten([styles.container, style])}>
        {!props.iconRight && renderIcon(propsWithTheme)}
        <Text style={StyleSheet.flatten([getTextStyle(propsWithTheme), textStyle])}>
          {props.children}
        </Text>
        {props.iconRight && renderIcon(propsWithTheme)}
      </View>
    </TouchableElement>
  );
};

CheckBox.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  children: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  iconRight: PropTypes.bool,
  color: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  checkedIcon: PropTypes.element,
  uncheckedIcon: PropTypes.element,
  disabled: PropTypes.bool
};

CheckBox.defaultProps = {
  size: 'default',
  color: '#b52025',
  textColor: 'default',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBox;
