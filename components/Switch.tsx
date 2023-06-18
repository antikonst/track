import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

export const ChangeLang = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 14 }}>EN</Text>
      <Switch
        trackColor={{ false: '#e827a1', true: '#005de0' }}
        thumbColor={isEnabled ? '#9acd32' : '#cf5b25'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={{ marginTop: 14 }}>RU</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 50
  },
});