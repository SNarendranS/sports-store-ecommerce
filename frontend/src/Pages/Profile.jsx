import React, { useEffect, useState } from 'react'
import UserService from '../Services/userService'
import { Container, Paper, Typography } from '@mui/material'
const Profile = () => {
  const [userData, setUserData] = useState({})
  const fetchProfileData = async () => {
    const res = await UserService.getUserData()
    if (res) setUserData(res)
  }
  useEffect(() => {
    fetchProfileData()
  }, [])
  return (
    <Container>
      <Paper>
        <Typography>{userData.name}</Typography>
        <Typography>{userData.email}</Typography>
        <Typography> {userData.phoneNumber}</Typography>
      </Paper>
    </Container>

  )
}

export default Profile