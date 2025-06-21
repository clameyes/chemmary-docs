import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import GiscusComments from '@site/src/components/GiscusComments';

export default function DocItemLayoutWrapper(props) {
  return (
    <>
      <DocItemLayout {...props} />
      <div style={{ marginTop: '2rem' }}>
        <GiscusComments />
      </div>
    </>
  );
}