import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '商品名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`good/${record.id}`}>{text}</Link>,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '真实价格',
      dataIndex: 'realPrice',
      key: 'realPrice',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '到期时间',
      dataIndex: 'endTime',
      key: 'entTime',
    }, {
      title: '评论',
      dataIndex: 'commetNum',
      key: 'commetNum',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Delete' }]} />
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
