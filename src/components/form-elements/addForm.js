import { Form } from 'react-router-dom';
import './addForm.css';

export default function addPlayer() {

    return (
        <div className='add-form'>
            <form>
                <label for="firstName">{form.first}</label>
                <input type="text" className='firstName' />
                <label for="lastName">{form.last}</label>
                <input type="text" className='lastName' />
                <label for="Number">{form.Number}</label>
                <input type="text" className='Number' />

            </form>
        </div>
    )
}