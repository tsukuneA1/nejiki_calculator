const factoryPokemons = require("./prisma/seed/source/factory-pokemons.json");

const pokemonIds = [
  ...new Set(factoryPokemons.map(({ pokemon }) => pokemon.id)),
].sort((a, b) => a - b);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nejiki-calculator.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    additionalSitemaps: [],
  },
  changefreq: "weekly",
  priority: 0.8,
  sitemapSize: 5000,
  exclude: ["/instruction-manual"],
  additionalPaths: async () =>
    pokemonIds.map((pokemonId) => ({
      loc: `/pokemon/${pokemonId}`,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })),
  transform: async (config, path) => {
    // ページ別の優先度とメタデータを設定
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    if (path === "/poke-search") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
