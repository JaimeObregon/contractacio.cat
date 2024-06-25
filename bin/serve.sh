#!/bin/bash

esbuild \
  httpdocs/website.js \
  httpdocs/website.css \
  --format=esm \
  --bundle \
  --minify \
  --legal-comments=none \
  --external:"/fonts/*" \
  --outdir=httpdocs/build \
  --servedir=httpdocs \
  --serve-fallback=httpdocs/index.html \
  --watch
