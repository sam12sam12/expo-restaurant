// CustomToggleSwitch.js
import React from 'react';
import { View, Switch } from 'react-native';
import { useTheme } from '../ThemeContext';

const CustomToggleSwitch = ({ isEnabled, onToggle }) => {
  const { colors } = useTheme();

  const toggleSwitch = () => {
    onToggle(!isEnabled);
  };

  return (
    <View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default CustomToggleSwitch;
