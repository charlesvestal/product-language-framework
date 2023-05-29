import React, { useMemo } from 'react';
import { getMDXComponent } from "mdx-bundler/client";

function parseHeading(props) {
  const children = props.children.map(child => 
    <a href='#' tabIndex='-1' aria-disabled disabled='disabled'>{child.props.value}</a>
  );
  return children;
}

export const Usage = (props) => {
  const content = <>{props.children}</>;

  const ContentComponent = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className={`usage usage-${props.type}`}>
      <ContentComponent />
    </div>
  );
};

export const UsageBlock = (props) => {
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8'>{props.children}</div>;
};