import { Reviewer } from '@/lib/types'

interface ReviewerInfoProps{
    reviewer: Reviewer
}

export default function ReviewerInfo({reviewer}:ReviewerInfoProps) {
  return (
    <div className='flex flex-col w-full [&_p]:m-0 [&_h1]:text-2xl py-10'>
        <div className="description">
            <h1>Description</h1>
            <p>{reviewer.reviewer_description}</p>
        </div>
        <div className="group">
            <div className="school-year flex flex-col items-start">
                <h1>School Year</h1>
                <p>{reviewer.school_year}</p>
            </div>
            <div className="time-limit"></div>
        </div>
    </div>
  )
}
