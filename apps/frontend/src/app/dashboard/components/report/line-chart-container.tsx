import Show from '@/app/core/components/show';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from './card';

type LineChartDataItemType = {
  period: string;
  periodBalance: number;
};

interface LineChartContainerProps {
  data?: LineChartDataItemType[];
}

export const LineChartContainer: React.FC<LineChartContainerProps> = ({ data }) => {
  const ticksWithouFirstValue = data
    ? data?.map((item, index) => (index === 0 ? '' : item.period))
    : [];
  return (
    <Show when={!!data && data?.length > 0} fallback={''}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            name="Period"
            interval={'preserveStartEnd'}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: '#f2f4f4',
            }}
            ticks={ticksWithouFirstValue}
          >
            <Label value="Timeline" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis tickFormatter={(value) => formatCurrency(value)}>
            <Label value="Total balance" offset={-40} angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip
            formatter={(value, name, props) => [
              formatCurrency(props.value ? (props.value as number) : 0),
              name,
            ]}
          />
          <Line type="monotone" dataKey="periodBalance" stroke="#b6dcfb" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#2F97C1" /> */}
        </LineChart>
      </ResponsiveContainer>
    </Show>
  );
};
