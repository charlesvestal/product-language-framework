import { Component } from 'react';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Content from '../../components/Content';

const PageTemplate = props => (
  <Layout>
    <Content path='foundations' {...props} key={props.slug} />
  </Layout>
);

export default PageTemplate;

PageTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;
  const config = await import(`../../data/config.json`);
  const content = await import(`../../docs/foundations/${slug}.md`);
  const pageData = matter(content.default);

  // Get pages from docs folder
  // Get all .md files from the docs dir
  const pages = (ctx => {
    const keys = ctx.keys();
    const values = keys.map(ctx);
    const data = keys.map((key, index) => {
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');

       const value = values[index];
       const document = matter(value.default);
       return {
         title: document.data.title,
         order: document.data.order,
         document,
         slug,
       };
    });
    return data;
  })(require.context('../../docs/foundations', true, /\.md$/));

  return {
    siteTitle: config.title,
    slug,
    pages,
    ...pageData
  }
}