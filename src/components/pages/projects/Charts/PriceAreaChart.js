import * as React from "react";
import dynamic from 'next/dynamic'

const ChartWithNoSSR = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )

const options = {
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#06b6d4'],
    stroke: {
        width: 2
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    fill: {
        opacity: 0.5
    },
    yaxis: {
        show: true
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        shared: false
    },
}

export default function PriceAreaChart(props) {
    const [series, setSeries] = React.useState()

    React.useEffect(() => {
        let values = [];

        props.tickerData.forEach((ticker) => {
            values.push([new Date(ticker.timestamp).getTime(), ticker.value])
        })

        setSeries([
            {
                name: "Price",
                data: values
            }
        ])
    }, [props])

    const PriceChartMemo = React.useMemo(() => {
        return series && <ChartWithNoSSR options={options} series={series} type="area" width="100%" height={320} />
    }, [series])

    console.log(series)
    
    return (
        <>
            {PriceChartMemo}
        </>
    )
}