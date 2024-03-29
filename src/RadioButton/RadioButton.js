import React, { useContext, createContext } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../util/ThemeProvider';
const Context = createContext();
const { Provider } = Context;

const getTextStyle = ({ theme, size, textColor, iconRight }) => {
  const textStyle = [{
    fontSize: theme.fontSize[size],
    color: theme.textColor[textColor],
    marginLeft: 10,
    marginVertical: 2.5,
  }];
  if (iconRight) {
    textStyle.push({
      marginLeft: 0,
      marginRight: 10,
    });
  }
  return textStyle;
};

const renderIcon = ({ theme, size, id, activeId, ...props }) => {
  if (activeId === id) {
    if(props.disabled){
      return (
        props.checkedIcon ||
        <Ionicons
          name="ios-radio-button-on"
          size={theme.fontSize[size] * 1.2}
          color={'#B52025' + 50}
        />
      );
    }else{
      if(props.disabled){
        return (
          props.checkedIcon ||
          <Ionicons
            name="ios-radio-button-on"
            size={theme.fontSize[size] * 1.2}
            color={'#B52025' +50}
          />
        );
      }else{
        return (
          props.checkedIcon ||
          <Ionicons
            name="ios-radio-button-on"
            size={theme.fontSize[size] * 1.2}
            color={'#B52025'}
          />
        );
      }
    }
  } else {
    return (
      props.uncheckedIcon ||
      <Ionicons
        name="ellipse"
        size={theme.fontSize[size] * 1.2}
        color={'#D9DBE9'}
      />
    );
  }
};

export const RadioItem = ({ children, id}) => {
  const { selectItem, style, ...props } = useContext(Context);
  const propsToPass = { ...props, id };
  const TouchableElement = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement {...props} disabled={props.disabled} onPress={() => selectItem(id)}>
      <View style={[styles.itemContainer, style]}>
        {!props.iconRight && renderIcon(propsToPass)}
        <Text style={StyleSheet.flatten([getTextStyle(propsToPass), props.textStyle])}>
          {children}
        </Text>
        {props.iconRight && renderIcon(propsToPass)}
      </View>
    </TouchableElement>
  );
};

const RadioButton = ({ children, ...props }) => {
  const theme = useThemeContext();
  return (
    <Provider value={{ ...props, theme }}>
      {children}
    </Provider>
  );
};

RadioButton.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  children: PropTypes.string.isRequired,
  activeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  iconRight: PropTypes.bool,
  color: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  selectItem: PropTypes.func.isRequired,
  checkedIcon: PropTypes.element,
  uncheckedIcon: PropTypes.element,
  disabled: PropTypes.bool
};

RadioButton.defaultProps = {
  size: 'default',
  color: 'default',
  textColor: 'default',
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RadioButton;
