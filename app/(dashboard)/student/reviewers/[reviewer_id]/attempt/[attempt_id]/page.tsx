<<<<<<< HEAD
export default function AttemptPage() {
  return <div>AttemptPage</div>;
=======
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
      <Attempt test_items={attempt}  />
    </div>
  )
>>>>>>> 2fd73b6ab6c588c0df0e3a51f55d13fc0192892a
}
