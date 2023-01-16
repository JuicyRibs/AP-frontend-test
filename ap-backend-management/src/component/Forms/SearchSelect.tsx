import Select from 'react-select'

export interface ISearchSelect {
  value?: string
  onChange?: (newValue: any) => void
  options: any
  disabled?: boolean
}

export const SearchSelect = (props: ISearchSelect) => {
  const { value, onChange, options, disabled } = { ...props }
  return (
    <Select options={options} onChange={onChange} value={value} isDisabled={disabled}/>
  )
}
