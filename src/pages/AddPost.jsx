import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, deletePost, fetchPost } from '../features/postSlice';
import Table from 'react-bootstrap/Table';
import LoadPage from './LoadPage';
import ViewPost from './ViewPost';

const AddPost = () => {

  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const { post, status } = useSelector((state) => state?.post)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    dispatch(fetchPost())
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(input))
    setInput({})
  }

  return (
    <div className='container my-3'>
      <div className="row">
        <Form className='col-5'>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={input.title || ""} name='title' placeholder="Enter Title" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescryption">
            <Form.Label>Descryption</Form.Label>
            <Form.Control type="text" name='descryption' value={input.descryption || ""} placeholder="Descryption" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <div className="col-6">
          <ViewPost/>
        </div>
      </div>
      {
        status == "pending" && (
          <LoadPage />
        )
      }
    </div>
  )
}

export default AddPost
