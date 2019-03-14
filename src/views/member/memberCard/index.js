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
import { Card, Select, Table } from 'antd';
import action from './action';

const Option = Select.Option;

class MemberList extends Component {
    static propTypes = {
        getMemberCard: PropTypes.func,
        memberCard: PropTypes.array,
        totalCount: PropTypes.number
    };
    tableParams = {
        grade: '',
        pageNum: 1,
        pageSize: 10
    };
    test = () => {
        let arr = [];
        for (let i = 1; i <= 13; i++) {
            arr.push(
                <Option key={i} value={i}>
                    {i}级会员
                </Option>
            );
        }
        return arr;
    };
    handleChange = (val) => {
        const { getMemberCard } = this.props;
        this.tableParams.grade = val;
        getMemberCard({
            ...this.tableParams,
            grade: val
        });
    };
    onChange = (pageNum) => {
        this.tableParams.pageNum = pageNum;
        this.props.getMemberCard({
            ...this.tableParams,
            pageNum
        });
    };
    onShowSizeChange = (current, pageSize) => {
        this.tableParams.pageSize = pageSize;
        this.props.getMemberCard({
            ...this.tableParams,
            pageNum: current,
            pageSize
        });
    };
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'userName'
            },
            {
                title: '微信',
                dataIndex: 'weixin'
            },
            {
                title: '地址',
                dataIndex: 'address'
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
                <Card title="会员卡显示" bordered={false} className="member-level">
                    <Select style={{width:'400px',marginBottom:'20px'}} placeholder="选择会员级别" onChange={this.handleChange}>
                        {this.test()}
                    </Select>
                    <Table
                        columns={columns}
                        pagination={{ ...pagination }}
                        dataSource={this.props.memberCard}
                    />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    memberCard: state.memberCardPage.memberCard,
    totalCount: state.memberCardPage.totalCount
});

const mapDispatchToProps = {
    getMemberCard: action.getMemberCard
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberList);
