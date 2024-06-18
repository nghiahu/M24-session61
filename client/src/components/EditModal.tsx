import React, { useEffect, useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import TodoList from './TodoList'
interface ModalEditProps {
    closeEdit: ()=> void
    id:number
    name:string
    editClik: ()=> void
  }
  export default function EditModal(props:ModalEditProps) {
    useEffect(()=>{
        const inpEditElement = document.querySelector(".editInp") as HTMLInputElement 
       inpEditElement.value = props.name
    },[])

  return (
    <div className='outEditLine'>
      <div className='modalEdit'>
        <div className='modalEditTop'>
          <div className='EditTitle'>Sửa công việc</div>
          <TiDeleteOutline className='outModelEdit' onClick={props.closeEdit}/>
        </div>
        <div className='contenEditBox'>
          <input type="text" className='editInp'/>
        </div>
        <div className='editModalBtn'>
          <button className='editBtnCal' onClick={props.closeEdit}>Hủy</button>
          <button className='editBtnDel' onClick={()=>props.editClik}>Cập nhật</button>
        </div>
      </div>
    </div>
  )
}


