import React, { useEffect, useState } from 'react'
import { event, events } from '../../utils/type'
import axios from 'axios';
import { dummy } from '../../utils/dummy';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
    openModal: () => void
    event?: events
}

function Modal({ openModal, event }: Props) {
    
    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-30'>
            <button className='absolute top-14 right-8 text-6xl font-medium text-white ' onClick={openModal}>×</button>
            <div className='absolute top-32 left-[50%] -translate-x-[50%] w-[80%] max-h-[80%] p-4 bg-white rounded-md overflow-scroll'>
                <h3 className='mx-auto w-max translate-x-2'>
                    <span style={{ fontFamily: "times new roman" }}>{event?.year}</span>年
                    <span style={{ fontFamily: "times new roman" }}>{event?.month}</span>月
                    <span style={{ fontFamily: "times new roman" }}>{event?.date}</span>日
                    <span className='-ml-3'>（{event?.day}）</span>
                </h3>
                <ul className=''>
                    {event?.event?.map((item, key) => {
                        return (
                            <li key={key} className='my-4 pl-2 py-1 rounded-sm bg-[#732e71]'>
                                <a className='block w-full text-xl' href={item.link} style={{color: "white"}}>{item.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Modal