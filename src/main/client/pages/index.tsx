import type { NextPage } from 'next'
import {DatePicker, Typography} from "antd";
import useSWR from 'swr';

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/user/')

    console.log('data', data)

  return (
      <Typography.Text>
        {error ? JSON.stringify(error) : JSON.stringify(data)}
      </Typography.Text>
  )
}

export default Home
