import React, { Component } from 'react';
import { withRouter } from 'react-router';

import students from '../mocks/students.json';

import SearchField from '../components/SearchField.jsx';
import StudentCard from '../components/StudentCard.jsx';

@withRouter
export default class StudentsFeed extends Component {
    constructor(props) {
        super(props);

        this.handleStudentSearch = this.handleStudentSearch.bind(this);
    }

    handleStudentSearch(name) {
        const { router, location } = this.props;

        router.push({
            pathname: location.pathname,
            query: { ...location.query, name }
        });
    }

    render() {
        const searchQuery = this.props.location.query.name || '';

        const studentsList = students.filter(student => student.name.toLowerCase().search(searchQuery.toLowerCase()) !== -1).map(student =>
            <StudentCard
                avatar={student.avatar}
                email={student.email}
                facebook={student.facebook}
                github={student.github}
                id={student.id}
                key={student.email}
                location={student.location}
                name={student.name}
            />
        );

        return (
            <div className="feed-holder">
                <h1>Meet React Course Members</h1>

                <SearchField searchQuery={searchQuery} onStudentSearch={this.handleStudentSearch}/>

                <div className="students-list">
                    {studentsList}
                </div>
            </div>
        );
    }
}
