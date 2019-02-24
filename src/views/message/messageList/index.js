/*
 * @Author: chentian
 * @Date: 2019-02-24 16:32:27
 * -----
 * @Modified By: chentian
 * @Last Modified: 2019-02-24 16:32:27
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Input, Table, Tabs } from 'antd';

import action from './action';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const propTypes = {
    outlets: PropTypes.array.isRequired,
    getOutlets: PropTypes.func.isRequired
};

class MessageList extends Component {
    componentDidMount() {
        const { getOutlets } = this.props;
        getOutlets();
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'number',
                key: 'number',
                render: (text) => <a href="javascript:;">{text}</a>
            },
            {
                title: '标题',
                dataIndex: 'msg',
                key: 'msg'
            },
            {
                title: '阅读量',
                dataIndex: 'happen',
                key: 'happen'
            },
            {
                title: '公告详情',
                dataIndex: 'time',
                key: 'time'
            }
        ];

        const data = [
            {
                key: '1',
                number: 'John Brown',
                msg: 32,
                happen: 'New York No. 1 Lake Park',
                time: '2019:22:22 10:22:22'
            },
            {
                key: '2',
                number: 'John Brown',
                msg: 32,
                happen: 'New York No. 1 Lake Park',
                time: '2019:22:22 10:22:22'
            },
            {
                key: '3',
                number: 'John Brown',
                msg: 32,
                happen: 'New York No. 1 Lake Park',
                time: '2019:22:22 10:22:22'
            }
        ];
        return (
            <div>
                <Card title="公告新闻" bordered={false}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="筛选" key="1">
                            <div className="mgb20 serch-box">
                                <span className="serch-lable">关键字</span>
                                <Search
                                    className="serch-txt"
                                    placeholder="输入公告内容信息搜索"
                                    enterButton="搜索"
                                    onSearch={(value) => console.log(value)}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                    ,
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    outlets: state.outlets.outlets
});

const mapDispatchToProps = {
    getOutlets: action.getOutlets
};
MessageList.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);