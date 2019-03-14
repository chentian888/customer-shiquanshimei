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
    assessorList: PropTypes.array,
    getAssessorList: PropTypes.func,
    totalCount: PropTypes.number
};

class AssessorList extends Component {
    componentDidMount() {
        const { getAssessorList } = this.props;
        getAssessorList();
    }
    tableParams = {
        userName: '',
        pageNum: 1,
        pageSize: 10
    };
    search = (value) => {
        const { getAssessorList } = this.props;
        this.tableParams.userName = value;
        getAssessorList({
            ...this.tableParams,
            userName: value
        });
    };
    onChange = (pageNum) => {
        this.tableParams.pageNum = pageNum;
        this.props.getAssessorList({
            ...this.tableParams,
            pageNum
        });
    };
    onShowSizeChange = (current, pageSize) => {
        this.tableParams.pageSize = pageSize;
        this.props.getAssessorList({
            ...this.tableParams,
            pageNum: current,
            pageSize
        });
    };
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '微信号',
                dataIndex: 'weixin',
                key: 'weixin'
            },
            {
                title: '审核等级',
                dataIndex: 'grade',
                key: 'grade'
            },
            {
                title: '审核时间',
                dataIndex: 'passTime',
                key: 'passTime'
            },
            {
                title: '状态',
                dataIndex: 'checkStatus',
                key: 'checkStatus',
                render: (text, record) => (record.checkStatus === '0' ? '未审核' : '已审核')
            },
            {
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                render: (text, record) => (record.checkStatus === '0' ? <a href="javascript:;">审核</a> : '审核')
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
                <Card title="审核管理" bordered={false}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="筛选" key="1">
                            <div className="mgb20 serch-box">
                                <span className="serch-lable">关键字</span>
                                <Search
                                    className="serch-txt"
                                    placeholder="输入申请人姓名搜索"
                                    enterButton="搜索"
                                    onSearch={(value) => this.search(value)}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                    <Table columns={columns} pagination={{ ...pagination }} dataSource={this.props.assessorList} />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    assessorList: state.assessorPage.assessorList,
    totalCount: state.assessorPage.totalCount
});

const mapDispatchToProps = {
    getAssessorList: action.getAssessorList,
    getCheckedList: action.getCheckedList
};
AssessorList.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssessorList);
