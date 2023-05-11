import { Character, Episode } from "@/typings";

export const addToList = <T extends string | number>(list: T[], element: T) => {
  const index = list.indexOf(element);
  return -1 === index ? list.concat(element) : list;
}

export const removeFromList = <T extends string | number>(list: T[], element: T) => {
  const index = list.indexOf(element);
  if (-1 !== index) {
    list.splice(index, 1)
  }
  return list;
}

export const trimDupesFromList = <T extends Character | Episode>(list: T[]) => {
  const ids: string[] = [];

  const newList = list.filter(({id}) => {
    if (ids.includes(id)) {
      return false;
    } else {
      ids.push(id);
      return true;
    }
  });

  return newList;
}
