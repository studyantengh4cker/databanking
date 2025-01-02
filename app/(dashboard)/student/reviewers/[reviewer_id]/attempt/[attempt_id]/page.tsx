import { getAttemptQuestions } from '@/actions/attempt.action'
import Header from '@/components/dashboard/colleges/Header'
import React from 'react'
import Attempt from './Attempt'

export default async function TakeAttempt({ params }: any) {
  const {attempt_id} = await params
  if(!attempt_id) return

  const attempt = await getAttemptQuestions(attempt_id)
  console.log(attempt)
  return (
    <div>
      <Header title='Attempt' />
      <Attempt test_items={attempt} handle_answer={undefined} handle_flag={undefined} />
    </div>
  )
}
