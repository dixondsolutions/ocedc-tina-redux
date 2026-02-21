"use client";
import React, { useState, useContext } from "react";

export interface HeaderData {
  icon?: { name?: string | null; color?: string | null; style?: string | null } | null;
  name?: string | null;
  color?: string | null;
  nav?: Array<{ href?: string | null; label?: string | null; id?: string | null }> | null;
  utility?: {
    links?: Array<{ label?: string | null; href?: string | null; id?: string | null }> | null;
    phoneLabel?: string | null;
    phoneNumber?: string | null;
    phoneHref?: string | null;
    actions?: Array<{ label?: string | null; href?: string | null; id?: string | null }> | null;
  } | null;
}

export interface FooterData {
  social?: Array<{
    icon?: { name?: string | null; color?: string | null; style?: string | null } | null;
    url?: string | null;
    id?: string | null;
  }> | null;
  newsletter?: {
    title?: string | null;
    description?: string | null;
    buttonText?: string | null;
  } | null;
  contact?: {
    address?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
}

export interface ThemeData {
  color?: string | null;
  font?: string | null;
  darkMode?: string | null;
}

export interface GlobalSettings {
  header: HeaderData;
  footer: FooterData;
  theme: ThemeData;
}

interface LayoutState {
  globalSettings: GlobalSettings;
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  theme: ThemeData;
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: "blue",
        darkMode: "default",
      },
      globalSettings: undefined,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalSettings;
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<{}>(initialPageData);

  const theme = globalSettings.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
