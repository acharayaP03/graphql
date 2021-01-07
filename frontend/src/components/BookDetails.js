import React from 'react'

import { getBookQuery } from '../GraphQLQueries/queries'
import { useQuery } from '@apollo/client';

export default function BookDetails(props){
    const { bookId } = props;
    const { loading, data} = useQuery(getBookQuery, { variables: { id: bookId }})
    const displayBookDetails = () =>{
        const { book } = data;
        if(book){
            return (
                <div id="book-detail">
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    {
                        book.author.books.map( item =>{
                            return <li key={ item.id}>{ item.name }</li>
                        }) 
                    }
                </div>
            )
        }else{
            return (
                <div>No book to display</div>
            )
        }
    }
    
    return (
        <div id="book-details">
            {
                data ? 
                    <div>
                        { displayBookDetails() }
                    </div>
                : null
            }
        </div>
    )
}