import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // Implement save profile logic here
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Implement change password navigation or modal here
    console.log('Change password pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/images/profile-placeholder.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton}>
          <Ionicons name="camera" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          ) : (
            <Text style={styles.value}>{fullName}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{phone}</Text>
          )}
        </View>
      </View>
      <Button
        title={isEditing ? "Save Profile" : "Edit Profile"}
        onPress={isEditing ? handleSaveProfile : handleEditProfile}
      />
      <Button
        title="Change Password"
        onPress={handleChangePassword}
        variant="outline"
        style={styles.changePasswordButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    fontSize: 16,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightText,
    paddingVertical: 4,
  },
  changePasswordButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;

