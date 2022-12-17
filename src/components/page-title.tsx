import { ComponentProps } from 'react'

type Props = {} & ComponentProps<'div'>

export default function PageTitle({ title, children }: Props) {
  return (
    <div className='flex justify-between mb-4'>
      <h2 className='font-extrabold text-3xl text-gray-600'>{title}</h2>
      <div>{children}</div>
    </div>
  )
}
