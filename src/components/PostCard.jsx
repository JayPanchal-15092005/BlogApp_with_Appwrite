import React from 'react';
import appwriteService from "../appwrite/config.js";
import { Link } from 'react-router-dom';

// /// This is the file preview like you see the preview when you login and see the card this is the card or Blog please change the style after complete ok.

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="block transform transition duration-300 hover:scale-105">
      <div className='w-full bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
        <div className='w-full flex justify-center mb-4'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='rounded-xl w-full h-48 object-cover'
          />
        </div>
        <h2 className='text-xl font-semibold text-gray-800 truncate'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
