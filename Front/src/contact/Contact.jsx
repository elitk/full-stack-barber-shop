import React, { Component } from 'react';
import './Contact.css'
class Contact extends Component {
    state = {}
    render() {
        return (
            <div className='contact-section'>

                <h1>Contact Us</h1>
                <div className='border'></div>
                <form className='contact-form' action='#' method='post'>
                    <input type="text" className='contact-form-text' placeholder='your name' />
                    <input type="email" className='contact-form-text' placeholder='your email' />
                    <input type="text" className='contact-form-text' placeholder='your phone' />
                    <textarea className='contact-form-text' placeholder='your message'></textarea>
                    <input type="submit" className='contact-form-btn' value="send" />
                </form>


            </div>
        );
    }
}

export default Contact;