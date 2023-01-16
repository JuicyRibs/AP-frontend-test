import { Field } from 'formik'

interface ITextField {
  id: string
  name: string
  placeholder: string
  as? :string
  onChange?: (e: any) => void
}

export const TextField = ({ id, name, placeholder, as, onChange }: ITextField) => {
  return (
    <div className='border rounded-xl shadow-lg'>
      <Field onChange={onChange} as={as} id={id} name={name} placeholder={placeholder} style={{padding: '0.5rem', width: '100%'}}/>
    </div>
  )
}
