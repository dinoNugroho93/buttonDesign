import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { colors } from 'native-design-system';
import { color } from 'react-native-reanimated';

const getTextStyle = ({ size, secondary, transparent, loading, disabled, theme, color, subtle, hover }) => {
  const textStyle = [{
    fontWeight: Platform.OS === 'android' ? 'bold' : '400',
    fontSize: theme.fontSize[size],
    margin: theme.buttonSize[size],
    color: theme.textColor.white,
  }];
  if (secondary || transparent || subtle) {
    textStyle.push({
      color: hover ? theme.brandColor.hover : theme.brandColor[color],
    });
  }
  // if (loading && subtle) {
  //   textStyle.push({
  //     color: theme.brandColor[color] + '50',
  //   });
  // }
  if (disabled) {
    textStyle.push({
      color: theme.textColor.white,
    });
  }
  if((disabled && secondary) || (disabled && subtle) || (disabled && transparent)){
    textStyle.push({
      color: theme.brandColor[color] + 70,
    });
  }
  return textStyle;
};

const getContainerStyle = (props) => {
  const { secondary, width, subtle, transparent, disabled, loading, size, hover, theme, color, tint } = props;
  const buttonStyles = [styles.container];
  buttonStyles.push({
    backgroundColor: theme.brandColor[color],
    borderWidth: 1,
    borderColor: props.hover ? theme.brandColor.hover : theme.brandColor[color],
    borderRadius: 5
  });
  if (hover) {
    buttonStyles.push({
      backgroundColor: theme.brandColor.hover
    });
  }
  if (subtle) {
    buttonStyles.push({
      borderRadius: theme.buttonSize[size] * 2,
      borderColor: theme.brandColor.subtle,
      backgroundColor: "transparent"
    });
  }
  if (secondary) {
    buttonStyles.push({
      backgroundColor: "transparent" + (tint ? '10' : '00'),
    });
  }
  if (loading) {
    buttonStyles.push({
      borderWidth: 0,
      backgroundColor: theme.brandColor[color] + 80,
    });
  }
  if (transparent) {
    buttonStyles.push({
      borderWidth: 0,
      backgroundColor: 'transparent',
    });
  }
  if (loading && subtle) {
    buttonStyles.push({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.brandColor.subtle,
    });
  } else if (loading && secondary) {
    buttonStyles.push({
      backgroundColor: "transparent" + (tint ? '10' : '00'),
      borderWidth: 1,
      borderColor: theme.brandColor[color],
    });
  }

  if (disabled) {
    buttonStyles.push({
      backgroundColor: theme.brandColor[color] + 50,
      borderColor: theme.textColor.disabled,
    });
  }
  if (disabled && subtle) {
    buttonStyles.push({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.brandColor.subtle
    })
  } else if (disabled && secondary) {
    buttonStyles.push({
      backgroundColor: 'transparent',
      borderColor: theme.textColor.disabled,
    });
  } else if(disabled && transparent) {
    buttonStyles.push({
      backgroundColor: 'transparent',
    });
  }


  return buttonStyles;
};


const renderChildren = (props) => {
  return (
    <>
      {props.loading && !props.disabled &&
        <ActivityIndicator
          style={styles.iconStyle}
          color={props.theme.brandColor[props.color]} />}
      {props.leftIcon || props.icon &&
        <View style={styles.iconStyle}>
          {props.leftIcon || props.icon}
        </View>}
      <Text style={StyleSheet.flatten([getTextStyle(props), props.textStyle])}>
        {props.children}
      </Text>
      {props.rightIcon &&
        <View style={styles.iconStyle}>
          {props.rightIcon}
        </View>}
    </>
  );
};

const Button = (props) => {
  const theme = useThemeContext();
  const TouchableElement =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableElement
      {...props}
      onPress={props.onPress}
      disabled={props.disabled || props.loading}
    >
      <View style={StyleSheet.flatten([getContainerStyle({ ...props, theme }), props.style])}>
        {renderChildren({ ...props, theme })}
      </View>
    </TouchableElement>
  );
};

Button.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string,
  /**  Change indicator color */
  indicatorColor: PropTypes.string,
  /**  To change button size */
  size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  /**  To change button width */
  width: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  /**  callback function to be called when pressed */
  onPress: PropTypes.func.isRequired,
  /**  Pass the brand color */
  color: PropTypes.string,
  /**  Boolean value for round button */
  subtle: PropTypes.bool,
  /**  Boolean value for outline button */
  secondary: PropTypes.bool,
  /**  Boolean value for disabled button */
  transparent: PropTypes.bool,
  /**  Boolean value for transparent button */
  disabled: PropTypes.bool,
  /**  Boolean value for loading button */
  loading: PropTypes.bool,
  /**  To pass custom icon (default and same as leftIcon) */
  icon: PropTypes.element,
  /**  To pass custom icon on left */
  leftIcon: PropTypes.element,
  /**  To pass custom icon on right */
  rightIcon: PropTypes.element,
  /**  To make button short or long */
  hover: PropTypes.bool,
  /**  To enable outline button tint */
  tint: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  size: 'medium',
  length: 'long',
  width: 'medium',
  color: 'primary',
  tint: true,
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    paddingHorizontal: 5,
  },
});
export default Button;
