# Modernize your legacy code with GitHub Copilot

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey abhisheksap-abap1!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/abhisheksap-abap1/skills-modernize-your-legacy-code-with-github-copilot/issues/1)

---

## Data Flow Sequence Diagram

The following sequence diagram illustrates the data flow for two common operations: viewing the account balance and performing a debit transaction.

```mermaid
sequenceDiagram
    participant User
    participant MainProgram
    participant Operations
    participant DataProgram

    %% View Balance Flow
    rect rgb(240, 248, 255)
        Note over User,DataProgram: View Balance Operation
        User->>MainProgram: Select option 1 (View Balance)
        MainProgram->>Operations: CALL 'Operations' USING 'TOTAL '
        Operations->>DataProgram: CALL 'DataProgram' USING 'READ', balance
        DataProgram-->>Operations: Return current balance
        Operations->>User: Display "Current balance: " + balance
    end

    %% Debit Flow
    rect rgb(255, 248, 240)
        Note over User,DataProgram: Debit Operation (Successful)
        User->>MainProgram: Select option 3 (Debit Account)
        MainProgram->>Operations: CALL 'Operations' USING 'DEBIT '
        Operations->>User: Display "Enter debit amount: "
        User->>Operations: Input debit amount
        Operations->>DataProgram: CALL 'DataProgram' USING 'READ', balance
        DataProgram-->>Operations: Return current balance
        Operations->>Operations: Validate balance >= amount
        alt Sufficient funds
            Operations->>Operations: Subtract amount from balance
            Operations->>DataProgram: CALL 'DataProgram' USING 'WRITE', new_balance
            DataProgram-->>Operations: Update stored balance
            Operations->>User: Display "Amount debited. New balance: " + new_balance
        else Insufficient funds
            Operations->>User: Display "Insufficient funds for this debit."
        end
    end
```

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

