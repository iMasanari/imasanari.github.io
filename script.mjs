import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'

const template = (path) =>
  `<!DOCTYPE html>
<html lang="ja">
  <meta charset="utf-8">
  <title>Redirecting&hellip;</title>
  <link rel="canonical" href="${path}">
  <script>location="${path}"</script>
  <meta http-equiv="refresh" content="0; url=${path}">
  <h1>Redirecting&hellip;</h1>
  <a href="${path}">Click here if you are not redirected.</a>
</html>
`

// find -f **/*.html
const text = await readFile('./pages.txt', 'utf-8')

const pages = text.split('\n')

for (const path of pages) {
  const pagePath = `https://blog.imasanari.dev/${ path.replace(/^blog\//, 'posts/').replace(/index\.html$/, '') }`
  console.log(`${path} -> ${pagePath}`)

  await mkdir(dirname(join('dist', path)), { recursive: true })
  await writeFile(join('dist', path), template(pagePath))
}
