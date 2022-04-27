import { MDXProvider } from "@mdx-js/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import TestRenderer from "react-test-renderer";
import YouTube from "react-youtube";

const renderComponenet = (component) =>
  TestRenderer.create(
    <MDXProvider
      components={{
        pre: (preProps) => {
          return <pre {...preProps} />;
        },
        Tabs,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        BlockMath,
        InlineMath,
        YouTube,
      }}
    >
      {React.createElement(component)}
    </MDXProvider>
  );

export default renderComponenet;
