/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const fetch = require('node-fetch');
require('dotenv').config({
  path: '.env',
});

exports.onPreInit = () => console.log('Loaded gatsby-starter-plugin');

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const NODE_TYPE = 'PodcastEpisode';

  const response = await fetch(
    'https://www.buzzsprout.com/api/1081172/episodes.json',
    {
      headers: {
        Authorization: `Token token=${process.env.BUZZSPROUT_TOKEN}`,
      },
    },
  );

  const episodes = await response.json();

  episodes.forEach((episode) => {
    actions.createNode({
      ...episode,
      id: createNodeId(`${NODE_TYPE}-${episode.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(episode),
        contentDigest: createContentDigest(episode),
      },
    });
  });
};
