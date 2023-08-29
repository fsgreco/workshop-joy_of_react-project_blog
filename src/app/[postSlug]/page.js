import React from 'react';
import dynamic from 'next/dynamic';
//import path from 'path'
//import fs from 'node:fs/promises'
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';


const componentMap = {
	pre: CodeSnippet,
	DivisionGroupsDemo: dynamic(() => import('@/components/DivisionGroupsDemo'), {ssr: false})
}

export async function generateMetadata({ params }) {
	const { frontmatter } = await loadBlogPost(params.postSlug)
  return {
    title: frontmatter.title,
		description: frontmatter.abstract
  };
}

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
				<MDXRemote source={content} components={componentMap} />
      </div>
    </article>
  );
}

export default BlogPost;
