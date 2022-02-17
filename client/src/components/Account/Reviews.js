import React from 'react'

export default function Reviews({page}) {
  return (
    <div style={{display: page === 'reviews' ? '' : 'none'}}>
        <h2>These are my reviews</h2>
        <h2>These are my reviews</h2>
        <h2>These are my reviews</h2>
        <h2>These are my reviews</h2>
        <h2>These are my reviews</h2>
        <h2>These are my reviews</h2>
     </div>
  )
}
