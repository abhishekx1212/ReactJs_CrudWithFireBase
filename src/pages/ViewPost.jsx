import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPost } from '../features/postSlice'
import EditPage from './EditPage'

const ViewPost = () => {
    const { post, status,error } = useSelector((state) => state?.post)
    const dispatch = useDispatch();

    const [editData, setEditData] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    return (
        <div>
            <Table striped bordered hover className=''>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Descryption</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        post.map((val) => (
                            <tr key={val.title + val.id}>
                                <td>{val.title}</td>
                                <td>{val.descryption}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => { dispatch(deletePost(val.id)) }}>Delete</button>
                                    <button className='btn btn-dark ms-2' onClick={() => {
                                        setEditData(val)
                                        setOpenEdit(true)
                                    }}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {
                openEdit && (
                    <EditPage editData={editData} onClose={() => {
                        dispatch(fetchPost())
                        setOpenEdit(false)
                    }} />
                )
            }
        </div>
    )
}

export default ViewPost
