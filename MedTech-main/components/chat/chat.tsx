import { atom, useAtom } from "jotai";

type Mail = {
  selected: string | null; // Assuming item.id is of type string
  name: string;
};

const configAtom = atom<Mail>({
  selected: null,
  name: '',
});

export function useMail() {
  return useAtom(configAtom);
}
