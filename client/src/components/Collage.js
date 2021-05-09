import React from 'react';
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';

/* Properties 
Title: title
Book: book to render
Description: 

*/

export default class Collage extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            title: '',
            firstBook: {
                title: '',
                author: '',

            },
            secondBook: {

            },
            thirdBook: {

            }, 
            fourthBook: {

            },
            description: '',
        }

        this.handleEdit = this.handleEdit.bind(this); 
    }

    componentDidMount() {
        //get collage information from API
    }
    
    render() {
        return(
            <div>
                
            </div>
        );
    }
}