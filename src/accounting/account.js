class Account {
  constructor(initialBalance = 1000.00) {
    this.balance = initialBalance;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount) {
    if (amount < 0) {
      throw new Error('Credit amount cannot be negative');
    }
    this.balance += amount;
    return this.balance;
  }

  debit(amount) {
    if (amount < 0) {
      throw new Error('Debit amount cannot be negative');
    }
    if (this.balance < amount) {
      throw new Error('Insufficient funds for this debit');
    }
    this.balance -= amount;
    return this.balance;
  }
}

module.exports = Account;