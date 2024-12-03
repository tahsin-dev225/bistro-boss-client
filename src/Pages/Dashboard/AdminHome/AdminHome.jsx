import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDollarSign,  FaUsers } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

 
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const {data : stats} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    const {data : chartData = []} = useQuery({
        queryKey: ['order-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // custome function for Bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    //   custome function for pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent,  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return {name: data.category, value: data.revenue}
    })

    return (
        <div>
            <h2 className="text-3xl">
                Hi, welcome  
                <span className="text-red-400 ml-3">
                {
                    user?.displayName ? user.displayName : 'Back'
                }</span>
            </h2>

            <div className="grid my-10 grid-cols-4 gap-x-6 w-full mx-auto shadow">
                <div className="stat border text-white bg-gradient-to-r rounded-md from-cyan-500 to-gray-200">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className=" text-xl text-white">Revenue  </div>
                    <div className="stat-value my-2">${stats?.revenue}</div>
                    <div className="">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat border text-white bg-gradient-to-r rounded-md from-orange-300 to-gray-200">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="text-xl text-white">Users</div>
                    <div className="stat-value">{stats?.user}</div>
                    <div className="">↗︎ 400 (22%)</div>
                </div>
                
                <div className="stat border text-white bg-gradient-to-r rounded-md from-pink-400 to-gray-200">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="text-xl text-white">Product</div>
                    <div className="stat-value">{stats?.menuItems}</div>
                    <div className="">↗︎ 400 (22%)</div>
                </div>

                <div className="stat border text-white bg-gradient-to-r rounded-md from-blue-500 to-gray-200">
                    <div className="stat-figure text-secondary">
                        <GrDeliver className="text-3xl"></GrDeliver>
                    </div>
                    <div className="text-xl text-white">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="">↘︎ 90 (14%)</div>
                </div>
            </div>
            <div className="flex items-center gap-5 p-4 bg-sky-950">
                <div className="w-1/2 border py-12 ">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2 border">
                    <PieChart width={400} height={400}>
                        <Legend></Legend>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;