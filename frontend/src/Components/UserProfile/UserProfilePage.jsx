import React from 'react'

const UserProfilePage = ({username, Logout}) => {

  return (
    <div>
        <div>Welcome, {username}</div>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default UserProfilePage