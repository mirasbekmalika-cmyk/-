set -e
node /home/claude/tools/extract.js /home/claude/out/src 2>/tmp/extract.log
node /home/claude/tools/postprocess.js /home/claude/out/src
python3 /home/claude/tools/fixes.py /home/claude/out/src
cd /home/claude/app && rm -rf src && cp -r /home/claude/out/src src && mkdir -p src/styles && cp /home/claude/work/pretty.css src/styles/app.css && printf "import './styles/app.css';\nimport './app/bootstrap';\n" > src/main.tsx
npx vite build 2>&1 | tail -2
