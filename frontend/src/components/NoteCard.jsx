import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';
import toast from 'react-hot-toast';
import api from '../lib/axios';
const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this note ?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id))
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in delete routing", error);
      toast.error("Failed to delete ntoe");
      
    }

  }
  return (
    <Link to={`/note/${note._id}`} className='transition-all duration-200 border-t-4 border-solid border-primary card bg-base-100 hover:shadow-lg'> 
      <div className='bg-green-900 rounded-lg card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='items-center justify-between mt-4 card-actions'>
            <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
            <div className='flex items-center gap-1 '>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error'>
                    <Trash2Icon className='size-4' onClick={(e) => handleDelete(e, note._id)}/>
                </button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
