#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const prettier = require('prettier')
const { paramCase } = require('change-case')

function getPrettierConfig() {
  return prettier.resolveConfig(
    path.join(__dirname, `../../../.prettierrc.yaml`)
  )
}

async function formatWithPrettier(source, parser = 'babel-ts') {
  const config = await getPrettierConfig()
  return prettier.format(source, {
    ...config,
    parser,
  })
}

function getIndexSnippet(component) {
  const snippet = `
    'use client';
    import React from 'react'
    import Mui${component} from '@mui/material/${component}'
    
    export { default as ${component} } from '@mui/material/${component}'
    export type { ${component}Props } from '@mui/material/${component}'
    export type ${component}Ref = React.ComponentRef<typeof Mui${component}> 
  `

  return formatWithPrettier(snippet)
}

async function addMuiComponent(component) {
  try {
    require(`@mui/material/${component}`)
  } catch {
    console.error(
      `\x1b[31m[Skipping] The component "${component}" not found in @mui/material\x1b[0m`
    )
    return false
  }

  const outDir = path.join(
    __dirname,
    `../src/components/ui/${paramCase(component)}`
  )
  if (fs.existsSync(outDir)) {
    console.error(
      `\x1b[31m[Skipping] The component "${paramCase(
        component
      )}" already exists in @/components/ui\x1b[0m`
    )
    return false
  }

  const indexSnippet = await getIndexSnippet(component)
  const indexSnippetFile = path.join(outDir, 'index.ts')

  fs.mkdirSync(outDir)
  fs.writeFileSync(indexSnippetFile, indexSnippet, { encoding: 'utf8' })
  console.log(`\x1b[32mThe component "${component}" was added\x1b[0m`)

  return true
}

if (require.main === module) {
  process.argv.slice(2).forEach(addMuiComponent)
}
