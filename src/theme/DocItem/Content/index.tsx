import React from 'react';
import DocItemContent from '@theme-original/DocItem/Content';
import GiscusComments from '@site/src/components/GiscusComments';

export default function DocItemContentWrapper(props) {
  return (
    <>
      <DocItemContent {...props} />
      <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        <hr style={{ 
          marginBottom: '2rem',
          border: 'none',
          borderTop: '1px solid var(--ifm-color-emphasis-300)'
        }} />
        <GiscusComments />
      </div>
    </>
  );
}