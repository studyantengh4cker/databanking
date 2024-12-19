"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type MyContextType = {
  currentCollege: any | null;
  setCurrentCollege: (value: any | null) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const CollegeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentCollege, setCurrentCollege] = useState<any | null>([]);

  return (
    <MyContext.Provider value={{ currentCollege, setCurrentCollege }}>
      {children}
    </MyContext.Provider>
  );
};

export const useFormfieldCollegeContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext must be used within a CollegeContextProvider"
    );
  }
  return context;
};
