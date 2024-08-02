"use client"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
   {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
   },
   {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
   },
   {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
   },
   {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
   },
   {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
   },
   {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
   },
   {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
   },
];
export default function Chart() {
   return (
      <div className="flex flex-col h-96 bg-white dark:bg-[#151c2c] transition-all rounded-lg p-4 gap-6">
         <h1 className="text-2xl opacity-60">Weekly Recap</h1>
         <ResponsiveContainer width="100%" height="100%">
            <LineChart
               width={500}
               height={300}
               data={data}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
               <Legend />
               <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeDasharray="5 5" />
               <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
         </ResponsiveContainer>
      </div>
   )
}