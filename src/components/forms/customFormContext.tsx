// https://hipsterbrown.com/musings/musing/react-context-with-generics/
// https://www.reddit.com/r/reactjs/comments/s3z9ox/trying_to_use_react_context_with_a_generic/

import { ReactNode, createContext, useState, useContext } from "react";

// type ItemWithID = { id: string };

// type MyContextData<Item extends ItemWithID> = {
//   selectedItems: string[];
//   itemList: Item[];
// };

// const MyContext = createContext<MyContextData<ItemWithID>>(null!);

// type MyProviderProps<Item extends ItemWithID> = {
//   itemList: Item[];
// }

// function MyProvider <Item extends ItemWithID>(
//   { children, itemList }: React.PropsWithChildren<MyProviderProps<Item>>
// ) {
//   // keep track of `selectedItems` somehow
//   const [selectedItems, setSelectedItems] = useState<string>()

//   return <MyContext.Provider value={{ itemList, selectedItems }}>{children}</MyContext.Provider>;
// }



// TODO:

// your function 'test context' creator:
// interface TestContext<T> {
//   whatever: string;
//   data: T;
// }

// function createTestContext<T>(initial?: TestContext<T>) {
//   return createContext<TestContext<T> | undefined>(initial);
// }

// // it would be used like:
// interface Foo {
//   bar: number;
// }

// export const TestContext = createTestContext<Foo>();



// export const FormOnChangeContext = <TValue,>({
//   // onChange,
//   children,
// }: {
//   // onChange: OnChangeContextType<TValue>;
//   children: ReactNode;
// }) => {
  

//   // const createOnChangeContext = () => createContext<OnChangeContextType<TValue> | null>(null!);
//   // const OnChangeContext = createOnChangeContext();
//   // const OnChangeContext = createContext<OnChangeContextType<TValue> | null>(null!);

//   // return <TestContext.Provider value={{bar:1}}>{children}</TestContext.Provider>;
// };

// TODO:

type OnChangeContextType<TValue> = (field: string, value: TValue) => void;

const createOnChangeContext = <TValue,>() => createContext<OnChangeContextType<TValue> | null>(null!);

export const OnChangeContext = createOnChangeContext<TValue>();

export const FormOnChangeContext = <TValue,>({
  onChange,
  children,
}: {
  onChange: OnChangeContextType<TValue>;
  children: ReactNode;
}) => {
  // const createOnChangeContext = () => createContext<OnChangeContextType<TValue> | null>(null!);
  // const OnChangeContext = createOnChangeContext();
  // const OnChangeContext = createContext<OnChangeContextType<TValue> | null>(null!);

  return <OnChangeContext.Provider value={onChange}>{children}</OnChangeContext.Provider>;
};
