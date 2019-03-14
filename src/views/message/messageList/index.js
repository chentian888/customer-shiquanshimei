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

class MessageList extends Component {
    static propTypes = {
        getMsg: PropTypes.func,
        msgList: PropTypes.array,
        totalCount: PropTypes.number
    };

    componentDidMount() {
        const { getMsg } = this.props;
        getMsg({
            ...this.tableParams
        });
    }
    tableParams = {
        productTitle: '',
        pageNum: 1,
        pageSize: 10
    };
    search = (value) => {
        const { getMsg } = this.props;
        this.tableParams.productTitle = value;
        getMsg({
            ...this.tableParams,
            productTitle: value
        });
    };
    onChange = (pageNum) => {
        this.tableParams.pageNum = pageNum;
        this.props.getMsg({
            ...this.tableParams,
            pageNum
        });
    };
    onShowSizeChange = (current, pageSize) => {
        this.tableParams.pageSize = pageSize;
        this.props.getMsg({
            ...this.tableParams,
            pageNum: current,
            pageSize
        });
    };
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'announcementId',
                key: 'announcementId'
            },
            {
                title: '标题',
                dataIndex: 'announcementTitle',
                key: 'announcementTitle'
            },
            {
                title: '阅读量',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '公告详情',
                dataIndex: 'content',
                key: 'content'
            }
        ];
        const { totalCount } = this.props;
        const pagination = {
            defaultCurrent: 1,
            showSizeChanger: true,
            showQuickJumper: true,
            total: totalCount,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.onChange
        };
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
                                    onSearch={(value) => this.search(value)}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                    ,
                    <Table columns={columns} pagination={{ ...pagination }} dataSource={this.props.msgList} />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    msgList: state.message.msgList,
    totalCount: state.message.totalCount
});

const mapDispatchToProps = {
    getMsg: action.getMsg
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);
