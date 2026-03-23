const Account = require('./account');

describe('Student Account Management System - Unit Tests', () => {
  let account;

  beforeEach(() => {
    account = new Account(); // Starts with 1000.00
  });

  test('TC001: View initial account balance', () => {
    // Pre-conditions: Application is compiled and ready to run. Initial balance is $1000.00
    // Test Steps: 1. Start the application 2. Select option 1 (View Balance)
    // Expected Result: Application displays "Current balance: 1000.00"
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC002: Credit account with positive amount', () => {
    // Pre-conditions: Application is running. Current balance is $1000.00
    // Test Steps: 1. Select option 2 (Credit Account) 2. Enter amount "500.00" when prompted
    // Expected Result: Application displays "Amount credited. New balance: 1500.00"
    const newBalance = account.credit(500.00);
    expect(newBalance).toBe(1500.00);
    expect(account.getBalance()).toBe(1500.00);
  });

  test('TC003: Debit account with sufficient funds', () => {
    // Pre-conditions: Application is running. Current balance is $1500.00 (after TC002)
    // Test Steps: 1. Select option 3 (Debit Account) 2. Enter amount "300.00" when prompted
    // Expected Result: Application displays "Amount debited. New balance: 1200.00"
    account.credit(500.00); // Set up to 1500
    const newBalance = account.debit(300.00);
    expect(newBalance).toBe(1200.00);
    expect(account.getBalance()).toBe(1200.00);
  });

  test('TC004: Debit account with insufficient funds', () => {
    // Pre-conditions: Application is running. Current balance is $1200.00 (after TC003)
    // Test Steps: 1. Select option 3 (Debit Account) 2. Enter amount "1500.00" when prompted
    // Expected Result: Application displays "Insufficient funds for this debit." and balance remains $1200.00
    account.credit(500.00); // 1500
    account.debit(300.00); // 1200
    expect(() => account.debit(1500.00)).toThrow('Insufficient funds for this debit');
    expect(account.getBalance()).toBe(1200.00); // Balance unchanged
  });

  test('TC005: Debit exact balance amount', () => {
    // Pre-conditions: Application is running. Current balance is $1200.00
    // Test Steps: 1. Select option 3 (Debit Account) 2. Enter amount "1200.00" when prompted
    // Expected Result: Application displays "Amount debited. New balance: 0.00"
    account.credit(500.00); // 1500
    account.debit(300.00); // 1200
    const newBalance = account.debit(1200.00);
    expect(newBalance).toBe(0.00);
    expect(account.getBalance()).toBe(0.00);
  });

  test('TC006: Multiple credit operations', () => {
    // Pre-conditions: Application is running. Current balance is $0.00 (after TC005)
    // Test Steps: 1. Select option 2 (Credit Account) 2. Enter amount "250.00" 3. Select option 2 again 4. Enter amount "750.00"
    // Expected Result: First credit: "Amount credited. New balance: 250.00" Second credit: "Amount credited. New balance: 1000.00"
    account.credit(500.00); // 1500
    account.debit(300.00); // 1200
    account.debit(1200.00); // 0
    let newBalance = account.credit(250.00);
    expect(newBalance).toBe(250.00);
    expect(account.getBalance()).toBe(250.00);
    newBalance = account.credit(750.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC007: View balance after multiple operations', () => {
    // Pre-conditions: Application is running. Current balance is $1000.00 (after TC006)
    // Test Steps: 1. Select option 1 (View Balance)
    // Expected Result: Application displays "Current balance: 1000.00"
    account.credit(500.00); // 1500
    account.debit(300.00); // 1200
    account.debit(1200.00); // 0
    account.credit(250.00); // 250
    account.credit(750.00); // 1000
    expect(account.getBalance()).toBe(1000.00);
  });

  // TC008: Invalid menu choice - UI related, not applicable for unit tests
  // TC009: Exit application - UI related, not applicable for unit tests

  test('TC010: Credit with zero amount', () => {
    // Pre-conditions: Application is running. Current balance is $1000.00
    // Test Steps: 1. Select option 2 (Credit Account) 2. Enter amount "0.00"
    // Expected Result: Application displays "Amount credited. New balance: 1000.00" (no change)
    const newBalance = account.credit(0.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC011: Debit with zero amount', () => {
    // Pre-conditions: Application is running. Current balance is $1000.00
    // Test Steps: 1. Select option 3 (Debit Account) 2. Enter amount "0.00"
    // Expected Result: Application displays "Amount debited. New balance: 1000.00" (no change)
    const newBalance = account.debit(0.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  // Additional edge cases not in original plan but good for unit tests
  test('Credit with negative amount should throw error', () => {
    expect(() => account.credit(-100.00)).toThrow('Credit amount cannot be negative');
  });

  test('Debit with negative amount should throw error', () => {
    expect(() => account.debit(-100.00)).toThrow('Debit amount cannot be negative');
  });

  test('Custom initial balance', () => {
    const customAccount = new Account(500.00);
    expect(customAccount.getBalance()).toBe(500.00);
  });
});