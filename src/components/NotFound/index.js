import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {
    const navigate = useNavigate();
    return (<Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você está tentando acessar não existe."
        extra={
            <Button type="primary" shape="round" onClick={() => navigate('/')}>Voltar para o início</Button>
        }
    />);
};

export default NotFound;
