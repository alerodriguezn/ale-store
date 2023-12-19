import { titleFont } from '@/config/fonts'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <h1>Hello</h1>
      <h1 className={ titleFont.className }>Hello2</h1>
    </main>
  )
}
