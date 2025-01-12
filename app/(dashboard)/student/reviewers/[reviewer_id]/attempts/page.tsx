import { getUserAttemptHistory } from '@/actions/attempt.action'
import { auth } from '@/lib/auth'
import { Session } from 'next-auth'
import React from 'react'
import Attempts from './Attempts'
import { AttemptType } from '../attempt/[attempt_id]/page'
import Header from '@/components/dashboard/colleges/Header'

export default async function AttemptsPage() {
  const session:Session | null= await auth()
  if(!session) return 
  const attempts: AttemptType[] = await getUserAttemptHistory(Number(session.user.id))
  
  return (
    <div> 
      <Header title='Attempts'/>
      <Attempts attempts={attempts} />
    </div>
  )
}
