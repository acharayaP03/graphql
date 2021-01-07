import React, { useState } from 'react'
import { getAuthorsQuery, addBookMutation } from '../GraphQLQueries/queries'
import { useQuery, useMutation } from '@apollo/client';


export default function AddBook() {
    const { loading, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation)

    const [bookName, setBookName] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ authorId, setAuthorId ] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log(bookName, genre, authorId)
        addBook( {
            variables: {
                name: bookName,
                genre,
                authorId
            }
        })
    }

    const handleOptions = (params) =>{
        const { authors } = params;
        return authors.map( author =>{
            return ( <option key={author.id} value={author.id}>{ author.name}</option>)
        })
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="book-name">Book name</label>
                <input 
                    type="text" 
                    id="book-name"
                    value= { bookName}
                    onChange={ e => setBookName(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="genre">Genre</label>
                <input 
                    type="text" 
                    id="genre"
                    value={ genre }
                    onChange= { e => setGenre(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="author">Author</label>
                <select name="author" value={ authorId} onChange={ e => setAuthorId(e.currentTarget.value) }>
                    <option>Select Author</option>
                    {
                        loading ? <div> Loading ....</div> :
                        handleOptions(data) 
                    }
                </select>
            </div>

            <button type='submit' value="submit">+</button>
        </form>
    )
}
