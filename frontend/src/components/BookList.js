import React, { useState } from 'react'
import { getBooksQuery } from '../GraphQLQueries/queries'
import { useQuery } from '@apollo/client';
import BookDetails from './BookDetails'

const BookList =({ books }) =>{
    const { loading, data } = useQuery(getBooksQuery, { variables: {books}, pollInterval: 500 })
    const [ bookId, setBookId ] = useState('')
    return (
        <div>
            <ul id="book-list">
                {
                    loading ? <div>Loading....</div> :
                    data.books.map( book =>{
                        return (
                            // console.log(book)
                            <li key={book.id} value={book.id} onClick={ e => setBookId(book.id)}>{ book.name }</li>
                        )
                    })
                }
            </ul>
            <BookDetails bookId={bookId}/>
        </div>
    )
}


export default BookList;