require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  pathPrefix: "/front-end-engineering",
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: "Mesh Korea FE Blog",
    // Default title of the page
    siteTitleAlt: "Mesh Korea Frontend Blog",
    // Will be set on the <html /> tag
    siteLanguage: "ko",
    // Used for SEO
    siteDescription: "메쉬코리아 프론트엔드 팀 블로그 입니다.",
    // Can be used for e.g. JSONLD
    siteHeadline: `Mesh Koera FE Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://mesh.dev/front-end-engineering`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Links displayed in the header on the right side
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        formatString: "YYYY.MM.DD",
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Career`,
            url: `https://meshkorea.net/kr/career/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true, // CommonMark mode (default: true)
        footnotes: true, // Footnotes mode (default: true)
        pedantic: true, // Pedantic mode (default: true)
        gfm: true, // GitHub Flavored Markdown mode (default: true)
        plugins: ['gatsby-transformer-yaml'], // Plugins configs
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
  ].filter(Boolean),
}
