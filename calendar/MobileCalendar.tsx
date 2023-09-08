import React, { useState } from 'react'
import Modal from './Modal'
import { calendarProps } from '../../utils/type'
import { dayColor } from '../utils/functions/dayColor'


function MobileCalendar({ days, events }: calendarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [d, setD] = useState<number | null>(0)
    const openModal = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className='text-2xl'>
            {isOpen && <Modal openModal={openModal} event={events && events[d ? d : 0]} />}
            <div className='grid grid-cols-7 place-content-center place-items-center gap-1'>
                {days.map((item) => {
                    return <h4 key={item} className='font-semibold text-white [&:nth-child(1)]:bg-[#990100] [&:nth-child(7)]:bg-[#283c81] bg-[#333333] w-full text-center'>{item}</h4>
                })}
                {events?.map((item, key) => {
                    return (
                        <div className={item.date === null ? "" : dayColor(item.day) +' relative p-1 w-full  flex justify-center items-center'}
                            onClick={() => { openModal(); setD(key) }} key={key}
                        >
                            {item.event?.length === 0 && item.date ? null:
                                <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[46%] text-5xl text-[#990100]'>⚪︎</span>
                            }
                            <h5 className='relative z-10' style={{ fontFamily: "times new roman" }}>
                                {item.date}
                            </h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default MobileCalendar