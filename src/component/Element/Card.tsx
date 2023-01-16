interface ICard {
  title?: string
  subtitle?: string
  detail?: string
}

export const Card = ({ title,subtitle, detail }: ICard) => {
  return (
    <>
      <div className='rounded shadow-md p-2'>
        <div className='font-bold text-m'>{title}</div>
        <div className='text-m font-semibold'>{subtitle}</div>
        <div>{detail}</div>
      </div>
    </>
  )
}
