import React, { createContext, useContext, useState, ReactNode } from "react";

type HugStatusContextType = {
  hugStatus: { [postUrl: string]: boolean };
  toggleHug: (postUrl: string) => void;
  initializeHugStatus: (postUrls: string[]) => void;
};

type HugStatusProviderProps = {
  children: ReactNode;
};

const HugStatusContext = createContext<HugStatusContextType | undefined>(
  undefined
);

export const useHugStatus = () => {
  const context = useContext(HugStatusContext);
  if (context === undefined) {
    throw new Error("useHugStatus must be used within a HugStatusProvider");
  }
  return context;
};

const HugStatusProvider = ({ children }: HugStatusProviderProps) => {
  const [hugStatus, setHugStatus] = useState<{ [postUrl: string]: boolean }>(
    {}
  );
  const initializeHugStatus = (postUrls: string[]) => {
    setHugStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      postUrls.forEach((url) => {
        if (newStatus[url] === undefined) {
          newStatus[url] = false;
        }
      });
      return newStatus;
    });
  };

  const toggleHug = (postUrl: string) => {
    setHugStatus((prevStatus) => ({
      ...prevStatus,
      [postUrl]: !prevStatus[postUrl],
    }));
  };

  return (
    <HugStatusContext.Provider
      value={{ hugStatus, toggleHug, initializeHugStatus }}
    >
      {children}
    </HugStatusContext.Provider>
  );
};
export default HugStatusProvider;
