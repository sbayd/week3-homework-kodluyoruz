import React from 'react';
import { useState } from 'react';


const TabHeader = ({
  activeTab,
  tabNames = [],
  onTabChange
}) => {
  
  const buttons = tabNames
    .map(({ title, name }) => {
      const isActiveTab = name === activeTab;
      return (
        <button
          key={name}
          style={{
            backgroundColor: isActiveTab ? 'red' : 'gray'
          }}
          onClick={() =>onTabChange(name) }
        >
          {title}
        </button>
      )}
    );
    return (<div>
      {buttons}
    </div>)
}

const Tabs = ({
  initialTab,
  tabs = []
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].name);
  const handleTabChange = (newTabName) => { setActiveTab(newTabName); };

  const tabNames = React.useMemo(() => tabs.map((tab) => ({ name: tab.name, title: tab.title })), [tabs]);
  
  const activeTabObj = React.useMemo(() => tabs.find((tab) => tab.name === activeTab), [tabs, activeTab]);

  const ActiveComponent = activeTabObj.component;

  return (<>
    <TabHeader
      activeTab={activeTab}
      tabNames={tabNames}
      onTabChange={handleTabChange}
    />
    <div>
      <ActiveComponent />
    </div>
  </>)
  
};

export default Tabs;