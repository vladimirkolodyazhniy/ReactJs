import React from 'react';

import './StudentInfo.scss';

const StudentInfo = props => (
    <div className="student-info">
        <div className="avatar-holder">
            <img className="student-avatar" src={props.avatar}/>
        </div>
        <div className="content-holder">
            <strong className="student-name">{props.name}</strong>
            <strong className="student-location"><i className="fa fa-map-marker"/>{props.location}</strong>
        </div>
        <ul className="social-networks">
            <li>
                <a href={props.facebook} target="_blank"><i className="fa fa-facebook-square"/></a>
            </li>
            <li>
                <a href={props.github} target="_blank"><i className="fa fa-github-square"/></a>
            </li>
            <li>
                <a href={`mailto: ${props.email}`}><i className="fa fa-envelope-square"/></a>
            </li>
        </ul>
    </div>
);

StudentInfo.propTypes = {
    avatar: React.PropTypes.string,
    name: React.PropTypes.node,
    location: React.PropTypes.node,
    facebook: React.PropTypes.string,
    github: React.PropTypes.string,
    email: React.PropTypes.string
};

export default StudentInfo;
