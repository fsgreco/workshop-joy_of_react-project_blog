import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';
import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

export const metadata = {
	title: BLOG_TITLE,
	description: BLOG_DESCRIPTION
}

async function Home() {
	const posts = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

			{posts?.map( (post) => <BlogSummaryCard {...post} key={post.slug} />) }

    </div>
  );
}

export default Home;
