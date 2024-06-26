import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Loading } from '../Loading/Loading';
import { Form, useSubmit } from '@remix-run/react';
interface PropsModal{
    setPopUp: (value:boolean)=>void;
    loading: boolean;
    setLoading: (value:boolean)=>void
}

function Modal({setPopUp, loading, setLoading}:PropsModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [disable, setDisable] = useState(true)
  const [formData, setFormData] = useState({
      id: '',
      title: '',
      content: ''
  });

  const submit = useSubmit();

  const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleSubmit = (event:FormEvent<HTMLFormElement>) =>{
    setLoading(true)
    submit(event.currentTarget)
  }

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPopUp(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setPopUp]);

  useEffect(()=>{
    if(formData.id != "" && formData.title != "" && formData.content != ""){
      setDisable(false)
    }else{
      setDisable(true)
    }
  },[formData])

  return (
    <div className='w-screen h-screen bg-[#4F4B5C] bg-opacity-70 fixed top-0 right-0 flex justify-center items-center'>
      <div ref={modalRef} className='container bg-white p-10 rounded-3xl shadow-md py-12 w-[680px]'>
        <h1 className='font-semibold text-title text-secondary-100'>Adicionar Passo</h1>
        <Form method="post" className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='id'>Id</label>
                <input type="text" name='id' value={formData.id} onChange={handleChange} className='bg-background outline outline-1 outline-secondary-75 h-12 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='title'>Titulo</label>
                <input type="text"  name='title' value={formData.title} onChange={handleChange} className='bg-background outline outline-1 outline-secondary-75 h-12 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='content'>Conteúdo</label>
                <textarea name='content' value={formData.content} onChange={handleChange} className='resize-none bg-background outline outline-1 outline-secondary-75 h-28 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'>
                </textarea>
            </div>
            <div className='flex justify-end gap-6 mt-10'>
                <button 
                    className='py-3 px-6 min-w-36 border border-primary text-primary font-semibold rounded-xl hover:text-primary-100 hover:border-primary-100'
                    onClick={() => setPopUp(false)}
                >
                    Cancelar
                </button>
                <button 
                    disabled={disable || loading}
                    type='submit'
                    className='py-3 min-w-36 flex justify-center items-center px-6 bg-primary text-white font-semibold rounded-xl disabled:bg-secondary-125'
                >
                  {loading? <Loading loading={loading} w='20px' h='20px'/> : "Criar passo"}
                </button>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default Modal