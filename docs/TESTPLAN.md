# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL-based student account management system. It includes test cases for all major operations and edge cases to validate the system's behavior.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|-------------------|----------|
| TC001 | View initial account balance | Application is compiled and ready to run. Initial balance is $1000.00 | 1. Start the application<br>2. Select option 1 (View Balance) | Application displays "Current balance: 1000.00" |  |  |  |
| TC002 | Credit account with positive amount | Application is running. Current balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount "500.00" when prompted | Application displays "Amount credited. New balance: 1500.00" |  |  |  |
| TC003 | Debit account with sufficient funds | Application is running. Current balance is $1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter amount "300.00" when prompted | Application displays "Amount debited. New balance: 1200.00" |  |  |  |
| TC004 | Debit account with insufficient funds | Application is running. Current balance is $1200.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter amount "1500.00" when prompted | Application displays "Insufficient funds for this debit." and balance remains $1200.00 |  |  |  |
| TC005 | Debit exact balance amount | Application is running. Current balance is $1200.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount "1200.00" when prompted | Application displays "Amount debited. New balance: 0.00" |  |  |  |
| TC006 | Multiple credit operations | Application is running. Current balance is $0.00 (after TC005) | 1. Select option 2 (Credit Account)<br>2. Enter amount "250.00"<br>3. Select option 2 again<br>4. Enter amount "750.00" | First credit: "Amount credited. New balance: 250.00"<br>Second credit: "Amount credited. New balance: 1000.00" |  |  |  |
| TC007 | View balance after multiple operations | Application is running. Current balance is $1000.00 (after TC006) | 1. Select option 1 (View Balance) | Application displays "Current balance: 1000.00" |  |  |  |
| TC008 | Invalid menu choice | Application is running | 1. Enter "5" when prompted for choice | Application displays "Invalid choice, please select 1-4." and redisplays menu |  |  |  |
| TC009 | Exit application | Application is running | 1. Select option 4 (Exit) | Application displays "Exiting the program. Goodbye!" and terminates |  |  |  |
| TC010 | Credit with zero amount | Application is running. Current balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount "0.00" | Application displays "Amount credited. New balance: 1000.00" (no change) |  |  |  |
| TC011 | Debit with zero amount | Application is running. Current balance is $1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount "0.00" | Application displays "Amount debited. New balance: 1000.00" (no change) |  |  |  |

## Test Execution Notes

- All test cases assume the application starts with an initial balance of $1000.00
- Test cases should be executed in sequence where dependencies exist (e.g., TC003 depends on TC002)
- Balance persistence is maintained across operations within a single application session
- The application uses console input/output for user interaction
- Amounts are entered in format XXXX.XX (up to 6 digits before decimal, 2 after)

## Business Rules Validation

This test plan validates the following business rules:
- Student accounts start with $1000.00 balance
- Credit operations add the specified amount to the balance
- Debit operations subtract the specified amount only if sufficient funds exist
- Insufficient debit attempts are rejected with appropriate messaging
- Balance is updated immediately after successful transactions
- All transaction results are displayed to the user
- Invalid menu selections are handled gracefully