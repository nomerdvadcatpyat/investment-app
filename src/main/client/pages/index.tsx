import type { NextPage } from 'next'
import {DatePicker, Typography} from "antd";
import useSWR from 'swr';

const SERVER_URL = 'http://localhost:8080'

const fetcher = (url: string) => fetch(`${SERVER_URL}${url}`).then(response => response.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/user/', fetcher)

    console.log('data', data)

  return (
      <Typography.Text>
        {error ? JSON.stringify(error) : JSON.stringify(data)}
      </Typography.Text>
  )
}

export default Home
