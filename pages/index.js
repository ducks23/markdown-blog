import Head from "next/head";
import { motion } from "framer-motion";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section
        style={{ maxWidth: "300px", margin: "auto" }}
        className={utilStyles.headingMd}
      >
        <p style={{ maxWidth: "9000px" }} className="paragraph_idx">
          Welcome human{" "}
        </p>
      </section>
      {/* <Link href={"/subscribe"}> */}
      {/*   <div */}
      {/*     style={{ margin: "auto", maxWidth: "160px", textAlign: "center" }} */}
      {/*     className="example-container" */}
      {/*   > */}
      {/*     <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}> */}
      {/*       {" "} */}
      {/*       <div */}
      {/*         style={{ margin: "auto" }} */}
      {/*         className="link-button" */}
      {/*         href="/subscribe" */}
      {/*       > */}
      {/*         Subscribe{" "} */}
      {/*       </div> */}
      {/*     </motion.div> */}
      {/*   </div> */}
      {/* </Link> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <div>
                <Link style={{ textAlign: "center" }} href={`/posts/${id}`}>
                  {title}
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
