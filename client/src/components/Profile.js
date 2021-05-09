import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props); 

    }
    
    render() {
        let books; 
        if (this.props.books.length) {
            books = this.props.books.map((book) => {
                console.log(book); 
                return(
                <div className='col-md-3 border border-info'>
                    <img src={book.cover}></img>
                    <h4>{book.title}, </h4>
                    <h6>by {book.author}</h6>
                    <p>{book.description}</p>
                </div>
                )
            })
        } 

        let rows = Math.floor(this.props.books.length / 3 + 1);
        let rowDivs = []; 

        for (let i = 0; i < this.props.books.length; i+=3) {
            rowDivs.push(
                <div className='row'>
                    {books[i]}
                    {i < books.length && books[i+1]}
                    {i < books.length && books[i+2]}
                </div>
            ) 
        }
    
        return(
            <div>
                <h1>Welcome, {this.props.user}! This is your library: </h1>
                {rowDivs}
            </div>
        );
    }
}