import React, { Component } from 'react';

import students from '../mocks/students.json';

import SearchField from './SearchField.jsx';
import Student from './Student.jsx';

import './StudentsFeed.scss';

export default class StudentsFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: students
        };

        this.handleStudentSearch = this.handleStudentSearch.bind(this);
    }

    handleStudentSearch(name) {
        this.setState({
            students: students.filter(student => student.name.toLowerCase().search(name.toLowerCase()) !== -1)
        });
    }

    render() {
        const students = this.state.students.map(student =>
            <Student
                key={student.email}
                avatar={student.avatar}
                name={student.name}
                location={student.location}
                email={student.email}
                github={student.github}
                facebook={student.facebook}
            />
        );

        return (
            <div className="feed-holder">
                <h1>Meet React Course Members</h1>

                <SearchField onStudentSearch={this.handleStudentSearch}/>

                <div className="students-list">
                    {students}
                </div>
            </div>
        );
    }
}
