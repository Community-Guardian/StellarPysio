import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Button from '../../components/Button';

const SystemSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);

  const handleSaveSettings = () => {
    // Implement logic to save settings
    console.log('Settings saved');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>System Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Auto Backup</Text>
        <Switch
          value={autoBackupEnabled}
          onValueChange={setAutoBackupEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <Button
          title="English"
          onPress={() => {/* Implement language selection */}}
          style={styles.languageButton}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Data Retention Period</Text>
        <Button
          title="30 Days"
          onPress={() => {/* Implement data retention period selection */}}
          style={styles.retentionButton}
        />
      </View>
      <Button
        title="Save Settings"
        onPress={handleSaveSettings}
        style={styles.saveButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  languageButton: {
    backgroundColor: '#4A90E2',
  },
  retentionButton: {
    backgroundColor: '#4A90E2',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default SystemSettingsScreen;

