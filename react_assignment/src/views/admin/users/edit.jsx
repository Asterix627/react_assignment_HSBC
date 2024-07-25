import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

const token = Cookies.get('token');

const UsersEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState([]);
    const fetchDetailUser = async () => {
            await api.get(`/posts${id}`)
            .then(response => {
                
                setName(response.data.data.name);
                setEmail(response.data.data.email);
            })
    }

    useEffect(() => {
        fetchDetailUser();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();

        api.defaults.headers.common['Authorization'] = token;
        await api.put(`/posts/1${id}`, {
            name: name,
            email: email,
            password: password
        })
            .then(() => {
                navigate('/admin/users')
            })
            .catch(error => {
                setValidation(error.response.data);
            })
    }

    return (
        <div class="container mt-5 mb-5">
            <div class="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div class="col-md-9">
                    <div class="card border-0 rounded shadow-sm">
                        <div class="card-header">
                            EDIT USER
                        </div>
                        <div class="card-body">
                            {
                                validation.errors && (
                                    <div className="alert alert-danger mt-2 pb-0">
                                        {
                                            validation.errors.map((error, index) => (
                                                <p key={index}>{error.path} : {error.msg}</p>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <form onSubmit={updateUser}>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control" placeholder="Full Name" />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control"
                                        placeholder="Email Address" />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control"
                                        placeholder="Password" />
                                </div>

                                <button type="submit" class="btn btn-sm btn-primary">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default UsersEdit;