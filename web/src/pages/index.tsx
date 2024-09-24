import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={"Documentation"} description={siteConfig.tagline}>
      <header
        style={{
          padding: "4rem 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className={clsx("hero hero--primary")}
      >
        <div className="container">
          <img style={{ width: 256 }} src="img/logo.svg" />
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              className="button button--secondary button--lg"
              to="/docs/installation"
            >
              Hookstorm Guide - 2min ⏱️
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
