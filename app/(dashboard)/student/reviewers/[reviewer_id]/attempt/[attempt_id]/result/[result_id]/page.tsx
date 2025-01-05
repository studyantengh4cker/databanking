import Header from '@/components/dashboard/colleges/Header'
import React from 'react'

export default async function ResultIDPage({params}: any) {
  const {id} = await params
  if(!id) return

  return (
    <div>
        <Header title={""} />
    </div>
  )
}
