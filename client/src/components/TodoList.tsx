import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import ModalDelete from './ModalDelete';
import "./todoList.scss";
import CompletionModal from './CompletionModal'
import EditModal from './EditModal';

interface Job {
  id: number;
  name: string;
  status: boolean;
}

export default function TodoList() {
  const [job, setJob] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [delModal, setDelModal] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number>(0);
  const [inpValue, setInpValue] = useState<string>("");
  const [completionModal, setCompletionModal] = useState<boolean>(false); 
  const [nameJob,setNameJob] = useState<string>("")
  const  [editModal,setEditModal] = useState<boolean>(false)
  const inpElement = document.querySelector(".inp") as HTMLInputElement;
  const errorElement = document.querySelector(".error") as HTMLElement;

  function getData() {
    setLoading(true);
    axios.get("http://localhost:8080/todoList")
      .then(res => {
        setJob(res.data);
        setLoading(false);
        checkAllCompleted(res.data); 
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const handleDelOpen = (id: number,name:string) => {
    setDelModal(true);
    setNameJob(name)
    setIdDel(id);
  }

  const handleDelClose = () => {
    setDelModal(false);
  }

  const delJob = () => {
    axios.delete(`http://localhost:8080/todoList/${idDel}`)
      .then(() => {
        setDelModal(false);
        getData();
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpValue(e.target.value);
  }

  const addTodo = () => {
    if (inpValue) {
      errorElement.style.display = "none";
      axios.post("http://localhost:8080/todoList", { name: inpValue, status: false })
        .then(() => {
          inpElement.value = '';
          setInpValue('');
          getData();
        });
    } else {
      errorElement.style.display = "block";
    }
  }

  const toggleJobStatus = (id: number) => {
    const updatedJobs = job.map(j => j.id === id ? { ...j, status: !j.status } : j);
    setJob(updatedJobs);
    checkAllCompleted(updatedJobs);
    axios.put(`http://localhost:8080/todoList/${id}`, updatedJobs.find(j => j.id === id));
  }

  const checkAllCompleted = (jobs: Job[]) => {
    const allCompleted = jobs.every(j => j.status);
    setCompletionModal(allCompleted);
  }
  const handleOpenEdit=(id:number,name:string)=>{
    setIdDel(id)
    setNameJob(name)
    setEditModal(true)
  }
  const handleCloseEdit=()=>{
    setEditModal(false)
  }
  const edit=()=>{
    axios.patch(`http://localhost:8080/todoList/${idDel}`,{name:nameJob})
    setEditModal(false)
    getData();
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {delModal ? <ModalDelete nameJob={nameJob} onClose={handleDelClose} delJob={delJob} /> : <></>}
      {completionModal ? <CompletionModal onClose={() => setCompletionModal(false)} /> : <></>}
      {editModal? <EditModal closeEdit={handleCloseEdit} id={idDel} name={nameJob} editClik={edit}/> : <></>}
      <div className='todoListFrom'>
        <h2 className='title'>Quản lý công việc</h2>
        <div className='addJob'>
          <input type="text" className='inp' placeholder='Nhập tên công việc' onChange={handleChange} />
          <div className='error'>Tên công việc không được để trống</div>
          <button className='btnAdd' onClick={addTodo}>Thêm công việc</button>
        </div>

        <div className='seenStatus'>
          <button className='btnseen pointer'>Tất cả</button>
          <button className='btnseen'>Hoàn Thành</button>
          <button className='btnseen'>Đang thực hiện</button>
        </div>

        <div className='todoList'>
          {loading ? (
            <div className='spinner'><ClipLoader size={50} /></div>) : (
            <ul className='list'>
              {job.map((item) => (
                <li key={item.id} className={`todoItem ${item.status ? 'completed' : ''}`}>
                  <div className='nameItem'>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => toggleJobStatus(item.id)}
                    />
                    {item.name}
                  </div>
                  <div className='nameIcon'>
                    <CiEdit className='iconf' onClick={()=>handleOpenEdit(item.id,item.name)}/>
                    <MdDeleteOutline className='icons' onClick={() => handleDelOpen(item.id,item.name)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='del'>
          <button className='delJobTrue'>Xóa công việc hoàn thành</button>
          <button className='delJobAll'>Xóa tất cả công việc</button>
        </div>
      </div>
    </>
  );
}
