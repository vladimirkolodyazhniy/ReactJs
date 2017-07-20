import React, { Component } from 'react';

import './Student.scss';

export default class Student extends Component {
    render() {
        const {
            name,
            avatar,
            location,
            email,
            github,
            facebook
        } = this.props;

        return (
            <div className="student">
                <div className="avatar-holder">
                    <img className="student-avatar" src={avatar}/>
                </div>
                <div className="content-holder">
                    <strong className="student-name">{name}</strong>
                    <strong className="student-location"><i className="fa fa-map-marker"/>{location}</strong>
                </div>
                <ul className="social-networks">
                    <li>
                        <a href={facebook} target="_blank"><i className="fa fa-facebook-square"/></a>
                    </li>
                    <li>
                        <a href={github} target="_blank"><i className="fa fa-github-square"/></a>
                    </li>
                    <li>
                        <a href={`mailto: ${email}`}><i className="fa fa-envelope-square"/></a>
                    </li>
                </ul>
            </div>
        );
    }
}
