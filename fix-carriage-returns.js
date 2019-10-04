'use strict'
const path = require('path')
const { promises, exists } = require('fs')
const fsExists = exists
const fs = promises
if (process.argv.length < 3) {
  console.log('Please provide a directory or filename')
  process.exit(-1)
}
if (process.argv.length > 3) {
  console.log('too many arguments')
  process.exit(-1)
}

async function replaceInFile(filename) {
  const data = await fs.readFile(filename)
  const newData = Buffer.from(data.filter(x => x !== 0x0d))
  await fs.writeFile(filename, newData)
  return newData.equals(data) ? 0 : 1
}

async function replaceInDirectory(dirname) {
  const files = await fs.readdir(dirname)
  let count = 0
  for (const file of files) {
    const newPath = path.resolve(dirname, file)

    if (await isDir(newPath)) {
      count += await replaceInDirectory(newPath)
    } else if (await isFile(newPath)) {
      count += await replaceInFile(newPath)
    } else {
      console.log(`Neither file or directory. Skipping: ${newPath}`)
    }
  }
  return count
}

async function isDir(pathName) {
  const stat = await fs.stat(pathName)
  return stat.isDirectory()
}

async function isFile(pathName) {
  const stat = await fs.stat(pathName)
  return stat.isFile()
}

async function main() {
  const basePath = path.resolve(process.argv[2])
  const exists = await new Promise((resolve, reject) => fsExists(basePath, resolve))

  if (!exists) {
    throw new Error(`Cannot find file or directory '${basePath}'`)
  }

  const isDirectory = await isDir(basePath)

  if (isDirectory) {
    return await replaceInDirectory(basePath)
  }

  const isFileResult = await isFile(basePath)

  if (!isFileResult) {
    throw new Error(`Neither file or directory: ${basePath}`)
  }
  return await replaceInFile(basePath)
}


main()
.then((count) => console.log(`Done! Converted ${count} files.`))
.catch(err => console.error(err))