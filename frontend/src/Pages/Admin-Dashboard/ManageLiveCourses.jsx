import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import UseLiveCourses from '../../Hooks/UseLivecourses';

const ManageLiveCourses = () => {

    const {liveCourses} = UseLiveCourses()

    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 lg:gird-cols-2'>
                {
                    liveCourses.map(item=>
                        <div key={item._id} className="card grid grid-cols-1 lg:grid-cols-2  bg-base-100 shadow-xl">
                        <figure>
                          <video
                          className=''
                          controls
                            src={item.trailer}
                            type="video/mp4"
                            alt="Album" />
                        </figure>
                        <div className="card-body">
                          <Link to={`/course/${item._id}`}><h2 className="card-title hover:text-prime">{item.title}</h2></Link>
                          <p>Mentor: {item.trainer.name}</p>
                          <p>{item.short_description}</p>
                          <div className="card-actions justify-end">
                            <Link to={`/admin-dashboard/live-courses/${item._id}`}><button className='btn bg-prime text-white'>Enrollment</button></Link>
                            <Link to={`/admin-dashboard/update-live-courses/${item._id}`}><button className="btn btn-primary">Edit Course</button></Link>
                          </div>
                        </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default ManageLiveCourses;