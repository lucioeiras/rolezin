'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import OrganizerContext from '@/contexts/organizer'

export default function Home() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  console.log(organizerContext.data.token)

  organizerContext.data.token ? router.push('/home') : router.push('/signin')
}
