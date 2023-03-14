import { groupMemberAtom } from "./groupMembers";
import { atom, selector } from "recoil";

export const ExpenseListAtom = atom<
  { user: string; description: string; expense: number; date: string }[]
>({
  key: "expenseListAtom",
  default: [],
});

export const totalExpenseAtom = selector({
  key: "totalExpenseAtom",
  get: ({ get }) => {
    const ExpenseList = get(ExpenseListAtom);
    let totalExpense = 0;
    for (const item of ExpenseList) {
      totalExpense += item.expense;
    }

    return totalExpense;
  },
});

export const memberAccountAtom = selector({
  key: "memberAccountAtom",
  get: ({ get }) => {
    const expenseListArr = get(ExpenseListAtom);
    const groupmemberArr = get(groupMemberAtom);

    let resultObject: {
      [member: string]: {
        [otherMember: string]: number;
      };
    } = {};

    for (const currentMember of groupmemberArr) {
      resultObject[currentMember] = {};
      for (const other of groupmemberArr.filter(
        (member) => member != currentMember
      )) {
        resultObject[currentMember][other] = 0;
      }
    }
    // {user: 준석, expense: 12000}일경우.
    for (const expenseItem of expenseListArr) {
      for (const other of groupmemberArr.filter(
        (member) => member != expenseItem.user
      )) {
        resultObject[expenseItem.user][other] =
          resultObject[expenseItem.user][other] +
          expenseItem.expense / groupmemberArr.length;

        resultObject[other][expenseItem.user] =
          resultObject[other][expenseItem.user] -
          expenseItem.expense / groupmemberArr.length;
      }
    }

    return resultObject;
  },
});
