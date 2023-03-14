import { atom } from "recoil";

export const GroupNameAtom = atom<string>({
  key: "groupName",
  default: "",
});
