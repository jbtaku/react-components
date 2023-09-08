import { calendarProps } from '../../utils/type'
import { dayColor } from '../utils/functions/dayColor'

function PcCalendar({ days, events }: calendarProps) {

    return (
        <div className=''>
            <div className='grid grid-cols-7 place-content-center place-items-center gap-1'>
                {days.map((item) => {
                    return <h4 key={item} className='text-2xl font-semibold text-white [&:nth-child(1)]:bg-[#990100] [&:nth-child(7)]:bg-[#283c81] bg-[#333333] w-full text-center py-1'>{item}</h4>
                })}
                {events?.map((item, key) => {
                    return (
                        <div key={key} className={item.date === null ? "" : dayColor(item.day)+ " p-1 w-full h-full"}>
                            <h5 className='text-lg ml-1' style={{ fontFamily: "times new roman" }}>{item.date}</h5>
                            {item.date &&
                                <ul>
                                    {item.event?.map((item, key) => {
                                        return (
                                            <li key={key} className='my-2 [&_span]:bg-[#732e71]'>
                                                <p className='inline-block hover:bg-gray-50 text-sm'>
                                                    <a href={item.link}><span className='inline-block w-3 h-3 rounded-sm mr-2' />{item.title}</a>
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PcCalendar