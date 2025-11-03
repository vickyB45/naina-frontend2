import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

// Top Clients Bar Chart Component
export const TopClientsChart = ({ clients }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Top 5 Clients by AI Revenue Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clients} layout="vertical">
              <XAxis type="number" stroke="#888" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} width={120} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};