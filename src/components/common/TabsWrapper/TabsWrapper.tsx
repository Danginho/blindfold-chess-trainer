import React from "react";
import { TabPanel } from "@mui/base/TabPanel";
import { TabsList } from "@mui/base/TabsList";
import { Tabs } from "@mui/base/Tabs";
import { Tab } from "@mui/base/Tab";

interface TabsWrapperProps {
  children: JSX.Element[];
}

export const TabsWrapper: React.FC<TabsWrapperProps> = ({ children }) => {
  return (
    <Tabs defaultValue={0}>
      <TabsList>
        {children.map((child, index) => (
          <Tab key={index} value={index}>
            <p>{"Tab " + `${index}`}</p>
          </Tab>
        ))}
      </TabsList>
      {children.map((child, index) => (
        <TabPanel key={index} value={index}>
          {child}
        </TabPanel>
      ))}
    </Tabs>
  );
};
