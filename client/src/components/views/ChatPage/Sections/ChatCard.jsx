import React from 'react'
import { Comment, Avatar, Tooltip } from 'antd'
import moment from 'moment'
import { SERVER_BASE_URL } from '../../../Config'

export const ChatCard = ({message}) => {
    const findExtName = (string) => {
        let dotIndex = 0
        string.split("").reverse().forEach((elem,index)=>{
            if(elem === ".") {
                dotIndex = index
            }
        })

        return string.slice(string.length - dotIndex)
    }
    return (
        
        <div style={{width:'100%'}}>
            <Comment
                author={message.sender.name}
                avatar={
                    <Avatar src={message.sender.image} alt={message.sender.name}/>
                }
                content={
                    message.message.substring(0,7) === 'uploads'?
                    (
                        findExtName(message.message) === "mp4"?
                        <video style={{maxWidth:'300px'}} src={`${SERVER_BASE_URL}/${message.message}`} alt='video' type="video/mp4" controls/>
                        :
                        <img style={{maxWidth:'300px'}} src = {`${SERVER_BASE_URL}/${message.message}`}/>
                    )
                    :
                    <p>{message.message}</p>
                }
                datetime={
                    <Tooltip title={moment().format('DD-MM-YYYY HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />

           
        </div>
    )
}
