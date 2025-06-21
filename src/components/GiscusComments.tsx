import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComments() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="clameyes/chemary-docs"
      repoId="R_kgDOO_ZKuw"
      category="Announcements"
      categoryId="DIC_kwDOO_ZKu84CrznX"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      lang="ja"
      loading="lazy"
    />
  );
}