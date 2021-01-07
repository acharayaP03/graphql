const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../Models/Book');
const Author = require('../Models/Author');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


//Create a book query 
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () =>({
        id : { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        //nested query
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                // _.find(authors, { id: parent.id})
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields: () =>({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        place: { type: GraphQLString},
        //return the list of the authors books.
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, { authorid: parent.id})
                return Book.find({ authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: { id : { type: GraphQLID }},
            resolve(parent, args){
                //code to get data from query...
                //return _.find(books, { id: args.id})
                return Book.findById(args.id);
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                //return _.find( authors, { id: args.id})
                return Author.findById(args.id)
            }
        },
        //all list of books 
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books
                return Book.find({})
            }
        },
        //all list of the author
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age:{ type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })

                return book.save();
            }
        }
    }
})
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})