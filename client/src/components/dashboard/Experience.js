import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../redux/Profile/profile.actions';

function Experience() {
    const getExperience = useSelector(state => state.profile.profile);
    const experiences = getExperience.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className="hide-sm">{exp.title}</td>
          <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{''}
                    {exp.to === null ? (
                        'NOW'
                    ) : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
          </td>
          <td>
            <button
              onClick={() => deleteExperience(exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    
      return (
        <Fragment>
          <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
          </table>
        </Fragment>
    );
}

export default Experience