'use client'

import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssVarsProvider } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import { AppProps } from 'next/app'
import createEmotionCache from '@/libs/createEmotionCache'
import { useState } from 'react'
import { usePathname, useServerInsertedHTML } from 'next/navigation'
import theme from '@/libs/theme'

export default function ThemeRegistry(props: any) {
  const { options, children } = props

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider
        defaultMode='system'
        theme={theme}
        modeStorageKey='mode-key'
        disableNestedContext
      >
        {/* the custom theme is optional */}
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              overflowY: 'scroll',
            },
            a: {
              textDecoration: 'none',
              color: 'var(--joy-palette-primary-500)',
            },
            'a:hover': {
              color: 'var(--joy-palette-primary-600)',
            },
            'a:active': {
              color: 'var(--joy-palette-primary-700)',
            },
            li: {
              paddingLeft: '0 !important',
            },
          }}
        />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  )
}
