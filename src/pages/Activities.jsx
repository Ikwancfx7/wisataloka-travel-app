import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import ActivityCard from "../components/ActivityCard";
import CategoryFilter from "../components/CategoryFilter";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let response;
        if (selectedCategory) {
          response = await axiosInstance.get(`/api/v1/activities-by-category/${selectedCategory}`);
          // setActivities(response.data.data.activities);
        }
        else {
          response = await axiosInstance.get("/api/v1/activities");
        }
        setActivities(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data aktivitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [selectedCategory]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-row px-20 lg:px-30 py-4 gap-10 items-start">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-4/5">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="w-1/5 sticky top-10 h-fit">
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default Activities;
