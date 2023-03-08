import { atom } from "recoil";

export const groupMemberAtom = atom<string[]>({
  key: "groupMember",
  default: [],
});
