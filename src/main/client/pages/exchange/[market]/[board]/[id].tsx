import {useRouter} from "next/router";
import useSWR from "swr";

export default function SecurityPage () {
    const router = useRouter()
    const { market, board, id } = router.query

    const { data, error } = useSWR(`/api/exchange/${market}/${board}/${id}`)

    return (
        <>
            {market} {board} {id}
        </>
    )
}