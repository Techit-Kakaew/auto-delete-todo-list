"use client"

import { mockDataList, DataType, Data } from "@/constants/data";
import { Button, Card, Col, Row, Space } from "antd";
import { useCallback, useState, useRef } from "react";

interface MappedData extends Data {
  id: number;
  isMoved: boolean;
  remainingTime: number;
}

const Home = () => {
  const dataTypes = Object.keys(DataType)

  const [dataList, setDataList] = useState<MappedData[]>(mockDataList.map((mockData, index) => ({
    ...mockData,
    id: index + 1,
    isMoved: false,
    remainingTime: 5,
  })))

  const intervals = useRef<Record<number, NodeJS.Timeout>>({})
  const timeouts = useRef<Record<number, NodeJS.Timeout>>({})

  const getDataListByType = useCallback((dataType: string) => {
    return dataList.filter(data => data.type === dataType && data.isMoved)
  }, [dataList])

  const handleButtonClick = (currentData: MappedData) => {
    const moveToLast = (prevDataList: MappedData[]) => {
      clearInterval(intervals.current[currentData.id])
      clearTimeout(timeouts.current[currentData.id])

      const currentIndex = prevDataList.findIndex(data => data.id === currentData.id)

        const newDataList = prevDataList.map((data, index) => ({
          ...data,
          isMoved: currentIndex === index ? false : data.isMoved,
          remainingTime: currentIndex === index ? 5 : data.remainingTime
        }))

        const tempCurrentData = { ...newDataList[currentIndex] }
        newDataList.splice(currentIndex, 1)
        newDataList.push(tempCurrentData)

        return newDataList
    }

    if(currentData.isMoved) {
      setDataList(prevDataList => moveToLast(prevDataList))

      return
    }

    setDataList(prevDataList => {
      const currentIndex = prevDataList.findIndex(data => data.id === currentData.id)

      return prevDataList.map((data, index) => ({
        ...data,
        isMoved: currentIndex === index ? true : data.isMoved
      }))
    })

    intervals.current[currentData.id] = setInterval(() => {
      setDataList(prevDataList => {
        const currentIndex = prevDataList.findIndex(data => data.id === currentData.id)

        return prevDataList.map((data, index) => ({
          ...data,
          remainingTime: currentIndex === index ? data.remainingTime - 1 : data.remainingTime
        }))
      })
    }, 1000)

    timeouts.current[currentData.id] = setTimeout(() => {
      setDataList(prevDataList => moveToLast(prevDataList))
    }, 5000)
  }

  return (
    <Row 
      gutter={24} 
      style={{ 
        justifyContent: 'center',
        flexWrap: 'nowrap',
        width: '100%',
        padding: '16px'
      }}
    >
      <Col style={{ width: '250px' }}>
        <Space 
          direction="vertical"
          style={{
            width: '100%'
          }}
        >
          {dataList.map(data =>
            !data.isMoved && (
              <Button 
                key={data.name}
                disabled={data.isMoved}
                style={{ 
                  width: '100%', 
                  fontSize: '1rem',
                  height: '40px'
                }}
                onClick={() => handleButtonClick(data)}
              >
                {data.name}
              </Button>
            )
          )}
        </Space>
      </Col>
      <Col style={{ width: '600px' }}>
        <Space align="start">
          {dataTypes.map(dataType =>
            <Card 
              key={dataType}
              title={<div style={{ textAlign: 'center' }}>{dataType}</div>}
              style={{ width: 300 }}
              styles={{
                body: {
                  minHeight: 'calc(100vh - 90px)',
                  maxHeight: 'calc(100vh - 90px)'
                }
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {getDataListByType(dataType).map(data =>
                  <Button 
                    key={data.name}
                    className="loader"
                    style={{
                      width: '100%',
                      fontSize: '1rem',
                      height: '40px'
                    }}
                    onClick={() => handleButtonClick(data)}
                  >
                    {data.name}
                  </Button>
                )}
              </Space>
            </Card>
          )}
        </Space>
      </Col>
    </Row>
  )
}

export default Home
