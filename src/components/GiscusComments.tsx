import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComments() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="clameyes/chemary-docs"
      repoId="R_kgDONkQE-g"
      category="Announcements"
      categoryId="DIC_kwDONkQE-s4CkQpZ"
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