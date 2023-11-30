import React from "react";
import { TabsWrapper } from "./TabsWrapper";
import "./StyledTabsWrapper.scss";

interface StyledTabsWrapperProps {
  children: JSX.Element[];
}

export const StyledTabsWrapper: React.FC<StyledTabsWrapperProps> = ({
  children,
}) => {
  return (
    <div className="tabsWrapper">
      <TabsWrapper>{children}</TabsWrapper>
    </div>
  );
};
