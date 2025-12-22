'use client'
import { useTenantLogout } from '@/hooks/admin/mutation/adminMutation'
import { useAdmindata } from '@/hooks/admin/query/adminQuery'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const {mutate, isError,isPending,error} = useTenantLogout()
  const {data, isLoading} = useAdmindata()

  const router = useRouter()
  
  return (
    <div onClick={()=>{
      mutate()
      router.replace("/auth/login")
    }}>logout</div>

  )
}

export default page