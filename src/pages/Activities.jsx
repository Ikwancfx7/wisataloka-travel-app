import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import ActivityCard from "../components/ActivityCard";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/activities");
        setActivities(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data aktivitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default Activities;
