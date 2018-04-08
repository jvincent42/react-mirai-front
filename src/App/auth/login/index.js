import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';


const Login = () => (
  <div>
    <div>
      Login <Button>ok</Button>
    </div>
    <div>
      <Button block>
        <Link to="/admin">admin</Link>
      </Button>
    </div>
  </div>
);


export default Login;
