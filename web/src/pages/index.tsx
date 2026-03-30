import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ReactElement } from "react";
import styles from "./index.module.css";

const features = [
  {
    icon: "⚡",
    title: "Production Ready",
    description:
      "Battle-tested hooks for real-world apps. Stable, well-documented, and actively maintained.",
  },
  {
    icon: "◆",
    title: "TypeScript First",
    description:
      "Full type safety, generics, and IntelliSense out of the box on every single hook.",
  },
  {
    icon: "◉",
    title: "Zero Dependencies",
    description:
      "React is all you need. No extra packages, no version conflicts, no bundle bloat.",
  },
  {
    icon: "◈",
    title: "Tree Shakeable",
    description:
      "Import only what you use. Dead code is eliminated automatically by your bundler.",
  },
];

export default function Home(): ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Documentation" description={siteConfig.tagline}>
      {/* ── Hero ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            22+ Hooks &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; MIT License
          </div>

          <h1 className={styles.heroTitle}>
            The React hooks library
            <br />
            <span className={styles.heroAccent}>built for scale.</span>
          </h1>

          <p className={styles.heroSub}>{siteConfig.tagline}</p>

          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to="/docs/installation">
              Get Started <span aria-hidden="true">→</span>
            </Link>
            <div className={styles.installPill}>
              <span className={styles.installPrompt}>$</span>
              <span className={styles.installCmd}>npm install hookstorm</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────── */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Start ───────────────────────────── */}
      <section className={styles.quickstart}>
        <div className="container">
          <div className={styles.quickstartInner}>
            <div className={styles.quickstartText}>
              <h2>Start in seconds.</h2>
              <p>
                Install the package and import any hook directly into your
                component. No setup, no configuration required.
              </p>
              <Link className={styles.btnOutline} to="/docs/installation">
                Read the docs →
              </Link>
            </div>

            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeDot} />
                <span className={styles.codeDot} />
                <span className={styles.codeDot} />
                <span className={styles.codeFile}>App.tsx</span>
              </div>
              <pre className={styles.codePre}>
                <span className={styles.cKw}>import</span>
                {" { useState } "}
                <span className={styles.cKw}>from</span>
                {" "}
                <span className={styles.cStr}>&quot;react&quot;</span>
                {";\n"}
                <span className={styles.cKw}>import</span>
                {" { useDebounce } "}
                <span className={styles.cKw}>from</span>
                {" "}
                <span className={styles.cStr}>&quot;hookstorm&quot;</span>
                {";\n\n"}
                <span className={styles.cKw}>function</span>
                {" "}
                <span className={styles.cFn}>Search</span>
                {"() {\n  "}
                <span className={styles.cKw}>const</span>
                {" [query, setQuery] = "}
                <span className={styles.cFn}>useState</span>
                {"("}
                <span className={styles.cStr}>&quot;&quot;</span>
                {");\n  "}
                <span className={styles.cKw}>const</span>
                {" debounced = "}
                <span className={styles.cFn}>useDebounce</span>
                {"(query, "}
                <span className={styles.cNum}>500</span>
                {");\n\n  "}
                <span className={styles.cCmt}>{"// fires only after 500ms pause"}</span>
                {"\n  "}
                <span className={styles.cKw}>return</span>
                {" <input onChange="}
                {"{ e => "}
                <span className={styles.cFn}>setQuery</span>
                {"(e.target.value) }"}
                {" />;\n}"}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
