import Show from '@/app/core/components/show';
import { Bar, BarChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartLoader } from '../styles/chart-loader';
import { formatCurrency } from './card';

export type BarChartDataItemType = {
  period: string;
  withdraw: number;
  deposit: number;
};

export interface BarChartContainerProps {
  data?: BarChartDataItemType[];
}

export const BarChartContainer: React.FC<BarChartContainerProps> = ({ data }) => {
  return (
    <Show when={!!data && data?.length > 0} fallback={<ChartLoader>...</ChartLoader>}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          barCategoryGap={3}
          maxBarSize={100}
          margin={{
            top: 20,
            right: 30,
            left: 55,
            bottom: 5,
          }}
        >
          <Legend verticalAlign="top" />
          <XAxis
            dataKey="period"
            name="Period"
            interval={'preserveStartEnd'}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: '#f2f4f4',
            }}
          >
            <Label value="Timeline" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis tickFormatter={(value) => formatCurrency(value)}>
            <Label value="Amount transacted" offset={-50} angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip
            formatter={(value, name, props) => [
              formatCurrency(props.value ? (props.value as number) : 0),
              name,
            ]}
          />
          <Bar dataKey="withdraw" stackId="a" fill="#2F97C1" />
          <Bar dataKey="deposit" stackId="a" fill="#b6dcfb" />
        </BarChart>
      </ResponsiveContainer>
    </Show>
  );
};
