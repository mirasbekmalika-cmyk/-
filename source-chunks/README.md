# Source chunks

The original standalone application is split into ordered parts because of GitHub API request-size limits. Do not edit individual parts unless you intend to rebuild the original HTML. The GitHub Actions workflow concatenates `index.html.part-*` in lexical order to recreate the root `index.html`.
