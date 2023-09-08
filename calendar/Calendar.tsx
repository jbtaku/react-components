import React, { useEffect, useLayoutEffect, useState } from 'react'
import PcCalendar from './components/PcCalendar'
import MobileCalendar from './components/MobileCalendar'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import { event, events } from '../utils/type'
import axios from 'axios'
import { dummy } from '../utils/dummy'


function Calendar() {
    const isProd = process.env.NODE_ENV === "production"
    const [isPc, setIsPc] = useState(false)
    const [dates, setDates] = useState<(number | null)[]>()
    const [date, setDate] = useState<Dayjs>(dayjs().locale("ja"))
    const [eventItems, setEventItems] = useState<event[]>()
    const [events, setEvents] = useState<events[]>()
    const days = ["日", "月", "火", "水", "木", "金", "土"]

    const chageProcess = () => {
        window.innerWidth > 735 ? setIsPc(true) : setIsPc(false)
    }

    useEffect(() => {
        const beginMonth = date.startOf("month")
        const endMonth = date.endOf("month")

        const tmpDates = []
        const tmpEvents: events[] = []

        for (let i = 0; i < beginMonth.day() + endMonth.date(); i++) {
            const d = i - beginMonth.day() + 1
            const tmpDayjs = dayjs(`${date.year()}-${date.month() + 1}-${d}`).locale("ja")
            const event = eventItems?.filter((item) => {
                const start = dayjs(item.start)
                const end = dayjs(item.end)
                return tmpDayjs.isSame(start) || tmpDayjs.isSame(end) || (start.isBefore(tmpDayjs) && end.isAfter(tmpDayjs))
            })
            const tmpDate = i < beginMonth.day() ? null : d
            const tmpDay = tmpDayjs.format("dd")
            tmpDates.push(tmpDate)
            tmpEvents.push({
                year: date.year(), month: date.month() + 1,
                date: tmpDate, day: tmpDay, event: event
            })
        }
        setEvents(tmpEvents)

    }, [eventItems])

    useEffect(() => {
        chageProcess()
        window.addEventListener("resize", chageProcess)
        return () => window.removeEventListener("resize", chageProcess)
    }, [])

    useLayoutEffect(() => {
        isProd ?
            axios.get("https://yamashiro-spa.or.jp/calendar-api/", {
                params: {
                    startDate: date.startOf('month').format(),
                    endDate: date.endOf('month').format()
                }
            }).then((res) => {
                setEventItems(res.data)
            }).catch((e) => {
                console.log(e.response)
            }) : setEventItems(dummy)
    }, [date])

    return (
        <div className='mx-auto my-10 font-serif max-w-[1200px] px-6 md:px-12'>
            <h2 className='text-3xl font-semibold px-2 mb-2' style={{ fontFamily: "times new roman" }}>{date.year() + "年"}</h2>
            <div className='flex items-center font-semibold mb-3'>
                <button className='flex items-center' onClick={() => { setDate(date.subtract(1, "M")) }}>
                    <p className='text-xl'>先月</p>
                    <span className='block border-r-black border-transparent mr-2 -ml-1' style={{ borderWidth: "14px" }} />
                </button>
                <h3 className='text-3xl w-16 text-center'><span style={{ fontFamily: "times new roman" }}>{date.month() + 1}</span>月</h3>
                <button className='flex items-center' onClick={() => { setDate(date.add(1, "M")) }}>
                    <span className='block border-l-black border-transparent ml-2 -mr-1' style={{ borderWidth: "14px" }} />
                    <p className='text-xl'>来月</p>
                </button>
            </div>
            {isPc ? <PcCalendar days={days} events={events} /> : <MobileCalendar days={days} events={events} />}
        </div>
    )
}

export default Calendar