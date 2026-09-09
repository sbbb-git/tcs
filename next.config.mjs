/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages serves a fully static site: every page, including each
  // blog post, is emitted as real HTML at build time. That is what makes the
  // content indexable without Google having to execute any JavaScript.
  output: "export",

  // Static hosts resolve /blog/slug/ to /blog/slug/index.html.
  trailingSlash: true,

  // next/image needs a server to optimise on the fly, which `output: export`
  // does not provide.
  images: { unoptimized: true },

  reactStrictMode: true,
};

export default nextConfig;
