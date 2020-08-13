import React, { useState } from 'react'
import { Row, Col, Form, Input, Icon, Button, Alert } from 'antd'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { SERVER_BASE_URL } from '../../Config'
import { getAllMessages, afterPostMessage } from '../../../_actions/chat_actions'
import { ChatCard } from './Sections/ChatCard'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import useChat from './useChat'

export const ChatPage = () => {
    const messages = useSelector(state => state.chat)
    const [socket] = useState(io(SERVER_BASE_URL))
    const [message, setMessage] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllMessages())
        socket.on('Output chat message', msg => {
            console.log("Update messages")
            dispatch(getAllMessages())
        })
    }, [])



    const onChatMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const sendToSocket = (message, type = "message") => {
        const { _id, name, image } = user.userData
        const nowTime = moment()


        socket.emit('Input chat message', {
            _id,
            name,
            image,
            nowTime,
            message,
            type
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        sendToSocket(message)
        setMessage("")
    }

    const mapChatErrors = (error, index) => {
        return (
            <Row key={error + index} style={{ marginBottom: '20px', }}>
                <Col style={{ margin: '0 auto' }} span={24}>
                    <Alert message={error} type="error" />
                </Col>

            </Row>
        )
    }

    const mapChatMessages = (item) => {
        return <ChatCard key={item._id} message={item} />
    }

    const onDrop = async (files) => {
        console.log(files)

        const formData = new FormData
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append('file', files[0])

        const response = await Axios.post('/api/chats/uploadfiles', formData, config)
        response.data.success && sendToSocket(response.data.url, 'imageorvideo')
    }
    return (
        <>
            <div>
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>Real time chat</p>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {
                    messages.errors.length > 0 && messages.errors.map(mapChatErrors)
                }
                <div className='infinite-container' style={{ height: '70vh', overflowY: 'scroll' }}>
                    { messages.messages.length > 0  && messages.messages.map(mapChatMessages)}
                </div>
                <Row>
                    <Form onSubmit={onSubmit} layout='inline'>
                        <Col span={18}>
                            <Input
                                id='message'
                                prefix={<Icon type='message' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Let`s start talking"
                                type='text'
                                onChange={onChatMessageChange}
                                value={message}
                            />
                        </Col>
                        <Col span={2}>
                            <Dropzone onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div style={{ width: '100%' }}>
                                                <img style={{ width: "50px", height: '50px', display: 'block', margin: '-10px auto', cursor: 'pointer' }} src='https://as1.ftcdn.net/jpg/03/25/75/08/500_F_325750815_gXCNbP1861LWXD3lVFR2Ij9j53SQjDcG.jpg' />
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Col>
                        <Col span={4}>
                            <Button type='primary' style={{ width: '100%' }} htmlType='submit'>
                                <Icon type='enter' />
                            </Button>
                        </Col>
                    </Form>
                </Row>
            </div>
        </>
    )
}
