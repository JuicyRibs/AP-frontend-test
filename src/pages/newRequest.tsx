import { Button } from '@/component/Element/Button'
import { SearchSelect } from '@/component/Forms/SearchSelect'
import { TextField } from '@/component/Forms/TextField'
import { RequestFormValue, ServiceType, User } from '@/types/Service'
import { Formik, Form, FormikProps } from 'formik'
import { useState, useEffect } from 'react'

interface INewRequest {
  usersData: User[]
  usersOption: {value: string, label:string}[]
  updateRequest: (request: RequestFormValue) => void
  updateUsers: (user: User) => void
}

const formInitValues: RequestFormValue = {
  detail: {
    requester: '',
    type: ServiceType.complain,
    address_no: '',
    developer: '',
    note: '',
  },
  repair: {
    category: '',
    details: '',
  },
}

const userInitValue: User = {
  full_name: '',
  id: '',
  phone_no: '',
}

export const NewRequest = ({
  usersData,
  usersOption,
  updateRequest,
  updateUsers,
}: INewRequest) => {
  const [repair, setRepair] = useState(false)
  const [formValue, setFormValue] = useState<RequestFormValue>(formInitValues)
  const [mode, setMode] = useState<String>()
  const [newUserName, setNewUserName] = useState<string>('')
  const [newUserPhone, setNewUserPhone] = useState<string>('')

  useEffect(() => {
    setMode('view')
    console.log(usersData)
    const userOption = usersData?.map(u => {
      return { value: u.id, label: `${u.full_name}: ${u.phone_no}` }
    })
    //@ts-ignore
  }, [])

  const toggleMode = (mode: string) => {
    setMode(mode)
  }

  const onSelectUser = (user: { value: string; label: string }) => {
    const newValue: RequestFormValue = { ...formValue }
    newValue.detail.requester = user.value
    setFormValue(newValue)
  }

  const onSelectServiceType = (type: { value: string; label: string }) => {
    const newValue: RequestFormValue = { ...formValue }
    newValue.detail.type = type.value
    setFormValue(newValue)
    setRepair(type.value === ServiceType.repair)
  }

  const resetForm = () => {
    setFormValue({ ...formInitValues })
    setRepair(false)
    toggleMode('view')
  }

  const onSubmit = (data: RequestFormValue) => {
    updateRequest(data)
    resetForm()
  }

  return (
    <>
      <Formik initialValues={formInitValues} onSubmit={onSubmit}>
        {(props: FormikProps<RequestFormValue>) => (
          <Form className='space-y-2'>
            <label>ค้นหาผู้ใช้งาน</label>
            <SearchSelect
              options={usersOption}
              onChange={onSelectUser}
              disabled={mode === 'add'}
            />
            {mode === 'view' && (
              <div className='flex justify-between space-x-2'>
                <Button
                  text='เพิ่มรายการใหม่'
                  className='w-2/3'
                  onClick={() => {
                    props.resetForm()
                    toggleMode('add')
                  }}
                />
                <Button
                  text='เพิ่มผู้ใช้ใหม่'
                  className='w-1/3'
                  onClick={() => toggleMode('user')}
                />
              </div>
            )}
            {mode === 'user' && (
              <div className='space-y-2'>
                <label htmlFor='fullname'>ชื่อเต็ม</label>
                <TextField
                  id='fullname'
                  name='full_name'
                  placeholder='ชื่อ นามสกุล'
                  onChange={e => setNewUserName(e.target.value)}
                />
                <label htmlFor='phoneNo'>เบอร์โทร</label>
                <TextField
                  id='phoneNo'
                  name='phone_no'
                  placeholder='0xxxxxxxxx'
                  onChange={e => setNewUserPhone(e.target.value)}
                />
                <div className='flex justify-between space-x-2'>
                  <Button
                    className='w-2/3'
                    type='button'
                    text='เพิ่มผู้ใช้'
                    onClick={() => {
                      const id: number = +usersData[usersData.length-1]?.id!
                      const newUser: User = {
                        id: `${id + 1}`,
                        full_name: newUserName,
                        phone_no: newUserPhone,
                      }
                      updateUsers(newUser)
                    }}
                  />
                  <Button text='Cancel' onClick={resetForm} className='w-1/3' />
                </div>
              </div>
            )}
            {mode === 'add' && (
              <div className='space-y-2 flex flex-col'>
                <label htmlFor='type'>ประเภท</label>
                <SearchSelect
                  options={[
                    { value: ServiceType.repair, label: 'งานซ่อม' },
                    { value: ServiceType.complain, label: 'Complain' },
                    { value: ServiceType.appeal, label: 'ร้องเรียน' },
                    { value: ServiceType.enquire, label: 'สอบถามข้อมูล' },
                  ]}
                  onChange={onSelectServiceType}
                />
                {repair && (
                  <>
                    <label htmlFor='repairCategory'>ประเภทงานซ่อม</label>
                    <TextField
                      id='repairCategory'
                      name='repair.category'
                      placeholder='ประปา'
                    />
                    <label htmlFor='repairDetails'>รายละเอียดงานซ่อม</label>
                    <TextField
                      id='repairDetails'
                      name='repair.details'
                      placeholder='ท่อรั่ว'
                    />
                  </>
                )}
                <label htmlFor='address_no'>บ้านเลขที่</label>
                <TextField
                  id='address_no'
                  name='detail.address_no'
                  placeholder='1234/567'
                />
                <label htmlFor='developer'>โครงการ</label>
                <TextField
                  id='developer'
                  name='detail.developer'
                  placeholder='The City'
                />
                <label htmlFor='note'>รายละเอียดเพิ่มเติม</label>
                <TextField
                  as='textarea'
                  id='note'
                  name='detail.note'
                  placeholder='เพิ่มเติม'
                />
                <div className='flex justify-between space-x-2'>
                  <Button type='submit' className='w-2/3' text='Submit' />
                  <Button text='Cancel' onClick={resetForm} className='w-1/3' />
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
