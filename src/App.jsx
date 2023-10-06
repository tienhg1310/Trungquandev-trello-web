import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import HomeIcon from '@mui/icons-material/Home'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Button from '@mui/material/Button'
import { pink } from '@mui/material/colors'

import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>Tienhg2001</div>

      <Typography variant="body2" color="text.secondary">
        Hello Text typo
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
