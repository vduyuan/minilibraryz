import React from 'react';
import {Modal,Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import CollageSearchBar from './CollageSearchBar';

export default class CollageForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            description: '',
            title: '',
            author: '',
            cover: '',
            ready: false,
            error: ''
        }

        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChoose = this.handleChoose.bind(this); 
    }

    handleDescription(event) {
        this.setState((state) => ({
            description: event.target.value
        }))
    }

    async handleChoose(book) {

        const openLibraryAPI = "http://covers.openlibrary.org/b/"

        let cover = "";
        if ((typeof book.industryIdentifiers !== 'undefined') && (book.industryIdentifiers[0].type === 'ISBN_10') || ((book.industryIdentifiers[0].type === 'ISBN_13'))) {
            cover = openLibraryAPI + "isbn/" + (typeof book.industryIdentifiers != 'undefined' && book.industryIdentifiers[0].identifier) + '-M.jpg';
        } else {
            cover = '/public/openBook.jpg';
        }

        this.setState({ title: book.title, author: typeof book.authors !== 'undefined' ? book.authors[0] : "Unknown", cover: cover, ready: true}); 
    }

    handleSubmit() {
        if (this.state.ready) {
            this.props.submit(this.state); 
            this.setState({ready: false, title: '', author: '', cover: '', error: ''});
        } else {
            this.setState({error: "Please select a book"});
        }
    }
    
    render() {
        return(
            <div>
                <Modal show={this.props.show}>
                    <Modal.Header>
                    <h3>Add a new book!</h3>
                    <Button className='justify-content-end btn-danger' onClick={this.props.close}>Close</Button>
                    </Modal.Header>
                    <Modal.Body>

                        {this.state.ready && <img src={this.state.cover}></img>}
                        <h4>Book 1: </h4>   
                        <CollageSearchBar choose={this.handleChoose} />
                                

                        <div className='container'>
                            <h4>What this book means to you: </h4>
                            <textarea onChange={this.handleDescription} value={this.state.input} placeholder='emotions, times and spaces, people, topics'></textarea>
                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' onClick={() => this.props.submit(this.state)}>Add to Library!</Button>
                        <p>{this.state.error}</p>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}