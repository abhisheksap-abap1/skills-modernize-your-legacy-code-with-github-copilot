const Account = require('./account');
const readline = require('readline');

const account = new Account();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', (choice) => {
    handleChoice(choice.trim());
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      console.log(`Current balance: ${account.getBalance()}`);
      showMenu();
      break;
    case '2':
      rl.question('Enter credit amount: ', (amount) => {
        try {
          const amt = parseFloat(amount);
          const newBalance = account.credit(amt);
          console.log(`Amount credited. New balance: ${newBalance}`);
        } catch (error) {
          console.log(error.message);
        }
        showMenu();
      });
      break;
    case '3':
      rl.question('Enter debit amount: ', (amount) => {
        try {
          const amt = parseFloat(amount);
          const newBalance = account.debit(amt);
          console.log(`Amount debited. New balance: ${newBalance}`);
        } catch (error) {
          console.log(error.message);
        }
        showMenu();
      });
      break;
    case '4':
      console.log('Exiting the program. Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid choice, please select 1-4.');
      showMenu();
      break;
  }
}

showMenu();