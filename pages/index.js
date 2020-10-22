import Head from 'next/head'
import Link from 'next/link'
import sanityClient from '../sanityClient'
import styles from '../styles/Home.module.css'

export default function Home( { posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sanity and Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Read My Blog
        </h1>

        {posts.map(post => (
            <article key={post._id}>
              <h2>
                <Link href={`/blog/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
            </article>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await sanityClient.fetch(
    `*[_type == 'post'] { _id, title, 'slug': slug.current }`
  );

  return {
    props: {
      posts
    }
  }
}