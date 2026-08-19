import React, { useEffect, useState } from 'react'
import Aheader from '../ACommon_Compo/Aheader'
import Afooter from '../ACommon_Compo/Afooter'
import axios from 'axios'

function Dashboard() {
  return (
    <div>
        <Aheader desc="Admin !"/>
      <h1>Admin Dashboard</h1>
      <Afooter/>
    </div>
  )
}

export default Dashboard