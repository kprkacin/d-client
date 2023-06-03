/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, createContext, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";

type SettingsContextType = {
  opened: boolean;
  toggle: () => void;
  close: () => void;
};

const SettingsContext = createContext<SettingsContextType>({
  opened: false,
  toggle: () => {},
  close: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const SettingsProvider: React.FC<Props> = ({ children }) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const providerValue = useMemo(
    () => ({
      opened,
      toggle,
      close,
    }),
    [close, opened, toggle]
  );

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
