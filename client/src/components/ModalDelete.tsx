import React from 'react'
import "./todoList.scss"
import { PiWarningCircle } from 'react-icons/pi'
import { TiDeleteOutline } from 'react-icons/ti'
interface ModalDeleteProps {
  onClose: () => void;
  delJob: () => void;
  nameJob:string;
}
export default function ModalDelete(props:ModalDeleteProps) {
  return (
    <div className='outDelLine'>
      <div className='modalDel'>
        <div className='modalDelTop'>
          <div className='delTitle'>Xác nhận</div>
          <TiDeleteOutline className='outModelDel' onClick={props.onClose} />
        </div>
        <div className='contenDelBox'>
          <PiWarningCircle className='iconWarning' />
          <div className='contenDel'>Bạn có chắc chắn muốn xóa công việc '{props.nameJob}'' không</div>
        </div>
        <div className='delModalBtn'>
          <button className='delBtnCal' onClick={props.onClose}>Hủy</button>
          <button className='delBtnDel' onClick={props.delJob}>Xóa</button>
        </div>
      </div>
    </div>
  );
}
