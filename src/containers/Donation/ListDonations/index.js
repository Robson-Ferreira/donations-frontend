import React, { useState, useEffect } from 'react';
import { Table, Divider, Button, message, Tag, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

import '../styles.css';

const ListDonations = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [pagination, setPagination] = useState({
        current: 0,
        pageSize: 5,
    });

    useEffect(() => {
        loadData(pagination);
    }, []);

    const loadData = async (params = {}) => {
        try {
            const response = 
                await api.get('http://localhost:4000/api/v1/donor', { params });
            setPagination({
                ...params,
                total: response.data.count,
            });
            setTotalAmount(response.data.totalAmount);
            setData(response.data.rows);
            setLoading(false);
        } catch(err) {
            message.error(err.message);
        }
    }

    const handleTableChange = async (pagination, filters) => {
        return await loadData({ ...pagination, ...filters });
    };

    const columns = [
        {
            title: '#ID',
            key: 'donorId',
            dataIndex: 'donorId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => {
                return (
                    <div>
                        <Tag color={name.length === 0 ? "gold" : "geekblue"}>
                            {name.length === 0 ? 'Anonymous' : name }
                        </Tag>
                    </div>
                );
            },
            filters: [
                { text: 'Anonymous', value: 'Anonymous' },
            ],
        },
        {
            title: 'E-mail Address',
            key: 'email',
            dataIndex: 'email',
            render: (email) => {
                return email.length === 0 ? (
                    <Tag color="gold">
                        Anonymous
                    </Tag>
                )
                :
                (<span>{email}</span>)
            },
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
            render: (gender) => {
                return gender.length === 0 ? (
                    <Tag color="gold">
                        Anonymous
                    </Tag>
                )
                :
                (<span>{gender}</span>)
            }
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address',
            render: (address) => {
                return address.length === 0 ? (
                    <Tag color="gold">
                        Anonymous
                    </Tag>
                )
                :
                (<span>{address}</span>)
            }
        },
        {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount',
            render: (value) => {
                const toMoney = value.toLocaleString("en-US", { 
                    style: "currency", 
                    currency: "USD"
                });
                return (<Tag color="green">{toMoney}</Tag>);
            }
        },
    ];

    return (
        <div className="container">
            <Row gutter={[48, 0]}>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        type="dashed" 
                        shape="round"
                        icon={<UploadOutlined />}
                        size="middle"
                        onClick={() => navigate('/create')}
                    >
                        Send Donation
                    </Button>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>
                        {
                            totalAmount.toLocaleString("en-US", { 
                                style: "currency", 
                                currency: "USD"
                            })
                        }
                    </h2>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Total donations: {pagination.total ? pagination.total : 0}
                </Col>
            </Row>
            
            <Divider />

            <Table
                columns={columns}
                dataSource={data}
                key={data.id}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}

export default ListDonations;
