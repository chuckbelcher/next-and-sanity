import sanityClient from '../../sanityClient'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'



export default function BlogPost({ _id, title, name, likes  }) {
    const [likesState, setLikes] = React.useState(likes);
    const addLike = async () => {
        const { likes: newLikes } = await fetch('/api/handle-like', {
            method: 'POST',
            body: JSON.stringify({ _id }),
        }).then((response) => response.json());
        setLikes(newLikes);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <p>Posted by: {name}</p>
                <button onClick={addLike}>{likesState} Likes</button>
            </main>

        </div>
    )
}

export async function getStaticProps({ params }) {
    //Load blog data
    const slug = params.slug;
    const [post] = await sanityClient.fetch(
        `*[_type == 'post' && slug.current == '${slug}'] {
            _id,
            title, 
            'name': author->name,
            likes 
        }`
    );
    console.log(post)
    return { props: { ...post } }
}

export async function getStaticPaths() {
    //Get all page names
    const posts = await sanityClient.fetch(
        `*[_type == 'post'] { 'slug': slug.current }`
    );
    
    return {
        paths: posts.map(({ slug }) => `/blog/${slug}`), 
        fallback: false,
    }
    
}