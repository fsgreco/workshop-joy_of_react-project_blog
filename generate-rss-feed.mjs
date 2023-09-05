import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import RSS from 'rss'

const readDirectory = (localPath) => fs.readdir( path.join(process.cwd(), localPath) )
const readFile = (localPath) => fs.readFile( path.join(process.cwd(), localPath), 'utf8' );

export async function getBlogPostList() {
  const fileNames = await readDirectory('/content');
  const blogPosts = [];

	for (let fileName of fileNames) {
		const rawContent = await readFile(`/content/${fileName}`);
		const { data: frontmatter } = matter(rawContent);
		blogPosts.push({ 
			slug: fileName.replace('.mdx', ''),
			...frontmatter,
		});
	}

  return blogPosts.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}


(async () => {
	const posts = await getBlogPostList()

	const feed = new RSS({
		title: 'Bits & Bytes',
    description: 'A wonderful blog about JavaScript',
    feed_url: 'http://localhost:3000/rss.xml', //TODO CHANGE FOR REAL CONSTANT OF SITEURL
    site_url: 'http://localhost:3000', // TODO AS ABOVE
	})

	posts.forEach(p => {
		feed.item({
			title: p.title,
			description: p.abstract,
			date: p.publishedOn,
			url: `http://localhost:3000/${p.slug}`
		})
	})

	await fs.writeFile('./public/rss.xml', feed.xml() )
})()