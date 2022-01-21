import React, { useState }  from 'react';
import { Upload, Card, Button, Switch, message } from 'antd';
import { InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import '../styles.css'

const { Dragger } = Upload;

const CreateDonation = () => {
    const navigate = useNavigate();
    const [hasHeader, setHasHeader] = useState(false);

    const props = {
        openFileDialogOnClick: true,
        accept: '.csv',
        name: 'file',
        multiple: false,
        action: `http://localhost:4000/api/v1/donor?hasHeader=${hasHeader}`,
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                navigate(`/success-upload?uid=${info.file.uid}`);
            } else if (status === 'error') {
                message.error(`Erro no arquivo. ${info.file.response.message}`);
            }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return (
        <>
            <Button
                type="primary"
                shape="round"
                icon={<ArrowLeftOutlined />}
                size="large"
                style={{ marginBottom: 15, position: 'absolute', top: 30, left: 250, zIndex: 10 }}
                onClick={() => navigate('/')}
            >
                Return
            </Button>
            <div className="container">
                <Card style={{ textAlign: 'center', marginBottom: 15 }}>
                    <h2>Import Donation File</h2>
                    <span>
                        Has header?
                        <Switch 
                            size="small"
                            style={{ marginLeft: 7 }} 
                            onClick={() => setHasHeader(true)}
                        />
                    </span>
                </Card>
                <Dragger {...props} height={350}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file .csv to this area to upload
                    </p>
                </Dragger>
            </div>
        </>
    );
}

export default CreateDonation;
