import React, { useEffect, useState } from 'react';
import './MyProfile.css';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../APIService/apiservice';

const MyProfile = () => {
    const [show, setShow] = useState(false);
    const darkMode = useSelector((state) => state.darkMode.enabled);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const user = useSelector((state) => state.user.user);


    // Replace with actual user ID (e.g., from auth or router params)
    const userId = '123'; // example static ID

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserDetails(userId);
                setData(user);
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // You can call your update API here
        setShow(false);
    };

    if (loading || !data) {
        return <div className={`profile-container ${darkMode ? 'dark' : ''}`}>Loading profile...</div>;
    }
    return (
        <div className={`profile-container ${darkMode ? 'dark' : ''}`}>
            <div className="profile-wrapper">
                <div className="profile-header">
                    <img src="/path/to/avatar.jpg" alt="Avatar" className="avatar" />
                    <div className="profile-info">
                        <h2>{data.firstName} {data.lastName}</h2>
                    </div>
                </div>
                <div className="profile-body">
                    <section>
                        <h5>Headline</h5>
                        <p className="headline">{data.headline || 'Add a headline'}</p>
                        <h5>Bio</h5>
                        <p>{data.bio || 'Write a short bio about yourself'}</p>
                    </section>
                    <section>
                        <h5>Contact</h5>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Phone:</strong> {data.phone}</p>
                    </section>
                    <hr />
                    <button className="btn-outline" onClick={() => setShow(true)}>Edit Profile</button>
                </div>
            </div>

            <section className="resume-section mt-5 py-4">
                <h2>Resume Builder</h2>
                <button className="btn-success">Start Resume Builder</button>
            </section>

            {show && (
                <div className="modal-overlay">
                    <div className="profile-modal">
                        <div className="modal-header">
                            <h3>Edit Your Profile</h3>
                            <button className="close-button" onClick={() => setShow(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {['firstName', 'lastName', 'headline', 'bio', 'email', 'phone'].map(field => (
                                    <div className="form-group" key={field}>
                                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                        {field === 'bio' ? (
                                            <textarea
                                                rows="3"
                                                name={field}
                                                value={data[field]}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={field}
                                                value={data[field]}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>
                                ))}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel" onClick={() => setShow(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
