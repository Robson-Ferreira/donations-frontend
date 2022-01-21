import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../common/query';

const Success = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const uid = query.get('uid');
    return (
        <Result
            status="success"
            title="Donation file imported successfully!"
            subTitle={`UID: ${uid}. Importing to the server may take a few seconds, please wait.`}
            extra={[
                <Button type="primary" key="console" onClick={() => navigate('/')}>
                    View donations
                </Button>,
                <Button key="buy" onClick={() => navigate('/create')}>Send again?</Button>,
            ]}
        />
    );
}

export default Success;
