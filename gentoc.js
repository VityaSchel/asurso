import fs from 'fs/promises'

let contents = await fs.readFile(process.argv[2], 'utf-8')
contents = contents.replace(/<!-- TOC-START -->[\w\W]*<!-- TOC-END -->/, '%TOC%')

contents = contents.replaceAll('&lt;', '<').replaceAll('&gt;', '>')

const headings = Array.from(contents.matchAll(/^(##?#?) (.*)$/gm))
  .map(array => array.slice(1,3))
  .map(heading => `${' '.repeat((heading[0].length-1)*2)}- [${heading[1].replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')}](#${heading[1].replaceAll(/[^a-zA-Zа-яА-Я0-9 ]/g, '').replaceAll(' ', '-').toLowerCase()})`)

contents = contents.replaceAll(/(?<!".*)</gm, '&lt;').replaceAll(/(?<!".*)>/gm, '&gt;')

contents = contents.replace(/%TOC%/, `<!-- TOC-START -->
## Таблица контента

${headings.join('\n')}
<!-- TOC-END -->`)

await fs.writeFile(process.argv[2], contents)
