import React, { Component } from 'react';
import { withRouter } from 'react-router';

import students from '../mocks/students.json';

import StudentInfo from '../components/StudentInfo.jsx';

@withRouter
export default class Student extends Component {
    constructor(props) {
        super(props);

        this.handleHistoryBack = this.handleHistoryBack.bind(this);
        this.getStudentById = this.getStudentById.bind(this);
    }


    getStudentById() {
        return students.find(student => student.id.search(this.props.params.id) !== -1);
    }

    handleHistoryBack() {
        this.props.router.goBack();
    }

    render() {
        const student = this.getStudentById();

        const info = student ? <StudentInfo {...student} /> : <h1>Oooops! Looks like this student does not exist!</h1>;

        return (
            <div>
                <button className="btn" onClick={this.handleHistoryBack}>Back</button>

                { info }
            </div>
        );
    }
}
