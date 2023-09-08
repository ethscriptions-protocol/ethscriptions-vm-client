import React from 'react'
import { NOTIFICATION_CONSTANT, INotificationConstant } from "./notification.constant"
import { SectionContainer } from "../../components/SectionContainer";

export default function Index() {
    return (
        <>
            {
                NOTIFICATION_CONSTANT.close ? (
                    ""
                ) : (
                    <SectionContainer>
                        <div className='text-sm opacity-80 w-full text-center py-4 leading-5 font-semibold'>
                            {NOTIFICATION_CONSTANT.description}
                        </div>
                    </SectionContainer>
                )
            }
        </>
    )
}
