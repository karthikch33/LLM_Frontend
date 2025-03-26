import { Table } from 'antd'
import React from 'react'

const BussinessRuleSheet = ({columns,filteredData}) => {
  return (
    <Table
             columns={columns} 
             dataSource={filteredData || []}
             scroll={{x:950,y: "70vh" }}
             style={{overflowX:"auto"}}
            //  rowClassName={(record, index) => ((record?.rule_status==='Completed' ? 'lightgreen' : record?.rule_status==='In Progress' ? 'lightyellow' : record?.rule_status==='To Start' ? 'lightred' : record?.rule_status==='On Hold' ? 'lightblue' : ''))}
             pagination={
                {
                    pageSize:6,
                    pageSizeOptions:[],
                    showQuickJumper:true,
                    showSizeChanger:false,
                }
             }
             />
  )
}

export default BussinessRuleSheet