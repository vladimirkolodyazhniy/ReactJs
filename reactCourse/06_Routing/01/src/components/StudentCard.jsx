import React from 'react';
import { Link } from 'react-router';

import './StudentCard.scss';

const StudentCard = props => (
    <div className="student">
        <div className="avatar-holder">
            <Link to={`/students/${props.id}`}>
                <img className="student-avatar" src={props.avatar}/>
            </Link>
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

StudentCard.propTypes = {
    id: React.PropTypes.string,
    avatar: React.PropTypes.string,
    name: React.PropTypes.node,
    location: React.PropTypes.node,
    facebook: React.PropTypes.string,
    github: React.PropTypes.string,
    email: React.PropTypes.string
};

export default StudentCard;
