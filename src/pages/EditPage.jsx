import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPost, fetchPost } from '../features/postSlice';

const EditPage = ({ editData, onClose }) => {
    const [input, setInput] = useState({...editData});
    const dispatch = useDispatch();
    // const {error} = useSelector((state) => state?.post)
    const handleChange = (e) => {
        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        dispatch(editPost(input))
        onClose()
    }
    
    return (
        <div className='bg-secondary position-fixed w-100 h-100 d-flex justify-content-center align-items-center' style={{ zIndex: 0, top: 0, bottom: 0, left: 0, right: 0 }}>
            <div className='h-100 w-100' style={{ backgroundColor: 'white', maxHeight: "350px", maxWidth: "350px" }}>
                <div className="content px-2 py-3" style={{ backgroundColor: 'white',zIndex: 999,opacity:"1" }}>
                    <div className="px-2 form-header d-flex justify-content-between">
                        <h3>Edit Form</h3>
                        <h3 className='bg-danger px-1 rounded' style={{ cursor: "pointer" }} onClick={onClose}>X</h3>
                    </div>
                    <Form className='w-100 py-3'>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name='title' value={input.title} placeholder="Enter Title" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescryption">
                            <Form.Label>Descryption</Form.Label>
                            <Form.Control type="text" name='descryption' value={input.descryption} placeholder="Descryption" onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit"  onClick={handleSubmit}>
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditPage
