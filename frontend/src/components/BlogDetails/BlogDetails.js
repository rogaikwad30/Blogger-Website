import React from 'react';
import { useParams } from 'react-router-dom';

function BlogDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>Here are the details for blog post {id}.</p>
    </div>
  );
}

export default BlogDetails;
