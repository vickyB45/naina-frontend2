import { CheckCircle, FileText, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";


// Activity Feed Component
export const ActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'persona': return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case 'client': return <Users className="w-4 h-4 text-green-500" />;
      case 'system': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
            <div className="mt-1 p-2 rounded-full bg-gray-100">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.message}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View System Logs
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View System Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
