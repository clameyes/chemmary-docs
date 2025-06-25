import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '16px',
            display: 'inline-block',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            <img 
              src="/img/chemmary_icon_512x512.png" 
              alt="Chemmary Logo" 
              width="128" 
              height="128"
              style={{borderRadius: '16px'}}
            />
          </div>
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            ユーザーガイドを見る
          </Link>
          <Link
            className="button button--primary button--lg"
            to="https://chemmary.com">
            Chemmary β版を使ってみる
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 化学分野の情報収集ポータル`}
      description="Chemmaryは化学分野の研究者、学生、技術者のための情報収集ポータルサイトです。最新の論文アブストラクトを一箇所で効率的に確認できます。">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="text--center">
                  <h3>🔍 統合された情報源</h3>
                  <p>主要な化学系論文誌の最新情報を一箇所に集約。複数のサイトを巡回する手間を省きます。</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center">
                  <h3>📱 モバイルファースト</h3>
                  <p>スマートフォンで快適に閲覧。通勤時間や休憩時間にサッと最新情報をチェックできます。</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center">
                  <h3>⚡ 高速・無料</h3>
                  <p>SSGによる高速ページロード。トラッキングなしで完全無料でご利用いただけます。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
