import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='flex w-full justify-center text-xs mb-10'>
        <Link
         href={'/'}
        >
          <span className={`${titleFont.className} antialiased font-bold ` }>Ale</span>
          <span>| Store</span>
          <span>© {new Date().getFullYear()}</span>
        </Link>
        <Link href={'/'} className='mx-3'>
            Privacy & Legal
        </Link>
        <Link href={'/'} className='mx-3'>
            Contact
        </Link>

    </footer>
  )
}
