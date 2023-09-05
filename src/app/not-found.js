import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{maxWidth: 880, marginInline:'auto', padding: '0 var(--viewport-padding)'}}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}