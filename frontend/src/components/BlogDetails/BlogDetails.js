import React from 'react';
import { useParams } from 'react-router-dom';
import helpers from '../../services/common.service';

function BlogDetails() {
  helpers.validateLogin();
  const { id } = useParams();
  if(id === 'new'){
    console.log("Allow user to create blog");
  }
  else{
    console.log("Fetch all the data required for the blog - ",id);
  }

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>Here are the details for blog post {id}.</p>
    </div>
  );
}

export default BlogDetails;
