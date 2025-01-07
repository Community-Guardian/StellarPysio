import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from '../../../components/Button';

interface AccountRequest {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ApproveAccountsScreen = () => {
  const [accountRequests, setAccountRequests] = useState<AccountRequest[]>([
    { id: '1', name: 'Alice Brown', email: 'alice@example.com', role: 'Physiotherapist' },
    { id: '2', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Nutritionist' },
    { id: '3', name: 'Eva Green', email: 'eva@example.com', role: 'Patient' },
  ]);

  const handleApprove = (id: string) => {
    setAccountRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    // Implement logic to approve the account
  };

  const handleReject = (id: string) => {
    setAccountRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    // Implement logic to reject the account
  };

  const renderAccountRequest = ({ item }: { item: AccountRequest }) => (
    <View style={styles.requestItem}>
      <View>
        <Text style={styles.requestName}>{item.name}</Text>
        <Text style={styles.requestEmail}>{item.email}</Text>
        <Text style={styles.requestRole}>{item.role}</Text>
      </View>
      <View style={styles.actionButtons}>
        <Button
          title="Approve"
          onPress={() => handleApprove(item.id)}
          style={styles.approveButton}
        />
        <Button
          title="Reject"
          onPress={() => handleReject(item.id)}
          style={styles.rejectButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approve Accounts</Text>
      {accountRequests.length > 0 ? (
        <FlatList
          data={accountRequests}
          renderItem={renderAccountRequest}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noRequestsText}>No pending account requests</Text>
      )}
    </View>
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
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  requestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requestEmail: {
    fontSize: 14,
    color: '#666',
  },
  requestRole: {
    fontSize: 14,
    color: '#4A90E2',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#FF6B6B',
  },
  noRequestsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ApproveAccountsScreen;

