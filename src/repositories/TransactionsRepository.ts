import Transaction from '../models/Transaction';

interface ListTransactionsDTO {
  transactions: Transaction[];
  balance: object;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListTransactionsDTO {
    const data = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return data;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type !== 'outcome')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );
    const outcome = this.transactions
      .filter(transaction => transaction.type !== 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
