import React from 'react'
import { Link } from 'react-router-dom'

export default function BookTable({books, handleOnDelete}) {
  return (
    <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
              <th scope="col">Create Date</th>
              <th scope="col">Last Modified</th>
            </tr>
          </thead>
          <tbody>
          {
            books.map((book) => (
                <tr key={book.id}>
                  <th scope="row">{book.id}</th>                  
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>                  
                  <td>{new Date(book.createDate).toLocaleString()}</td>
                  <td>
                    {book.lastModified !== null &&
                      `${book.lastModified.split("T")[0]} ${book.lastModified.split("T")[1].substring(0, 5)}`
                    }
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => handleOnDelete(book.id)}>Delete</button>
                  </td>
                  <td>
                  <Link to={`/update/${book.id}`} className='btn btn-warning'>Update</Link>                    
                  </td>

                </tr>
              ))
          }
          </tbody>
      </table>   
    </div>
  )
}
