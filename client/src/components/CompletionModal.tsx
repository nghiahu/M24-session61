import React from 'react';
import "./todoList.scss";
import { PiWarningCircle } from 'react-icons/pi';
import { TiDeleteOutline } from 'react-icons/ti';
import './todoList.scss'
interface CompletionModalProps {
  onClose: () => void;
}

export default function CompletionModal(props: CompletionModalProps) {
  return (
    <div className='outComLine'>
      <div className='modalCom'>
        <div className='modalComTop'>
          <div className='comTitle'>Thông báo</div>
          <TiDeleteOutline className='outModelCom' onClick={props.onClose} />
        </div>
        <div className='contenComBox'>
          <PiWarningCircle className='iconWarningCom' />
          <div className='contenCom'>Hoàn thành tất cả công việc</div>
        </div>
        <div className='comModalBtn'>
          <button className='comBtnCal' onClick={props.onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
