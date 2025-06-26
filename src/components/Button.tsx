import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): StyleProp<ViewStyle>[] => {
    const baseStyles: StyleProp<ViewStyle>[] = [
      styles.button,
      styles[`${size}Button`],
    ];

    const variantStyles: Record<
      NonNullable<ButtonProps['variant']>,
      StyleProp<ViewStyle>
    > = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      outline: styles.outlineButton,
    };

    return [
      ...baseStyles,
      variantStyles[variant],
      disabled && styles.disabledButton,
    ].filter(Boolean);
  };

  const getTextStyle = (): StyleProp<TextStyle>[] => {
    const baseStyles: StyleProp<TextStyle>[] = [
      styles.text,
      styles[`${size}Text`],
    ];

    const variantStyles: Record<
      NonNullable<ButtonProps['variant']>,
      StyleProp<TextStyle>
    > = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
    };

    return [
      ...baseStyles,
      variantStyles[variant],
      disabled && styles.disabledText,
    ].filter(Boolean);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#007AFF' : 'white'}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#E9E9E9',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#333',
  },
  outlineText: {
    color: '#007AFF',
  },
  disabledText: {
    opacity: 0.5,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
