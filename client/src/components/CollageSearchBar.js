
import React from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CollageSearchBar extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            input: '',
        };
        this.results = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleChoose = this.handleChoose.bind(this); 
    }

    async handleChange(event) {

        this.setState({input: event.target.value}, async () => {
            const googleAPI = "https://www.googleapis.com/books/v1/volumes?q="
            const results = await axios.get(googleAPI + event.target.value + "&filter=partial");
            const truncated = results.data.items.slice(0,10).map(i => i.volumeInfo);             
            this.results = truncated;   
        });      
    }

    handleChoose(book) {
        this.setState({input: book.title});
        this.results = []; 
        
        console.log(book); 
        this.props.choose(book);
    }


    render() {
        const renderedResults = this.results.map((book, idx) => {
            return (
            <div className='container border border-success' onClick={() => this.handleChoose(book)}>

                    <li key={idx}><span className='font-weight-bold' style={{fontSize: '20px'}}>{book.title}</span> by {typeof book.authors !== 'undefined' ? book.authors[0] : "Unknown"}
                    </li>
            </div>
        )})

        return(
            <div>
                <input value={this.state.input} onChange={this.handleChange} type='text'  placeholder='Search for a book!'></input>
                <ul>{renderedResults}</ul>
            </div>
        );
    }
}