import { useState } from 'react';
import axios from 'axios'; // For making API requests to the server
import useAxios from '../../Hooks/UseAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddLiveCourses = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    trainer: {
      name: '',
      designation: '',
      info: '',
      image: '',
    },
    description: '',
    short_description: '',
    trailer: '',
    offer: '',
    price: '',
    discount: '',
    status: 'Unavailable',
    course_type: 'live',  
    students: '',
    reviews: '',
    positive_ratings: '',
    whatYoullLearn: [{ topic: '', description: '' }],
    courseFeatures: [{ feature: '', description: '' }],
    software: [{ name: '', description: '' }]
  });

  // Imgbb API Key
  const imgbbAPIKey = "9b00e5928e6cb63a96541485f6f339eb";


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      trainer: { ...courseData.trainer, [name]: value },
    });
  };

  // ImgBB Image Upload Handler for Trainer
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setLoading(true);
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
        const imageUrl = response.data.data.url;
        setCourseData((prevData) => ({
          ...prevData,
          trainer: { ...prevData.trainer, image: imageUrl },
        }));
        toast.success("Image uploaded successfully!");
        setLoading(false);
      } catch (error) {
        toast.error("Image upload failed.");
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleWhatYouLearnChange = (e, index, field) => {
    const { value } = e.target;
    const updatedLearn = [...courseData.whatYoullLearn];
    updatedLearn[index][field] = value;
    setCourseData({ ...courseData, whatYoullLearn: updatedLearn });
  };

  const handleAddWhatYouLearn = () => {
    setCourseData({
      ...courseData,
      whatYoullLearn: [...courseData.whatYoullLearn, { topic: '', description: '' }],
    });
  };

  const handleRemoveWhatYouLearn = (index) => {
    const updatedLearn = courseData.whatYoullLearn.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      whatYoullLearn: updatedLearn,
    });
  };

  const handleCourseFeatureChange = (e, index, field) => {
    const { value } = e.target;
    const updatedFeatures = [...courseData.courseFeatures];
    updatedFeatures[index][field] = value;
    setCourseData({ ...courseData, courseFeatures: updatedFeatures });
  };

  const handleAddCourseFeature = () => {
    setCourseData({
      ...courseData,
      courseFeatures: [...courseData.courseFeatures, { feature: '', description: '' }],
    });
  };

  const handleRemoveCourseFeature = (index) => {
    const updatedFeatures = courseData.courseFeatures.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      courseFeatures: updatedFeatures,
    });
  };

  const handleSoftwareChange = (e, index, field) => {
    const { value } = e.target;
    const updatedSoftware = [...courseData.software];
    updatedSoftware[index][field] = value;
    setCourseData({ ...courseData, software: updatedSoftware });
  };

  const handleAddSoftware = () => {
    setCourseData({
      ...courseData,
      software: [...courseData.software, { name: '', description: '' }],
    });
  };

  const handleRemoveSoftware = (index) => {
    const updatedSoftware = courseData.software.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      software: updatedSoftware,
    });
  };

  // Cloudinary Video Upload for Trailer
  const handleTrailerUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'video_preset'); // Change to your actual preset

    try {
      setLoading(true);
      const cloudName = import.meta.env.VITE_cloudinaryCloudeName;
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const videoUrl = res.data.secure_url;
      setCourseData({ ...courseData, trailer: videoUrl });
      toast.success('Trailer Uploaded Successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error uploading trailer:', error);
      setLoading(false);
      toast.error('Trailer upload failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseData.title || !courseData.trainer.name || !courseData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    axiosPublic.post('/live-courses', courseData)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Course added successfully');
          navigate('/admin-dashboard/manage-courses');
        }
      })
      .catch(error => {
        toast.error('Failed to add course');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-10 ">
      <form className="p-3  shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Course Information</h2>

        <div className='my-3 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Short Description</label>
            <textarea
              name="short_description"
              value={courseData.short_description}
              onChange={handleChange}
              className="mt-1 block w-full h-20 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </div>

        {/* Trainer Section */}
        <div className='my-2 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <h3 className="text-xl font-bold mb-2">Trainer Information</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium">Trainer Name</label>
            <input
              type="text"
              name="name"
              value={courseData.trainer.name}
              onChange={handleTrainerChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Trainer Designation</label>
            <input
              type="text"
              name="designation"
              value={courseData.trainer.designation}
              onChange={handleTrainerChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Trainer Info</label>
            <textarea
              name="info"
              value={courseData.trainer.info}
              onChange={handleTrainerChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Trainer Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {courseData.trainer.image && (
              <img
                src={courseData.trainer.image}
                alt="Trainer"
                className="mt-2 w-24 h-24 object-cover rounded-full"
              />
            )}
            {loading && <p>Uploading Trainer Image...</p>}
          </div>
        </div>



        {/* Trailer Upload */}
        <div className='my-3 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <div className="mb-4">
            <label className="block text-sm font-medium">Trailer</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleTrailerUpload(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {courseData.trailer && (
              <p className="mt-2">Uploaded Trailer Video URL: {courseData.trailer}</p>
            )}
            {loading && <p>Uploading Trailer...</p>}
          </div>

          {/* Offer */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Offer</label>
            <input
              type="text"
              name="offer"
              value={courseData.offer}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Discount</label>
            <input
              type="number"
              name="discount"
              value={courseData.discount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>


        {/* Status */}
        <div className="mb-4 mt-2">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={courseData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* Dynamic "What You'll Learn" Section */}
        <div className='my-4 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <h3 className="text-xl font-bold mb-2">What You'll Learn</h3>
          {courseData.whatYoullLearn.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium">Learning Topic {index + 1}</label>
              <input
                type="text"
                value={item.topic}
                onChange={(e) => handleWhatYouLearnChange(e, index, 'topic')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Topic"
              />
              <label className="block text-sm font-medium mt-2">Description</label>
              <textarea
                value={item.description}
                onChange={(e) => handleWhatYouLearnChange(e, index, 'description')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
              />
              <button
                type="button"
                onClick={() => handleRemoveWhatYouLearn(index)}
                className="mt-2 px-4 py-2 bg-main text-white font-semibold rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWhatYouLearn}
            className="mt-2 px-3 py-2 bg-prime text-white font-semibold rounded"
          >
            Add Learning Item
          </button>
        </div>

        {/* Dynamic "Course Features" Section */}
        <div className='my-3 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <h3 className="text-xl font-bold mb-2 mt-6">Course Features</h3>
          {courseData.courseFeatures.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium">Feature {index + 1}</label>
              <input
                type="text"
                value={item.feature}
                onChange={(e) => handleCourseFeatureChange(e, index, 'feature')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Feature"
              />
              <label className="block text-sm font-medium mt-2">Description</label>
              <textarea
                value={item.description}
                onChange={(e) => handleCourseFeatureChange(e, index, 'description')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
              />
              <button
                type="button"
                onClick={() => handleRemoveCourseFeature(index)}
                className="mt-2 px-4 py-2 bg-main text-white font-semibold rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCourseFeature}
            className="mt-3 px-3 py-2 bg-prime text-white font-semibold rounded"
          >
            Add Course Feature
          </button>
        </div>


        {/* Dynamic "Software" Section */}
        <div className='my-3 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <h3 className="text-xl font-bold mb-2 mt-6">Software</h3>
          {courseData.software.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium">Software {index + 1}</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleSoftwareChange(e, index, 'name')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Software Name"
              />
              <label className="block text-sm font-medium mt-2">Description</label>
              <textarea
                value={item.description}
                onChange={(e) => handleSoftwareChange(e, index, 'description')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Software Description"
              />
              <button
                type="button"
                onClick={() => handleRemoveSoftware(index)}
                className="mt-2 px-4 py-2 bg-main text-white font-semibold rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSoftware}
            className="mt-3 px-3 py-2 bg-prime text-white font-semibold rounded"
          >
            Add Software
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLiveCourses;
