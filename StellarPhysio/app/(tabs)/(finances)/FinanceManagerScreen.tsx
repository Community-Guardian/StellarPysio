import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../../components/Button';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const FinanceManagerScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2023-05-15', description: 'Physiotherapy Session', amount: 150, type: 'income' },
    { id: '2', date: '2023-05-16', description: 'Equipment Purchase', amount: 500, type: 'expense' },
    { id: '3', date: '2023-05-17', description: 'Nutrition Consultation', amount: 100, type: 'income' },
  ]);

  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(transaction => 
    filterType === 'all' || transaction.type === filterType
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionDate}>{item.date}</Text>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={[
        styles.transactionAmount,
        item.type === 'income' ? styles.incomeText : styles.expenseText
      ]}>
        {item.type === 'income' ? '+' : '-'} ${item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finance Manager</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(itemValue) => setFilterType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
        </Picker>
      </View>
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
      />
      <Button
        title="Generate Financial Report"
        onPress={() => {/* Implement report generation logic */}}
        style={styles.reportButton}
      />
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#F44336',
  },
  reportButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
  },
});

export default FinanceManagerScreen;

