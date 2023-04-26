import React from 'react';
import { useParams } from 'react-router-dom';
import helpers from '../../services/common.service';
import AddNewBlog from './AddNewBlog';

function BlogDetails() {
  helpers.validateLogin();
  const { id } = useParams();
  const { mode } = useParams();

  if(id === 'new'){
    console.log("Allow user to create blog");
    return (
      <>
        <AddNewBlog />
      </>
    )
  }
  else{
    if(mode === "edit"){

    }
    else if(mode === "preview"){
      
    }
    else{
      return (
        <div>
          <h1>Blog Post {id}</h1>
          <p>Invalid Mode Selected.</p>
        </div>
      );
    }
  }
}

export default BlogDetails;
