import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import { useAuth } from '@/context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.details?.first_name || '');
  const [email, setEmail] = useState(user?.details?.email || '');
  const [phone, setPhone] = useState(user?.details?.contact_number || '');

  useEffect(() => {
    if (user) {
      setFullName(`${user.details.first_name} ${user.details.last_name}`);
      setEmail(user.details.email);
      setPhone(user.details.contact_number || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');
      const updatedData = { first_name: firstName, last_name: lastName, email, contact_number: phone };

      await updateUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  console.log(user);
  

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: user?.details?.image || 'https://via.placeholder.com/120' }}
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
        onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
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
});

export default ProfileScreen;
