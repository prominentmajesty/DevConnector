import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../redux/Profile/profile.actions';

function Education() {
    const getEducation = useSelector(state => state.profile.profile);
    const education = getEducation.map((edu) => (
        <tr key={edu._id}>
          <td>{edu.company}</td>
          <td className="hide-sm">{edu.title}</td>
          <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{''}
                    {exp.to === null ? (
                        'NOW'
                    ) : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
          </td>
          <td>
            <button
              onClick={() => deleteEducation(edu._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    
      return (
        <Fragment>
          <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        </Fragment>
    );
}

export default Education