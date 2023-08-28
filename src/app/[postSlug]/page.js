import React from 'react';
//import path from 'path'
//import fs from 'node:fs/promises'
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

async function BlogPost({params}) {
	const { postSlug } = params
	// Read the content of a locally-stored file as a string:
	// let content = await fs.readFile( path.join( process.cwd(), `/content/${postSlug}.mdx` ), 'utf8' )
	const { frontmatter, content } = await loadBlogPost(postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
				<MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
