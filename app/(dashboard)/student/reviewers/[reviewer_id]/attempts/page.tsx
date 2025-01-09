import { getUserAttemptHistory } from '@/actions/attempt.action'
import { auth } from '@/lib/auth'
import { Session } from 'next-auth'
import React from 'react'

export default async function AttemptsPage() {
  const session:Session | null= await auth()
  if(!session) return 
  const attempts = await getUserAttemptHistory(Number(session.user.id))
  console.log("Attempts: ", attempts)
  return (
    <div>atte</div>
  )
}
