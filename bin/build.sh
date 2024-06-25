#!/bin/bash

yarn || exit 1

esbuild \
  httpdocs/website.js \
  httpdocs/website.css \
  --format=esm \
  --bundle \
  --minify \
  --legal-comments=none \
  --external:"/fonts/*" \
  --outdir=httpdocs/build \

# Esta es la semántica de `sed` para el entorno Linux de Netlify.
# La semántica de `sed` en macOS es diferente.
sed -E "s/\/(app\.(css|js))/\/build\/\1/" -i httpdocs/index.html
