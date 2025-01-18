#!/usr/bin/env node

const clipboardy = require('clipboardy').default
const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Usage: haku [option] [words]')
  console.log('Options:')
  console.log('  -C | -c : camelCase')
  console.log('  -P | -p : PascalCase')
  console.log('  -S | -s : snake_case')
  console.log('  -U | -u : UPPERCASE')
  console.log('  -D | -d : lowercase')
  process.exit(1)
}

const option = args[0]
const words = args.slice(1)

function toCamelCase(words) {
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      } else {
        return word?.[0].toUpperCase() + word.slice(1).toLowerCase()
      }
    })
    .join('')
}

function toPascalCase(words) {
  return words
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

function toSnakeCase(words) {
  return words.map((word) => word.toLowerCase()).join('_')
}

function toUpperCase(words) {
  return words.join('').toUpperCase()
}

function toLowerCase(words) {
  return words.join('').toLowerCase()
}

let result = ''
switch (option) {
  case '-C':
  case '-c':
    result = toCamelCase(words)
    break
  case '-P':
  case '-p':
    result = toPascalCase(words)
    break
  case '-S':
  case '-s':
    result = toSnakeCase(words)
    break
  case '-U':
  case '-u':
    result = toUpperCase(words)
    break
  case '-D':
  case '-d':
    result = toLowerCase(words)
    break
  default:
    console.log('Unknown option:', option)
    process.exit(1)
}

// 클립보드에 복사
clipboardy
  .write(result)
  .then(() => {
    console.log('Copied: ', result)
  })
  .catch((err) => {
    console.error('Clipboard write failed:', err.message)
  })
