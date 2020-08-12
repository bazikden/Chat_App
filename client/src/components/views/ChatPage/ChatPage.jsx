import React, { useState } from 'react'
import { Row, Col, Form, Input, Icon, Button } from 'antd'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const ChatPage = () => {
    const [message,setMessage] = useState("")
    const user = useSelector(state => state.user)
    useEffect(()=> {
        const server = 'http://localhost:5000'
        const socket = io(server)
    },[])

    const onChatMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(user)
    }
    return (
        <>
            <div>
                <p style={{fontSize:'2rem',textAlign:'center'}}>Real time chat</p>
            </div>
            <div style={{maxWidth:'800px',margin:'0 auto'}}>
                <div className='infinite-container'>

                </div>
                <Row>
                    <Form layout='inline'>
                        <Col span={18}>
                            <Input
                                id='message'
                                prefix={<Icon type='message' style={{color:'rgba(0,0,0,.25)'}}/>}
                                placeholder="Let`s start talking"
                                type='text'
                                onChange={onChatMessageChange}
                                value={message}
                            />    
                        </Col>
                        <Col span={2}>
                        
                        </Col>
                        <Col span={4}>
                            <Button type='primary' style={{width:'100%'}} htmlType='submit'>
                                <Icon type='enter'/>
                            </Button>
                        </Col>
                    </Form>
                </Row>
            </div>
        </>
    )
}
