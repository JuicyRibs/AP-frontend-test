/* eslint-disable react/jsx-key */
import Head from 'next/head'
import {
  RepairDetails,
  RequestFormValue,
  ServiceRequest,
  User,
} from '@/types/Service'
import { NewRequest } from './newRequest'
import fsPromises from 'fs/promises'
import path from 'path'
import { Card } from '@/component/Element/Card'
import { useEffect, useState } from 'react'
import { stringify } from 'querystring'

export interface IMockData {
  users: User[]
  requests: RequestFormValue[]
}

export default function Home(props: IMockData) {
  const [requests, setRequests] = useState<RequestFormValue[]>()
  const [usersData, setUsersData] = useState<User[]>()
  const [cardList, setCardList] = useState<JSX.Element[]>()
  const [userOption, setUserOption] =
    useState<{ value: string; label: string }[]>()

  useEffect(() => {
    setRequests(props.requests)
    setUsersData(props.users)
    const list = generateCardList(props.requests)
    const userList = generateUserOptions(props.users)
    setUserOption(userList)
    setCardList(list)
  }, [])

  useEffect(() => {
    const list = generateCardList(requests)
    setCardList(list)
  }, [requests])

  useEffect(() => {
    const list = generateUserOptions(usersData)
    setUserOption(list)
  }, [usersData])

  const generateCardList = (requests?: RequestFormValue[]) => {
    const list = requests?.map(req => (
      <Card
        title={`${req.detail.address_no} : ${req.detail.developer}`}
        subtitle={
          props.users.filter(u => u.id === req.detail.requester)[0]?.full_name
        }
        detail={`${
          req.repair
            ? `${req.detail.type} ${req.repair.category} ${req.repair.details}`
            : req.detail.type
        } ${req.detail.note}`}
      />
    ))
    return list
  }

  const generateUserOptions = (usersData?: User[]) => {
    const userOption = usersData?.map(u => {
      return { value: u.id, label: `${u.full_name}: ${u.phone_no}` }
    })
    return userOption
  }

  const updateRequest = (data: RequestFormValue) => {
    setRequests(requests => [...requests!, data])
  }

  const updateUsers = (data: User) => {
    setUsersData(usersData => [...usersData!, data])
  }

  return (
    <>
      <Head>
        <title>AP Service</title>
        <meta name='description' content='ระบบบริการหลังการขาย บ้านและคอนโด' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container p-2'>
        <div className='text-xl font-semibold px-2'>
          ระบบบริการหลังการขาย บ้านและคอนโด
        </div>
        <div className='rounded-xl shadow-xl py-4 px-2 mb-6'>
          <NewRequest
            usersOption={userOption!}
            usersData={usersData || props.users}
            updateRequest={updateRequest}
            updateUsers={updateUsers}
          />
        </div>
        <div className='px-2 pb-2'>รายการปัจจุบัน</div>
        {cardList}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'MockUserData.json')
  const jsonData = await fsPromises.readFile(filePath)
  //@ts-ignore
  const objectData = JSON.parse(jsonData)

  return {
    props: objectData,
  }
}
